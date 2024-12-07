import { ChatOpenAI } from '@langchain/openai';
import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { PrismaService } from 'nestjs-prisma';
import { LLMGenerateRunInput } from './types/llm-generate-run.input';
import { GenerateType } from '@prisma/client';
import { generateEmployeeSuggestion } from './functions/generate-employee-suggestion';

export enum LLMProviderName {
  OPENAI = 'OPENAI',
}

export enum LLMModelName {
  GPT_4O_MINI = 'gpt-4o-mini',
  GPT_4O = 'gpt-4o',
}

export interface LLMGenerateFunctionReturnType {
  prompt: string;
  output: string;
}

// The type for the LLM generate function
export type LLMGenerateFunctionType = (
  prisma: PrismaService,
  inputData: LLMGenerateRunInput,
) => Promise<LLMGenerateFunctionReturnType>;

const llmGenerateFunctionMap: Record<GenerateType, LLMGenerateFunctionType> = {
  [GenerateType.EMPLOYEE_SUGGESTION]: generateEmployeeSuggestion,
};

export const getLLMGenerateFunction = (generateType: GenerateType): LLMGenerateFunctionType => {
  const generateFunction = llmGenerateFunctionMap[generateType];
  if (!generateFunction) {
    throw new Error(`Unsupported LLM generation type: ${generateType}`);
  }
  return generateFunction;
};

const llmModelProviderMap: Record<LLMModelName, LLMProviderName> = {
  [LLMModelName.GPT_4O_MINI]: LLMProviderName.OPENAI,
  [LLMModelName.GPT_4O]: LLMProviderName.OPENAI,
  // Add mappings for other models here
};
export const getLLMProviderForModel = (modelName: LLMModelName): LLMProviderName => {
  const provider = llmModelProviderMap[modelName];
  if (!provider) {
    throw new Error(`Unsupported LLM model: ${modelName}`);
  }
  return provider;
};

const providerModelMap = new Map<
  LLMProviderName,
  (modelName: LLMModelName, temperature: number) => BaseLanguageModel | null
>([
  [
    LLMProviderName.OPENAI,
    (modelName, temperature) => {
      if (Object.values(LLMModelName).includes(modelName)) {
        const model = new ChatOpenAI({
          modelName: modelName,
          temperature,
        });
        return model;
      }
      return null;
    },
  ],
]);

export const createLLMModel = (
  provider: LLMProviderName,
  modelName: LLMModelName,
  temperature: number = 0.7,
): BaseLanguageModel => {
  const modelCreator = providerModelMap.get(provider);
  const model: BaseLanguageModel | null = modelCreator
    ? modelCreator(modelName, temperature)
    : null;

  if (!model) {
    throw new Error(`Unsupported model: ${modelName} for provider: ${provider}`);
  }

  return model;
};

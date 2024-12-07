import { PrismaService } from 'nestjs-prisma';
import {
  LLMProviderName,
  LLMModelName,
  createLLMModel,
  LLMGenerateFunctionReturnType,
} from '../llm.lib';
import { RunStatus } from '@prisma/client';
import { getEmployeeSuggestionPrompt } from '../prompts/employee-suggestion-prompt';
import { getEmployeeSuggestionOutputSchema } from '../output-structure/employee-suggestion-output';
import { LLMGenerateRunInput } from '../types/llm-generate-run.input';
export async function generateEmployeeSuggestion(
  prisma: PrismaService,
  inputData: LLMGenerateRunInput,
): Promise<LLMGenerateFunctionReturnType> {
  const { recordId } = inputData;

  try {
    // Update status to RUNNING
    await prisma.lLMRecord.update({
      where: { id: recordId },
      data: { runStatus: RunStatus.RUNNING },
    });

    const record = await prisma.lLMRecord.findUnique({
      where: { id: recordId },
      include: {
        business: {
          include: {
            naics: true,
          },
        },
      },
    });

    if (!record) throw new Error('Record not found');

    const prompt = getEmployeeSuggestionPrompt();
    const model = createLLMModel(
      LLMProviderName.OPENAI,
      record.modelName as LLMModelName,
      record.temperature,
    );

    const outputSchema = getEmployeeSuggestionOutputSchema();

    const chain = prompt.pipe(model).pipe(outputSchema);
    const result = await chain.invoke({
      format_instructions: outputSchema.getFormatInstructions(),
      businessName: record.business.name,
      industry: record.business.naics?.name || 'Unknown',
    });

    // Update with success
    await prisma.lLMRecord.update({
      where: { id: recordId },
      data: {
        content: JSON.stringify(result),
        runStatus: RunStatus.SUCCESS,
      },
    });

    return {
      prompt: prompt.toString(),
      output: JSON.stringify(result),
    };
  } catch (error) {
    // Update with failure
    await prisma.lLMRecord.update({
      where: { id: recordId },
      data: {
        content: error.message,
        runStatus: RunStatus.FAIL,
      },
    });
    throw error;
  }
}

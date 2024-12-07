import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { GenerateType, RunStatus } from '@prisma/client';
import { LLMModelName, LLMProviderName } from '../llm.lib';

registerEnumType(GenerateType, {
  name: 'GenerateType',
});

registerEnumType(RunStatus, {
  name: 'RunStatus',
});

registerEnumType(LLMProviderName, {
  name: 'LLMProviderName',
});

registerEnumType(LLMModelName, {
  name: 'LLMModelName',
});

@ObjectType()
export class LLMRecord {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => RunStatus)
  runStatus: RunStatus;

  @Field()
  content: string;

  @Field(() => String)
  modelName: string;

  @Field(() => Float)
  temperature: number;

  @Field(() => GenerateType)
  generateType: GenerateType;

  @Field(() => String)
  businessId: string;
}

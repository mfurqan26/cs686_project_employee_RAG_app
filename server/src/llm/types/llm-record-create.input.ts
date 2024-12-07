import { InputType, Field, Float } from '@nestjs/graphql';
import { GenerateType } from '@prisma/client';
import { LLMModelName } from '../llm.lib';

@InputType()
export class LLMRecordCreateInput {
  @Field()
  businessId: string;

  @Field(() => LLMModelName)
  modelName: LLMModelName;

  @Field(() => Float)
  temperature: number;

  @Field(() => GenerateType)
  generateType: GenerateType;
}

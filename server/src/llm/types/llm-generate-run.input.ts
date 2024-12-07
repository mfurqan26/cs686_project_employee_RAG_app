import { Field, InputType, Float } from '@nestjs/graphql';
import { LLMModelName } from '../llm.lib';
import { GenerateType } from '@prisma/client';
import { IsOptional } from 'class-validator';

@InputType()
export class LLMGenerateRunInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  recordId?: string;

  @Field(() => String)
  businessId: string;

  @Field(() => LLMModelName)
  modelName: LLMModelName;

  @Field(() => Float)
  temperature: number;

  @Field(() => GenerateType)
  generateType: GenerateType;
}

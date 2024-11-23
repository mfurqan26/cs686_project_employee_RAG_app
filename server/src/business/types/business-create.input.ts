import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BusinessCreateInput {
  @Field()
  @IsOptional()
  id?: string;

  @Field()
  name: string;

  @Field()
  industry: string;
}

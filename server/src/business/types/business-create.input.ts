import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BusinessCreateInput {
  @Field()
  @IsOptional()
  id?: string;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  naicsId?: number;
}

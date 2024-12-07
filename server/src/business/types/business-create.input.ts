import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BusinessCreateInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  id?: string;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  naicsId?: number;
}

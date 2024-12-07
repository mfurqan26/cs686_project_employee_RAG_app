import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class BusinessUpdateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Number, { nullable: true })
  naicsId?: number;
}

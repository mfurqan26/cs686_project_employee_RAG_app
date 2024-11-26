import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Business {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;
}

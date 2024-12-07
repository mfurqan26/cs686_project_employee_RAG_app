import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { NAICS } from '../../naics/types/naics.model';
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

  @Field(() => Int, { nullable: true })
  NAICSId?: number;

  @Field(() => NAICS, { nullable: true })
  naics?: NAICS;
}

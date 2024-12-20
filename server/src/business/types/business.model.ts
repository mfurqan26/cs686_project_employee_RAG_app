import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
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

@ObjectType()
export class NOC {
  @Field()
  code: string;

  @Field()
  title: string;

  @Field()
  definition: string;
}

@ObjectType()
export class BusinessEmployee {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  noc_code: string;

  @Field(() => NOC)
  NOC: NOC;

  @Field()
  businessId: string;

  @Field(() => Int, { nullable: true })
  headcount?: number;

  @Field(() => Float, { nullable: true })
  wage_low?: number;

  @Field(() => Float, { nullable: true })
  wage_median?: number;

  @Field(() => Float, { nullable: true })
  wage_high?: number;

  @Field(() => Float, { nullable: true })
  wage_avg?: number;

  @Field({ nullable: true })
  data_source?: string;

  @Field({ nullable: true })
  ref_period?: string;

  @Field()
  is_annual: boolean;

  @Field({ nullable: true })
  wage_comment?: string;
}

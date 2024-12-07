import { ObjectType, Field } from '@nestjs/graphql';
import { Business } from '../../business/types/business.model';
import { NAICSDescriptor } from './naics-descriptor.model';

@ObjectType()
export class NAICS {
  @Field(() => Number)
  code: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;

  @Field(() => [Business], { nullable: true })
  Business?: Business[];

  @Field(() => [NAICSDescriptor], { nullable: true })
  NAICSDescriptor?: NAICSDescriptor[];
}

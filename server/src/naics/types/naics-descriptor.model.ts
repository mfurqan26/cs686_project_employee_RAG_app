import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { NAICSDescriptorCategory } from '@prisma/client';
import { NAICS } from './naics.model';

registerEnumType(NAICSDescriptorCategory, {
  name: 'NAICSDescriptorCategory',
});

@ObjectType()
export class NAICSDescriptor {
  @Field()
  naicsId: number;

  @Field(() => NAICS)
  naics: NAICS;

  @Field()
  content: string;

  @Field(() => [NAICSDescriptorCategory])
  category: NAICSDescriptorCategory[];
}

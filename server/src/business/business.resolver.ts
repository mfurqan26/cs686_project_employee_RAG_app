import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BusinessService } from './business.service';
import { Business } from './types/business.model';
import { BusinessCreateInput } from './types/business-create.input';
@Resolver(() => Business)
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

  // Get all businesses
  @Query(() => [Business])
  async businesses(): Promise<Business[]> {
    return this.businessService.businesses();
  }

  // Get a single business
  @Query(() => Business, { nullable: true })
  async business(@Args('id') id: string): Promise<Business> {
    return this.businessService.business(id);
  }

  // Create a business
  @Mutation(() => Business)
  async createBusiness(@Args('data') data: BusinessCreateInput): Promise<Business> {
    return this.businessService.createBusiness(data);
  }
}

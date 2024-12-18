import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { NAICSService } from './naics.service';
import { NAICS } from './types/naics.model';

@Resolver(() => NAICS)
export class NAICSResolver {
  constructor(private readonly naicsService: NAICSService) {}

  @Query(() => [NAICS])
  async naicsList() {
    return this.naicsService.naicsList();
  }

  @Query(() => NAICS, { nullable: true })
  async naics(@Args('code', { type: () => Int }) code: number) {
    return this.naicsService.naic(code);
  }

  @Query(() => Boolean)
  async naicsExists(@Args('code', { type: () => Int }) code: number) {
    return this.naicsService.naicsExists(code);
  }
}

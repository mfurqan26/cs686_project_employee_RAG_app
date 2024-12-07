import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LLMService } from './llm.service';
import { LLMRecord } from './types/llm-record.model';
import { LLMRecordCreateInput } from './types/llm-record-create.input';

@Resolver(() => LLMRecord)
export class LLMResolver {
  constructor(private readonly llmService: LLMService) {}

  @Query(() => [LLMRecord])
  async llmRecords(@Args('businessId') businessId: string): Promise<LLMRecord[]> {
    return this.llmService.getLLMRecords(businessId);
  }

  @Mutation(() => LLMRecord)
  async generateRunLLM(@Args('data') data: LLMRecordCreateInput): Promise<LLMRecord> {
    return this.llmService.generateRunLLM(data);
  }
}

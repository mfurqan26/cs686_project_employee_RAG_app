import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';
import { LLMResolver } from './llm.resolver';

@Module({
  providers: [LLMService, LLMResolver],
  exports: [LLMService],
})
export class LLMModule {}

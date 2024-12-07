import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LLMRecordCreateInput } from './types/llm-record-create.input';
import { RunStatus } from '@prisma/client';
import { getLLMGenerateFunction } from './llm.lib';
import { LLMGenerateRunInput } from './types/llm-generate-run.input';

@Injectable()
export class LLMService {
  constructor(private prisma: PrismaService) {}

  async getLLMRecords(businessId: string) {
    return this.prisma.lLMRecord.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLLMRecord(id: string) {
    return this.prisma.lLMRecord.findUnique({
      where: { id },
    });
  }

  async generateRunLLM(data: LLMRecordCreateInput) {
    const record = await this.prisma.lLMRecord.create({
      data: {
        ...data,
        runStatus: RunStatus.QUEUED,
        content: '', // Will be populated when LLM processing completes
      },
    });

    const inputData: LLMGenerateRunInput = {
      recordId: record.id,
      ...data,
    };

    const generateFunction = getLLMGenerateFunction(data.generateType);
    const result = await generateFunction(this.prisma, inputData);

    const updatedRecord = await this.prisma.lLMRecord.findUnique({
      where: { id: record.id },
    });

    return updatedRecord;
  }
}

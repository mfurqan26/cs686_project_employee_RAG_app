import { PrismaService } from 'nestjs-prisma';
import {
  LLMProviderName,
  LLMModelName,
  createLLMModel,
  LLMGenerateFunctionReturnType,
} from '../llm.lib';
import { RunStatus } from '@prisma/client';
import { LLMGenerateRunInput } from '../types/llm-generate-run.input';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import * as readline from 'readline';
import { getEmployeeSuggestionPromptForLevel } from '../prompts/employee-suggestion-prompt';
import { getEmployeeSuggestionOutputSchemaForLevel } from '../output-structure/employee-suggestion-output';

export async function generateEmployeeSuggestion(
  prisma: PrismaService,
  inputData: LLMGenerateRunInput,
): Promise<LLMGenerateFunctionReturnType> {
  const { recordId } = inputData;

  try {
    await prisma.lLMRecord.update({
      where: { id: recordId },
      data: { runStatus: RunStatus.RUNNING },
    });

    const record = await prisma.lLMRecord.findUnique({
      where: { id: recordId },
      include: {
        business: {
          include: {
            naics: true,
          },
        },
      },
    });

    if (!record) throw new Error('Record not found');

    const businessNaicsDescriptors = await prisma.nAICSDescriptor.findMany({
      where: {
        naicsId: record.business.naics?.code,
      },
    });

    const allNocs = await prisma.nOC.findMany();
    let selectedNocCodes: string[] = [];

    // Read wage data
    const wageData = await readWageData();

    // Recursive NOC selection through levels 1-5
    for (let level = 1; level <= 5; level++) {
      const filteredNocs =
        level === 1
          ? allNocs.filter((noc) => noc.level === 1)
          : allNocs.filter((noc) => {
              return (
                noc.level === level &&
                selectedNocCodes.some((selectedCode) => noc.code.startsWith(selectedCode))
              );
            });

      const prompt = getEmployeeSuggestionPromptForLevel(
        level,
        filteredNocs,
        record.business.name,
        record.business.naics?.name || 'Unknown',
        businessNaicsDescriptors,
      );

      const model = createLLMModel(
        LLMProviderName.OPENAI,
        record.modelName as LLMModelName,
        record.temperature,
      );

      const outputSchema = getEmployeeSuggestionOutputSchemaForLevel();
      const chain = prompt.pipe(model).pipe(outputSchema);

      const result = await chain.invoke({
        format_instructions: outputSchema.getFormatInstructions(),
        nocs: filteredNocs,
      });

      selectedNocCodes = result.selectedNocCodes;
    }

    // Get wage data for final selected NOC codes and create BusinessEmployee records
    const selectedWageData = wageData.filter((row) => selectedNocCodes.includes(row.noc_code));

    const businessEmployeeCreateArray = selectedWageData.map((wage) => ({
      noc_code: wage.noc_code,
      businessId: record.businessId,
      wage_low: wage.wage_low,
      wage_median: wage.wage_median,
      wage_high: wage.wage_high,
      wage_avg: wage.wage_avg,
      data_source: wage.Data_Source_E,
      ref_period: wage.ref_period,
      is_annual: wage.is_annual === 1 ? true : false,
      wage_comment: wage.wage_comment,
    }));

    // Create BusinessEmployee records in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.businessEmployee.createMany({
        data: businessEmployeeCreateArray,
        skipDuplicates: true,
      });
    });

    const createdEmployees = await prisma.businessEmployee.findMany({
      where: {
        businessId: record.businessId,
        noc_code: { in: selectedNocCodes },
      },
      include: {
        NOC: true,
      },
    });

    await prisma.lLMRecord.update({
      where: { id: recordId },
      data: {
        content: JSON.stringify(createdEmployees),
        runStatus: RunStatus.SUCCESS,
      },
    });

    return {
      prompt: 'Recursive NOC selection completed',
      output: JSON.stringify(createdEmployees),
    };
  } catch (error) {
    await prisma.lLMRecord.update({
      where: { id: recordId },
      data: {
        content: error.message,
        runStatus: RunStatus.FAIL,
      },
    });
    throw error;
  }
}

interface WageData {
  noc_code: string;
  job_title: string;
  province: string;
  region_name: string;
  wage_low: number;
  wage_median: number;
  wage_high: number;
  wage_avg: number;
  Data_Source_E: string;
  ref_period: string;
  is_annual: number;
  wage_comment: string;
}

async function readWageData(): Promise<WageData[]> {
  const results: WageData[] = [];
  const filePath = path.join(process.cwd(), 'data', 'Wages-2023.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        // Filter wages to just Canada top level
        if (row.region_name === 'Canada') {
          results.push({
            noc_code: String(row.noc_code),
            job_title: String(row.job_title),
            province: String(row.province),
            region_name: String(row.region_name),
            wage_low: parseFloat(row.wage_low),
            wage_median: parseFloat(row.wage_median),
            wage_high: parseFloat(row.wage_high),
            wage_avg: parseFloat(row.wage_avg),
            Data_Source_E: String(row.Data_Source_E),
            ref_period: String(row.ref_period),
            is_annual: parseInt(row.is_annual),
            wage_comment: String(row.wage_comment),
          });
        }
      })
      .on('error', reject)
      .on('end', () => resolve(results));
  });
}

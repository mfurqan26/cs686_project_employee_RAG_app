import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { NAICSDescriptorCategory, Prisma, PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const DEBUG = false;

const CHUNK_SIZE = 1000;

interface NAICS_CSV {
  code: number;
  name: string;
}

interface NOC_CSV {
  code: string;
  level: number;
  title: string;
  definition: string;
}

interface NAICS_Example_CSV {
  naicsId: number;
  content: string;
  categories: Set<NAICSDescriptorCategory>;
}

export async function getStream(csvRef: string): Promise<NodeJS.ReadableStream> {
  return fs.createReadStream(csvRef);
}

export class CSVImport {
  constructor(private prisma: PrismaClient) {}

  async importNAICS() {
    const filename = 'NAICS-full.csv';

    const stream = await getStream(path.join(__dirname, `../data/${filename}`));
    const csvStream = csv.parseStream(stream, { headers: true });
    const NAICSCreateArray: NAICS_CSV[] = [];
    const NAICSUpdateArray: Prisma.NAICSUpdateArgs[] = [];
    const existingNAICS = await this.prisma.nAICS.findMany();

    await new Promise<void>((resolve, reject) => {
      csvStream
        .on('data', (data) => {
          const codeStr = data['code'].trim();
          if (codeStr) {
            const code = Number(codeStr);
            if (isNaN(code)) {
              console.log('code is not a number');
              console.log(codeStr, data['name']);
            }
            if (existingNAICS.some((naics) => naics.code === code)) {
              const existingNAICSRecord = existingNAICS.find((naics) => naics.code === code);
              if (existingNAICSRecord && existingNAICSRecord.name === data['name'].trim()) {
                return;
              }
              NAICSUpdateArray.push({
                where: { code },
                data: {
                  name: data['name'].trim(),
                },
              });
            } else {
              NAICSCreateArray.push({
                code,
                name: data['name'].trim(),
              });
            }
          }
        })
        .once('end', async () => {
          const checkBlank = NAICSCreateArray.filter((naics) => naics.code);
          await this.prisma.$transaction(async (prisma) => {
            await prisma.nAICS.createMany({
              data: checkBlank,
              skipDuplicates: true,
            });
            for (const updateData of NAICSUpdateArray) {
              await prisma.nAICS.update(updateData);
            }
            resolve();
          });
        });
    });
  }

  async loadNOC() {
    const filename = 'NOC-2021.csv';

    const stream = await getStream(path.join(__dirname, `../data/${filename}`));
    const csvStream = csv.parseStream(stream, { headers: true });
    const NOCCreateArray: NOC_CSV[] = [];
    const NOCUpdateArray: Prisma.NOCUpdateArgs[] = [];
    const existingNOC = await this.prisma.nOC.findMany();

    await new Promise<void>((resolve, reject) => {
      csvStream
        .on('data', (data) => {
          const codeStr = data['code'].trim();
          if (codeStr) {
            const code = codeStr;
            if (existingNOC.some((noc) => noc.code === code)) {
              const existingNOCRecord = existingNOC.find((noc) => noc.code === code);
              // If all fields are the same, do no update
              if (
                existingNOCRecord &&
                existingNOCRecord.title === data['title'].trim() &&
                existingNOCRecord.definition === data['definition'].trim() &&
                existingNOCRecord.level === Number(data['level'])
              ) {
                return;
              }
              NOCUpdateArray.push({
                where: { code },
                data: {
                  title: data['title'].trim(),
                  definition: data['definition'].trim(),
                  level: Number(data['level']),
                },
              });
            } else {
              NOCCreateArray.push({
                code,
                level: Number(data['level']),
                title: data['title'].trim(),
                definition: data['definition'].trim(),
              });
            }
          }
        })
        .once('end', async () => {
          const checkBlank = NOCCreateArray.filter((noc) => noc.code);
          await this.prisma.$transaction(async (prisma) => {
            await prisma.nOC.createMany({
              data: checkBlank,
              skipDuplicates: true,
            });
            for (const updateData of NOCUpdateArray) {
              await prisma.nOC.update(updateData);
            }
            resolve();
          });
        });
    });
  }

  async loadNAICSExamples() {
    const fileName = 'NAICS-examples.csv';
    const csvRef = path.join(__dirname, `../data/${fileName}`);
    const stream = await getStream(csvRef);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    const buffer: Map<string, NAICS_Example_CSV> = new Map();
    let isFirstLine = true;
    let hasSetFirstCode = false;
    let currentCode: string | null = null;

    for await (const line of rl) {
      if (isFirstLine) {
        isFirstLine = false;
        continue;
      }

      const [level, code, classTitle, elementTypeLabel, elementDescription] =
        this.parseCSVLine(line);
      const naicsId = parseInt(code);
      const mappedCategory = this.mapToNAICSDescriptorCategory(elementTypeLabel);

      if (hasSetFirstCode) {
        currentCode = code;
        hasSetFirstCode = true;
      }

      if (mappedCategory) {
        const key = `${naicsId}-${elementDescription}`;
        if (buffer.has(key)) {
          buffer.get(key)!.categories.add(mappedCategory);
        } else {
          buffer.set(key, {
            naicsId,
            content: elementDescription,
            categories: new Set([mappedCategory]),
          });
        }
      }

      // If buffer size reaches CHUNK_SIZE, process it only if we've completed all entries for the current code
      if (buffer.size >= CHUNK_SIZE) {
        const nextLine = await rl[Symbol.asyncIterator]().next();
        const nextCode = nextLine.value?.split(',')[1];
        if (nextLine.done || nextCode !== code) {
          await this.prisma.nAICSDescriptor.createMany({
            data: Array.from(buffer.values()).map((entry) => ({
              naicsId: entry.naicsId,
              content: entry.content,
              category: Array.from(entry.categories),
            })),
            skipDuplicates: true,
          });
          buffer.clear();
          currentCode = nextCode;
        }
      }
    }

    if (buffer.size > 0) {
      await this.prisma.nAICSDescriptor.createMany({
        data: Array.from(buffer.values()).map((entry) => ({
          naicsId: entry.naicsId,
          content: entry.content,
          category: Array.from(entry.categories),
        })),
        skipDuplicates: true,
      });
    }
  }

  private parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += line[i];
      }
    }
    result.push(current.trim());
    return result;
  }

  async loadNAICSDefinitions() {
    const filename = 'NAICS-definitions.csv';

    const stream = await getStream(path.join(__dirname, `../data/${filename}`));
    const csvStream = csv.parseStream(stream, { headers: true });

    try {
      const descriptorCreateArray: Prisma.NAICSDescriptorCreateManyInput[] = [];
      const descriptorUpdateArray: Prisma.NAICSDescriptorUpdateArgs[] = [];
      const existingDescriptors = await this.prisma.nAICSDescriptor.findMany();

      await new Promise<void>((resolve, reject) => {
        csvStream
          .on('data', (data: any) => {
            const codes = this.parseNAICSCodes(data.Code);
            const content = data['Class definition'];

            for (const naicsId of codes) {
              if (
                existingDescriptors.some(
                  (descriptor) =>
                    descriptor.category.includes(NAICSDescriptorCategory.DEFINITION) &&
                    descriptor.naicsId === naicsId,
                )
              ) {
                const existingDescriptor = existingDescriptors.find(
                  (descriptor) =>
                    descriptor.category.includes(NAICSDescriptorCategory.DEFINITION) &&
                    descriptor.naicsId === naicsId,
                );
                if (existingDescriptor && existingDescriptor.content !== content) {
                  descriptorUpdateArray.push({
                    where: {
                      content_naicsId: {
                        content: existingDescriptor.content,
                        naicsId: naicsId,
                      },
                    },
                    data: {
                      content: content,
                    },
                  });
                }
              } else {
                descriptorCreateArray.push({
                  naicsId: naicsId,
                  content: content,
                  category: [NAICSDescriptorCategory.DEFINITION],
                });
              }
            }
          })
          .once('end', async () => {
            try {
              await this.prisma.$transaction(async (prisma) => {
                if (descriptorCreateArray.length > 0) {
                  await prisma.nAICSDescriptor.createMany({
                    data: descriptorCreateArray,
                    skipDuplicates: true,
                  });
                }
                for (const updateData of descriptorUpdateArray) {
                  await prisma.nAICSDescriptor.update(updateData);
                }
              });
              resolve();
            } catch (error) {
              reject(error);
            }
          });
      });
    } catch (error) {
      console.error('Error loading NAICS definitions:', error);
    }
  }

  private parseNAICSCodes(codeString: string): number[] {
    if (codeString.includes('-')) {
      const [start, end] = codeString.split('-').map((num) => parseInt(num.trim(), 10));
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    } else {
      return [parseInt(codeString.trim(), 10)];
    }
  }

  private naicsDescriptorCategoryMap: Map<string, NAICSDescriptorCategory> = new Map([
    ['definition', NAICSDescriptorCategory.DEFINITION],
    ['illustrative example(s)', NAICSDescriptorCategory.ILLUSTRATIVE_EXAMPLE],
    ['all examples', NAICSDescriptorCategory.EXAMPLE],
    ['inclusion(s)', NAICSDescriptorCategory.INCLUSION],
    ['exclusion(s)', NAICSDescriptorCategory.EXCLUSION],
  ]);

  private mapToNAICSDescriptorCategory(label: string): NAICSDescriptorCategory | null {
    const category = this.naicsDescriptorCategoryMap.get(label.trim().toLowerCase());
    if (!category) {
      console.warn(`Unrecognized category: ${label}`);
    }
    return category || null;
  }
}

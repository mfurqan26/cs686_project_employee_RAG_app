import { PrismaClient } from '@prisma/client';
import { CSVImport } from './csv-import';

const prisma = new PrismaClient();
export class DataUtils {
  public static async runSeed() {
    // import NAICS
    const csvImport = new CSVImport(prisma);
    await csvImport.importNAICS();
    await csvImport.loadNAICSExamples();
    await csvImport.loadNAICSDefinitions();
  }

  public static async reset() {
    // The order of deletion is important since deleting
    //  data which some other entry depends on will throw an error.
    await prisma.business.deleteMany();
    await prisma.nAICSDescriptor.deleteMany();
    await prisma.nAICS.deleteMany();
  }
}

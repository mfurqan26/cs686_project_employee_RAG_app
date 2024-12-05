import { PrismaClient } from '@prisma/client';
import { DataUtils } from '../lib/data-util';

const prisma = new PrismaClient();

async function main() {
  await DataUtils.runSeed();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

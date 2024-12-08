-- AlterTable
ALTER TABLE "BusinessEmployee" ADD COLUMN     "ref_period" TEXT,
ALTER COLUMN "data_source" DROP NOT NULL;

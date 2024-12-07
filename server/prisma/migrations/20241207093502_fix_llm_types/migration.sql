/*
  Warnings:

  - Changed the type of `runStatus` on the `LLMRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `generateType` on the `LLMRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('QUEUED', 'RUNNING', 'SUCCESS', 'FAIL');

-- CreateEnum
CREATE TYPE "GenerateType" AS ENUM ('EMPLOYEE_SUGGESTION');

-- AlterTable
ALTER TABLE "LLMRecord" DROP COLUMN "runStatus",
ADD COLUMN     "runStatus" "RunStatus" NOT NULL,
DROP COLUMN "generateType",
ADD COLUMN     "generateType" "GenerateType" NOT NULL;

/*
  Warnings:

  - You are about to drop the column `industry` on the `Business` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NAICSDescriptorCategory" AS ENUM ('DEFINITION', 'ILLUSTRATIVE_EXAMPLE', 'EXAMPLE', 'INCLUSION', 'EXCLUSION');

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "industry",
ADD COLUMN     "NAICSId" INTEGER;

-- CreateTable
CREATE TABLE "NAICS" (
    "code" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NAICS_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "NAICSDescriptor" (
    "naicsId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "category" "NAICSDescriptorCategory"[]
);

-- CreateTable
CREATE TABLE "NOC" (
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "level" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "definition" TEXT NOT NULL,

    CONSTRAINT "NOC_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "NAICSDescriptor_content_naicsId_key" ON "NAICSDescriptor"("content", "naicsId");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_NAICSId_fkey" FOREIGN KEY ("NAICSId") REFERENCES "NAICS"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NAICSDescriptor" ADD CONSTRAINT "NAICSDescriptor_naicsId_fkey" FOREIGN KEY ("naicsId") REFERENCES "NAICS"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

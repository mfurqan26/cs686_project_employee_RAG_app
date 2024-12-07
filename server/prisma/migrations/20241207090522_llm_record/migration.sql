-- CreateTable
CREATE TABLE "LLMRecord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "runStatus" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "generateType" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "LLMRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LLMRecord" ADD CONSTRAINT "LLMRecord_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

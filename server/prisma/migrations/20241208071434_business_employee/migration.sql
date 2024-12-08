-- CreateTable
CREATE TABLE "BusinessEmployee" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "noc_code" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "headcount" INTEGER,
    "wage_low" DOUBLE PRECISION,
    "wage_median" DOUBLE PRECISION,
    "wage_high" DOUBLE PRECISION,
    "wage_avg" DOUBLE PRECISION,
    "data_source" TEXT NOT NULL,
    "is_annual" BOOLEAN NOT NULL,
    "wage_comment" TEXT,

    CONSTRAINT "BusinessEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessEmployee_businessId_noc_code_key" ON "BusinessEmployee"("businessId", "noc_code");

-- AddForeignKey
ALTER TABLE "BusinessEmployee" ADD CONSTRAINT "BusinessEmployee_noc_code_fkey" FOREIGN KEY ("noc_code") REFERENCES "NOC"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessEmployee" ADD CONSTRAINT "BusinessEmployee_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

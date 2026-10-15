-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('PERSONAL_CONTACT', 'LINKEDIN_DM', 'OFFICIAL_EMAIL', 'COMPANY_WEBSITE', 'MEDIUM_OF_JOB_POST', 'OFFLINE_JOB_AGENCY', 'LINKEDIN', 'NAUKRI', 'MONSTER', 'WELLFOUND', 'INDEED', 'INSTAHYRE', 'INTERNSHALA');

-- CreateEnum
CREATE TYPE "emp" AS ENUM ('PART_TIME', 'CONTRACTUAL', 'PPO_BASED_INTERNSHIP', 'PAID_INTERNSHIP', 'UNPAID_INTERNSHIP', 'FULL_TIME');

-- AlterTable
ALTER TABLE "ContactsTable" ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "platformTable" (
    "id" SERIAL NOT NULL,
    "platform" "PlatformType" NOT NULL,

    CONSTRAINT "platformTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employmentTypeTable" (
    "id" SERIAL NOT NULL,
    "empType" "emp" NOT NULL,

    CONSTRAINT "employmentTypeTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emp_type" INTEGER NOT NULL,
    "source_id" INTEGER NOT NULL,

    CONSTRAINT "CompanyTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "platformTable_platform_key" ON "platformTable"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "employmentTypeTable_empType_key" ON "employmentTypeTable"("empType");

-- AddForeignKey
ALTER TABLE "ContactsTable" ADD CONSTRAINT "ContactsTable_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "CompanyTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTable" ADD CONSTRAINT "CompanyTable_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "platformTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTable" ADD CONSTRAINT "CompanyTable_emp_type_fkey" FOREIGN KEY ("emp_type") REFERENCES "employmentTypeTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

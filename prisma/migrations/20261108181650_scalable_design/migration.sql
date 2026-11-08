/*
  Warnings:

  - You are about to drop the column `emp_type` on the `CompanyTable` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `CompanyTable` table. All the data in the column will be lost.
  - You are about to drop the column `source_id` on the `CompanyTable` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CompanyTable` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `ContactPersonProfile` table. All the data in the column will be lost.
  - You are about to drop the column `empType` on the `employmentTypeTable` table. All the data in the column will be lost.
  - You are about to drop the `platformTable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Rank]` on the table `ContactPersonProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Rank` to the `ContactPersonProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `ContactsTable` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `ContactsTable` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `emp_type` to the `employmentTypeTable` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('PERSONAL_CONTACT', 'LINKEDIN_DM', 'OFFICIAL_EMAIL', 'COMPANY_WEBSITE', 'MEDIUM_OF_JOB_POST', 'OFFLINE_JOB_AGENCY', 'LINKEDIN_POST', 'NAUKRI', 'SHINE', 'MONSTER', 'WELLFOUND', 'INDEED', 'INSTAHYRE', 'INTERNSHALA');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('PAID_INTERNSHIP', 'PART_TIME', 'CONTRACTUAL', 'PPO_BASED_INTERNSHIP', 'UNPAID_INTERNSHIP', 'FULL_TIME');

-- CreateEnum
CREATE TYPE "rank" AS ENUM ('HR', 'INTERN', 'CTO', 'FOUNDER', 'TEAM_LEAD', 'SDE');

-- CreateEnum
CREATE TYPE "Reply" AS ENUM ('LEFT_ON_SEEN', 'REFERRED_TO_OTHER', 'SOFT_REJECT', 'OUTRIGHT_REJECT', 'POSITIVE', 'GHOSTED');

-- CreateEnum
CREATE TYPE "stage" AS ENUM ('ASSIGNMENT', 'INTERVIEW', 'JOB_OFFER', 'WAITING_FOR_PROCESS');

-- DropForeignKey
ALTER TABLE "CompanyTable" DROP CONSTRAINT "CompanyTable_emp_type_fkey";

-- DropForeignKey
ALTER TABLE "CompanyTable" DROP CONSTRAINT "CompanyTable_source_id_fkey";

-- DropIndex
DROP INDEX "ContactPersonProfile_rank_key";

-- DropIndex
DROP INDEX "employmentTypeTable_empType_key";

-- AlterTable
ALTER TABLE "CompanyTable" DROP COLUMN "emp_type",
DROP COLUMN "location",
DROP COLUMN "source_id",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "ContactPersonProfile" DROP COLUMN "rank",
ADD COLUMN     "Rank" "rank" NOT NULL;

-- AlterTable
ALTER TABLE "ContactsTable" ADD COLUMN     "userID" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "employmentTypeTable" DROP COLUMN "empType",
ADD COLUMN     "emp_type" "EmploymentType" NOT NULL;

-- DropTable
DROP TABLE "platformTable";

-- DropEnum
DROP TYPE "Designation";

-- DropEnum
DROP TYPE "PlatformType";

-- DropEnum
DROP TYPE "emp";

-- CreateTable
CREATE TABLE "PlatformTable" (
    "id" SERIAL NOT NULL,
    "platform" "Platform" NOT NULL,

    CONSTRAINT "PlatformTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningTable" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "companyID" INTEGER NOT NULL,
    "sourceID" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emp_type" INTEGER NOT NULL,

    CONSTRAINT "OpeningTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutreachTable" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "companyID" INTEGER NOT NULL,
    "contactID" INTEGER NOT NULL,
    "time_of_approach" TIMESTAMP(3) NOT NULL,
    "followUpOf" INTEGER,

    CONSTRAINT "OutreachTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyTable" (
    "id" SERIAL NOT NULL,
    "reply" "Reply" NOT NULL,

    CONSTRAINT "ReplyTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageTable" (
    "id" SERIAL NOT NULL,
    "Stage" "stage" NOT NULL,

    CONSTRAINT "StageTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponseTable" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "time_of_reply" TIMESTAMP(3) NOT NULL,
    "outreach_id" INTEGER NOT NULL,
    "reply_id" INTEGER NOT NULL,
    "positive_response" INTEGER NOT NULL,
    "stage_id" INTEGER NOT NULL,

    CONSTRAINT "ResponseTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformTable_platform_key" ON "PlatformTable"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "OpeningTable_userID_companyID_sourceID_key" ON "OpeningTable"("userID", "companyID", "sourceID");

-- CreateIndex
CREATE UNIQUE INDEX "ReplyTable_reply_key" ON "ReplyTable"("reply");

-- CreateIndex
CREATE UNIQUE INDEX "StageTable_Stage_key" ON "StageTable"("Stage");

-- CreateIndex
CREATE UNIQUE INDEX "ContactPersonProfile_Rank_key" ON "ContactPersonProfile"("Rank");

-- AddForeignKey
ALTER TABLE "OpeningTable" ADD CONSTRAINT "OpeningTable_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningTable" ADD CONSTRAINT "OpeningTable_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "CompanyTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningTable" ADD CONSTRAINT "OpeningTable_sourceID_fkey" FOREIGN KEY ("sourceID") REFERENCES "PlatformTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningTable" ADD CONSTRAINT "OpeningTable_emp_type_fkey" FOREIGN KEY ("emp_type") REFERENCES "employmentTypeTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachTable" ADD CONSTRAINT "OutreachTable_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachTable" ADD CONSTRAINT "OutreachTable_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "CompanyTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachTable" ADD CONSTRAINT "OutreachTable_contactID_fkey" FOREIGN KEY ("contactID") REFERENCES "ContactsTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseTable" ADD CONSTRAINT "ResponseTable_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseTable" ADD CONSTRAINT "ResponseTable_outreach_id_fkey" FOREIGN KEY ("outreach_id") REFERENCES "OutreachTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseTable" ADD CONSTRAINT "ResponseTable_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "StageTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseTable" ADD CONSTRAINT "ResponseTable_positive_response_fkey" FOREIGN KEY ("positive_response") REFERENCES "ReplyTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

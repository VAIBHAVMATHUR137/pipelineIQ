/*
  Warnings:

  - A unique constraint covering the columns `[normalisedName]` on the table `CompanyTable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID,name,profileID,companyID]` on the table `ContactsTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalisedName` to the `CompanyTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyTable" ADD COLUMN     "normalisedName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompanyTable_normalisedName_key" ON "CompanyTable"("normalisedName");

-- CreateIndex
CREATE UNIQUE INDEX "ContactsTable_userID_name_profileID_companyID_key" ON "ContactsTable"("userID", "name", "profileID", "companyID");

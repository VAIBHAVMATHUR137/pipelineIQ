-- CreateEnum
CREATE TYPE "Designation" AS ENUM ('HR', 'INTERN', 'TEAM_LEAD', 'CTO', 'FOUNDER', 'SDE');

-- CreateTable
CREATE TABLE "ContactPersonProfile" (
    "id" SERIAL NOT NULL,
    "rank" "Designation" NOT NULL,

    CONSTRAINT "ContactPersonProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactsTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyID" INTEGER NOT NULL,
    "profileID" INTEGER NOT NULL,

    CONSTRAINT "ContactsTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactPersonProfile_rank_key" ON "ContactPersonProfile"("rank");

-- AddForeignKey
ALTER TABLE "ContactsTable" ADD CONSTRAINT "ContactsTable_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "ContactPersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

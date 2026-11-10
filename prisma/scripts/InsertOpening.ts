import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function insertOpening(data: {
  userID: number;
  companyName: string;
  sourceID: number;
  location: string;
  title: string;
  emp_type: number;
}) {
  const companyName = data.companyName.trim();

  return prisma.$transaction(
    async (tx) => {
      // 1. check if the company already exists (ignore upper/lower case)
      let company = await tx.companyTable.findFirst({
        where: { name: { equals: companyName, mode: "insensitive" } },
      });

      // 2. if not, create it in the company table first
      if (!company) {
        company = await tx.companyTable.create({
          data: { name: companyName },
        });
      }

      // 3. store the company id in the opening table
      return tx.openingTable.create({
        data: {
          userID: data.userID,
          companyID: company.id,
          sourceID: data.sourceID,
          location: data.location,
          title: data.title,
          emp_type: data.emp_type,
        },
      });
    },

    { maxWait: 15000, timeout: 20000 },
  );
}

async function main() {
  const opening = await insertOpening({
    userID: 1,
    companyName: "Google",
    sourceID: 7,
    location: "indore",
    title: "SWE 2",
    emp_type: 6,
  });

  console.log("opening:", opening);
}

main()
  .catch((e) => console.error("FAILED:", e?.error ?? e?.message ?? e))
  .finally(() => prisma.$disconnect());

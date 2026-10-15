import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
    console.log("profiles:", await prisma.contactPersonProfile.findMany());
    console.log("companies:", await prisma.companyTable.findMany({ select: { id: true, name: true } }));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
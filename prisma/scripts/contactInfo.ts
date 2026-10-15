import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
    await prisma.contactsTable.createMany({
        data: [
          { name: "Abhishek", profileID: 6, companyID: 1 },
          { name: "Rohan",    profileID: 6, companyID: 1 },
          { name: "Qasim",    profileID: 1, companyID: 2 },
          { name: "Sunita",   profileID: 2, companyID: 2 },
          { name: "Shubham",  profileID: 1, companyID: 2 },
          { name: "Payal",    profileID: 4, companyID: 3 },
        ],
      });
      console.log(await prisma.contactsTable.findMany());  
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
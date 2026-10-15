import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
    await prisma.companyTable.createMany({
        data: [
          { name: "Gamma",  source_id: 9, location: "Indore", title: "SWE 2",  emp_type: 6 },
          { name: "AWC",    source_id: 8, location: "Noida",  title: "Intern", emp_type: 4 },
          { name: "Google",source_id: 1, location: "Pune",   title: "QA",     emp_type: 2 },
        ],
      });
      console.log(await prisma.companyTable.findMany());  
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
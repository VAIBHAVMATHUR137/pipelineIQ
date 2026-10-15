import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
    await prisma.platformTable.createMany({
        data: [
          { platform: "PERSONAL_CONTACT" },     // 1
          { platform: "LINKEDIN_DM" },          // 2
          { platform: "OFFICIAL_EMAIL" },       // 3
          { platform: "COMPANY_WEBSITE" },      // 4
          { platform: "MEDIUM_OF_JOB_POST" },   // 5
          { platform: "OFFLINE_JOB_AGENCY" },   // 6
          { platform: "LINKEDIN" },             // 7
          { platform: "NAUKRI" },               // 8
          { platform: "MONSTER" },              // 9
          { platform: "WELLFOUND" },            // 10
          { platform: "INDEED" },               // 11
          { platform: "INSTAHYRE" },            // 12
          { platform: "INTERNSHALA" },          // 13
        ],
        skipDuplicates: true,
      });
    
      await prisma.employmentTypeTable.createMany({
        data: [
          { empType: "PART_TIME" },             // 1
          { empType: "CONTRACTUAL" },           // 2
          { empType: "PPO_BASED_INTERNSHIP" },  // 3
          { empType: "PAID_INTERNSHIP" },       // 4
          { empType: "UNPAID_INTERNSHIP" },     // 5
          { empType: "FULL_TIME" },             // 6
        ],
        skipDuplicates: true,
      });
      await prisma.contactPersonProfile.createMany({
        data: [
          { id: 1, rank: "HR" },
          { id: 2, rank: "INTERN" },
          { id: 3, rank: "TEAM_LEAD" },
          { id: 4, rank: "CTO" },
          { id: 5, rank: "FOUNDER" },
          { id: 6, rank: "SDE" },
        ],
        skipDuplicates: true,
      });
      console.log(await prisma.platformTable.findMany());
      console.log(await prisma.employmentTypeTable.findMany());
      console.log(await prisma.contactPersonProfile.findMany());
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
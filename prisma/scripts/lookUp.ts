import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.replyTable.createMany({
    data: [
      { reply: "LEFT_ON_SEEN" },
      { reply: "REFERRED_TO_OTHER" },
      { reply: "GHOSTED" },
      { reply: "OUTRIGHT_REJECT" },
      { reply: "POSITIVE" },
      { reply: "SOFT_REJECT" },
    ],
  });
  await prisma.platformTable.createMany({
    data: [
      { platform: "PERSONAL_CONTACT" }, // 1
      { platform: "LINKEDIN_DM" }, // 2
      { platform: "OFFICIAL_EMAIL" }, // 3
      { platform: "COMPANY_WEBSITE" }, // 4
      { platform: "MEDIUM_OF_JOB_POST" }, // 5
      { platform: "OFFLINE_JOB_AGENCY" }, // 6
      { platform: "LINKEDIN_POST" }, // 7
      { platform: "NAUKRI" }, // 8
      { platform: "MONSTER" }, // 9
      { platform: "WELLFOUND" }, // 10
      { platform: "INDEED" }, // 11
      { platform: "INSTAHYRE" }, // 12
      { platform: "INTERNSHALA" }, // 13
    ],
    skipDuplicates: true,
  });
  await prisma.stageTable.createMany({
    data: [
{Stage:"ASSIGNMENT"},
{Stage:"INTERVIEW"},
{Stage:"JOB_OFFER"},
{Stage:"WAITING_FOR_PROCESS"}

    ],
    skipDuplicates: true,
  })
  await prisma.employmentTypeTable.createMany({
    data: [
      { emp_type: "PART_TIME" }, // 1
      { emp_type: "CONTRACTUAL" }, // 2
      { emp_type: "PPO_BASED_INTERNSHIP" }, // 3
      { emp_type: "PAID_INTERNSHIP" }, // 4
      { emp_type: "UNPAID_INTERNSHIP" }, // 5
      { emp_type: "FULL_TIME" }, // 6
    ],
    skipDuplicates: true,
  });
  await prisma.contactPersonProfile.createMany({
    data: [
      { id: 1, Rank: "HR" },
      { id: 2, Rank: "INTERN" },
      { id: 3, Rank: "TEAM_LEAD" },
      { id: 4, Rank: "CTO" },
      { id: 5, Rank: "FOUNDER" },
      { id: 6, Rank: "SDE" },
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

import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
const profiles = [
  { id: 1, rank: "HR" },
  { id: 2, rank: "INTERN" },
  { id: 3, rank: "TEAM_LEAD" },
  { id: 4, rank: "CTO" },
  { id: 5, rank: "FOUNDER" },
  { id: 6, rank: "SDE" },
] as const;

async function main() {
  for (const p of profiles) {
    await prisma.contactPersonProfile.upsert({
      where: { rank: p.rank },
      update: {},
      create: { id: p.id, rank: p.rank },
    });
  }

  console.log(await prisma.contactPersonProfile.findMany({ orderBy: { id: "asc" } }));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
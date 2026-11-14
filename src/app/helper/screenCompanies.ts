import { prisma } from "@/lib/prisma";

export const screenCompanies = async (companyName: string): Promise<number> => {
  const name = companyName.trim();
  const normalisedName = name.toLowerCase();
  const company = await prisma.companyTable.upsert({
    where: { normalisedName },
    update: {},
    create: { name, normalisedName },
    select: { id: true },
  });
  return company.id;
};
export default screenCompanies
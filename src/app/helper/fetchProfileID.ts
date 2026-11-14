import { rank } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export const fetchProfileID = async (Rank: rank) => {
  const ID = await prisma.contactPersonProfile.findUnique({
    where: { Rank: Rank },
    select: { id: true },
  });
  return ID?.id ?? null;
};
export default fetchProfileID;

import "dotenv/config";

import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function insertUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const email = data.email.trim().toLowerCase();

  // 1. don't allow two users with the same email
  const existing = await prisma.user.findFirst({ where: { email } });
  if (existing) {
    throw new Error(`User with email ${email} already exists`);
  }

  // 2. never store the plain password, store the hash
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 3. create the user
  return prisma.user.create({
    data: {
      name: data.name.trim(),
      email,
      password: hashedPassword,
    },
  });
}

async function main() {
  const user = await insertUser({
    name: "dinesh",
    email: "dinesh@gmail.com",
    password: "123456",
  });

  console.log("user:", { id: user.id, name: user.name, email: user.email });
}

main()
  .catch((e) => console.error("FAILED:", e?.error ?? e?.message ?? e))
  .finally(() => prisma.$disconnect());
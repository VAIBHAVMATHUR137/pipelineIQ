import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const secret = process.env.SECRET_ACCESS_TOKEN;
  if (!token || !secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, secret) as { email: string };
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { name: true, email: true },
    });
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    // expired or tampered token
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
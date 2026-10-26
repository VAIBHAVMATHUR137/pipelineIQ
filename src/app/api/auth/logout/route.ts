import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getRedis } from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("refresh_token")?.value;
    const payload = token ? (jwt.decode(token) as { email?: string } | null) : null;

    if (payload?.email) {
      const redis = await getRedis();
      await redis.del(`${payload.email}_Access_Token`);
      await redis.del(`${payload.email}_Refresh_token`); // same spelling as login
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  const res = NextResponse.json({ message: "Logged out" }, { status: 200 });
  res.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  res.cookies.set("refresh_token", "", { path: "/api/auth", maxAge: 0 });
  return res;
}
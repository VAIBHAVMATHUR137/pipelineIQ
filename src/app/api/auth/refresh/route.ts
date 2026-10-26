import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getRedis } from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("refresh_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    const refreshSecret = process.env.SECRET_REFRESH_TOKEN;
    const accessSecret = process.env.SECRET_ACCESS_TOKEN;
    if (!refreshSecret || !accessSecret) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }

    const payload = jwt.verify(token, refreshSecret) as { email: string };

    const redis = await getRedis();
    const stored = await redis.get(`${payload.email}_Refresh_token`); // same spelling as login
    if (stored !== token) {
      return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    }

    const access_token = jwt.sign({ email: payload.email }, accessSecret, { expiresIn: "5m" });
    const refresh_token = jwt.sign({ email: payload.email }, refreshSecret, { expiresIn: "30d" });

    await redis.set(`${payload.email}_Access_Token`, access_token, { EX: 60 * 5 });
    await redis.set(`${payload.email}_Refresh_token`, refresh_token, { EX: 60 * 60 * 24 * 30 });

    const res = NextResponse.json({ message: "Refreshed" }, { status: 200 });
    const base = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    };
    res.cookies.set("access_token", access_token, { ...base, path: "/", maxAge: 60 * 5 });
    res.cookies.set("refresh_token", refresh_token, { ...base, path: "/api/auth", maxAge: 60 * 60 * 24 * 30 });
    return res;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getRedis } from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const redis = await getRedis();
    const body = await request.json();
    const { email: userEmail, password } = body;
    if (!userEmail || !password) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 },
      );
    }
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    const userName = user?.name;
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 },
      );
    }
    const accessSecret = process.env.SECRET_ACCESS_TOKEN;
    const refreshSecret = process.env.SECRET_REFRESH_TOKEN;
    if (!accessSecret || !refreshSecret) {
      console.log("Secret keys are not configured properly at .env file");
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
    const access_token = jwt.sign({ email: userEmail }, accessSecret, {
      expiresIn: "5m",
    });
    const refresh_token = jwt.sign({ email: userEmail }, refreshSecret, {
      expiresIn: "30d",
    });
    await redis.set(`${userEmail}_Access_Token`, access_token, { EX: 60 * 10 });
    await redis.set(`${userEmail}_Refresh_token`, refresh_token, {
      EX: 60 * 60 * 24 * 30,
    });
    const res = NextResponse.json(
      { message: "Login successful", userEmail, userName },
      { status: 201 },
    );
    const base = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    };
    res.cookies.set("access_token", access_token, {
      ...base,
      path: "/",
      maxAge: 60 * 5,
    });
    res.cookies.set("refresh_token", refresh_token, {
      ...base,
      path: "/api/auth",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error) {
    console.log("Login Error "+error)
  }
  return NextResponse.json(
    {
      message: "Trouble logging in",
    },
    { status: 500 },
  );
}

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
    // fetching emailID and password from body sent by user
    const { email: userEmail, password } = body;
    // edge case for empty password or email
    if (!userEmail || !password) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    const userName = user?.name;
    const userID=user?.id;

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
    // generating access token and refresh token
    const access_token = jwt.sign({ email: userEmail }, accessSecret, {
      expiresIn: "5m",
    });
    const refresh_token = jwt.sign({ email: userEmail }, refreshSecret, {
      expiresIn: "30d",
    });
    // setting up tokens in redis after successful login
    await redis.set(`${userEmail}_Access_Token`, access_token, { EX: 60 * 10 });
    await redis.set(`${userEmail}_Refresh_token`, refresh_token, {
      EX: 60 * 60 * 24 * 30,
    });
    // returning response of email, name and 201 to browser 
    const res = NextResponse.json(
      { message: "Login successful", userEmail, userName,userID },
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
  } 
  catch (error) {
    console.log("Login Error " + error);
  }
  return NextResponse.json(
    {
      message: "Trouble logging in",
    },
    { status: 500 },
  );
}

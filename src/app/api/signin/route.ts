import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!email || !password || !name) {
      return NextResponse.json({
        message: "All fields mandatory",
        status: 400,
      });
    }
    const hashed = await bcrypt.hash(password, 5);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
    return NextResponse.json({
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    console.log("Here we have the error");
    console.log(error);
    return NextResponse.json({
      message: "Could not create user",
      status: 500,
    });
  }
}

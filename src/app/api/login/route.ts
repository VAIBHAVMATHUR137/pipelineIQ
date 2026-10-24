import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

    const body = await request.json();
    const { email: userEmail, password } = body;
    if (!userEmail || !password) {
      return NextResponse.json({
        message: "All fields are mandatory",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 400,
      });
    }
    const validPassword: boolean = await bcrypt.compare(password, password);
    if (!validPassword) {
      return NextResponse.json({
        message: "Invalid password",
        status: 400,
      });
    }
    const accesstoken = jwt.sign(userEmail, process.env.SECRET_ACCESS_TOKEN!, {
      expiresIn: "10m",
    });
    const refreshtoken = jwt.sign(
      userEmail,
      process.env.SECRET_REFRESH_TOKEN!,
      {
        expiresIn: "30days",
      },
    );
    await 
    try {
        
    } catch (error) {
        
    }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(request: NextResponse) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!email || !password || !name) {
      return NextResponse.json({
        message: "All fields are mandatory",
        status: 400,
      });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
        message:"Could not create user",
        status:500
    })
  }
}


import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { phone, role } = await req.json();
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { phone, role },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error: any) {
    console.error("EDIT ERROR:", error);

    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

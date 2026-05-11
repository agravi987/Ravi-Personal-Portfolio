import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { fallbackProfile } from "@/lib/portfolio-data";
import { profileSchema, validationError } from "@/lib/validation";

export async function GET() {
  await dbConnect();
  const profile = await Profile.findOne({});
  return NextResponse.json(profile || fallbackProfile);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(validationError(parsed.error), { status: 400 });
    }

    const profile = await Profile.findOneAndUpdate({}, parsed.data, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

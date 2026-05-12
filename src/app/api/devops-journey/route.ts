import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DevOpsMilestone from "@/models/DevOpsMilestone";
import { devOpsMilestoneSchema, validationError } from "@/lib/validation";

export async function GET() {
  await dbConnect();

  try {
    const milestones = await DevOpsMilestone.find({}).sort({
      order: 1,
      createdAt: 1,
    });
    return NextResponse.json(milestones);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch DevOps journey milestones" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const parsed = devOpsMilestoneSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(validationError(parsed.error), { status: 400 });
    }

    const milestone = await DevOpsMilestone.create(parsed.data);
    return NextResponse.json(milestone, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create DevOps journey milestone" },
      { status: 500 }
    );
  }
}

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Knowledge from "@/models/Knowledge";
import { knowledgeSchema, validationError } from "@/lib/validation";

export async function GET() {
  await dbConnect();

  try {
    const knowledge = await Knowledge.find({}).sort({
      featured: -1,
      category: 1,
      createdAt: -1,
    });
    return NextResponse.json(knowledge);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch knowledge" },
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
    const parsed = knowledgeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(validationError(parsed.error), { status: 400 });
    }

    const knowledge = await Knowledge.create(parsed.data);
    return NextResponse.json(knowledge, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create knowledge entry" },
      { status: 500 }
    );
  }
}

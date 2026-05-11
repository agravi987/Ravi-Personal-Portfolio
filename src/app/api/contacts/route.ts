import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendContactEmail } from "@/lib/email";
import { auth } from "@/auth";
import { contactSchema, validationError } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

// GET - Fetch all contacts (admin only)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const contacts = await Contact.find({}).sort({ submittedAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// POST - Submit new contact (public)
export async function POST(req: Request) {
  await dbConnect();

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const limit = rateLimit(`contact:${ip}`, {
      limit: 4,
      windowMs: 10 * 60 * 1000,
    });

    if (limit.limited) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(validationError(parsed.error), { status: 400 });
    }

    if (parsed.data.company) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const { name, email, subject, message } = parsed.data;

    // Save to database
    await Contact.create({
      name,
      email,
      subject: subject || "",
      message,
    });

    // Send email notification (don't block response if email fails)
    sendContactEmail({ name, email, subject, message }).catch((err) =>
      console.error("Email notification failed:", err)
    );

    return NextResponse.json(
      { success: true, message: "Thank you for your message!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);

    // Handle validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Please fill all required fields correctly" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

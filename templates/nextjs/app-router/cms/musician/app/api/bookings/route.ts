import { NextResponse } from "next/server";
import { db, isDbConnected } from "@/lib/db";
import { bookings } from "@/db/schema";

export async function POST(req: Request) {
  if (!isDbConnected) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 },
    );
  }
  try {
    const body = await req.json();
    if (!body?.clientName || !body?.clientEmail) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }
    const [row] = await db
      .insert(bookings)
      .values({
        clientName: body.clientName,
        clientEmail: body.clientEmail,
        clientPhone: body.clientPhone ?? null,
        eventType: body.eventType ?? null,
        eventDate: body.eventDate ? new Date(body.eventDate) : null,
        budget: body.budget ?? null,
        message: body.message ?? null,
      })
      .returning();
    return NextResponse.json({ booking: row }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create booking." },
      { status: 500 },
    );
  }
}

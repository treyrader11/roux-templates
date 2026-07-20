import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/bookings — list bookings (most recent first).
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: { service: true, staff: true },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }
}

// POST /api/bookings — create a booking request.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, clientPhone, serviceId, date, notes } = body;

    if (!clientName || !clientEmail || !serviceId || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.create({
      data: {
        clientName,
        clientEmail,
        clientPhone: clientPhone || null,
        serviceId,
        date: new Date(date),
        notes: notes || null,
        status: "pending",
      },
    });
    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not create booking (is the database configured?)" },
      { status: 503 },
    );
  }
}

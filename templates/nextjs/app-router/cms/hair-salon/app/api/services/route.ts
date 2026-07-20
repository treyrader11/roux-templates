import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services — list active services.
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { category: "asc" },
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }
}

// POST /api/services — create a service.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, duration, category } = body;

    if (!name || price == null || duration == null || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const service = await prisma.service.create({
      data: {
        name,
        description: description || null,
        price: Number(price),
        duration: Number(duration),
        category,
      },
    });
    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not create service (is the database configured?)" },
      { status: 503 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      destination,
      startDate,
      endDate,
      numTravellers,
      budget,
    } = body;

    // Basic validation
    if (!email || !phone || !destination) {
      return NextResponse.json(
        { success: false, error: "Email, phone, and destination are required." },
        { status: 400 }
      );
    }

    const dateOnly = /^\d{4}-\d{2}-\d{2}$/;
    const earliestAllowed = new Date();
    earliestAllowed.setUTCHours(0, 0, 0, 0);
    earliestAllowed.setUTCDate(earliestAllowed.getUTCDate() - 1);

    const isOnOrAfterToday = (value: string) => {
      if (!dateOnly.test(value)) return false;
      return new Date(`${value}T00:00:00Z`) >= earliestAllowed;
    };

    if (startDate && !isOnOrAfterToday(startDate)) {
      return NextResponse.json(
        { success: false, error: "Start date cannot be before today." },
        { status: 400 }
      );
    }

    if (endDate && !isOnOrAfterToday(endDate)) {
      return NextResponse.json(
        { success: false, error: "End date cannot be before today." },
        { status: 400 }
      );
    }

    if (startDate && endDate && endDate < startDate) {
      return NextResponse.json(
        { success: false, error: "End date cannot be before the start date." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO bookings
         (full_name, email, phone, destination, start_date, end_date, num_travellers, budget)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [
        fullName || null,
        email,
        phone,
        destination,
        startDate || null,
        endDate || null,
        numTravellers || null,
        budget || null,
      ]
    );

    const booking = result.rows[0];
    return NextResponse.json({ success: true, id: booking.id, createdAt: booking.created_at });
  } catch (err) {
    console.error("[/api/bookings] Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save booking. Please try again." },
      { status: 500 }
    );
  }
}

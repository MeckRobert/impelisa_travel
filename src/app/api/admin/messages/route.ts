import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, phone, destination, start_date, budget, status, created_at
       FROM bookings
       ORDER BY created_at DESC
       LIMIT 100`
    );
    const messages = result.rows.map((row) => ({
      id: row.id,
      name: row.full_name,
      email: row.email,
      phone: row.phone,
      subject: `Trip request — ${row.destination}`,
      body: row.budget ? `Budget: ${row.budget}` : "New trip enquiry",
      status: row.status === "pending" ? "unread" : "read",
      created_at: row.created_at,
      bookingId: row.id,
    }));
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("[/api/admin/messages GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

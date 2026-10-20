import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") ?? "";
  const params: string[] = [];
  let where = "";
  if (search) {
    where = `WHERE email ILIKE $1 OR COALESCE(full_name, '') ILIKE $1 OR COALESCE(phone, '') ILIKE $1`;
    params.push(`%${search}%`);
  }

  try {
    const result = await pool.query(
      `SELECT
         MIN(id) AS id,
         MAX(full_name) AS full_name,
         email,
         MAX(phone) AS phone,
         COUNT(*)::int AS total_bookings,
         MAX(created_at) AS last_booking,
         COALESCE(SUM(amount), 0)::float AS total_spent
       FROM bookings
       ${where}
       GROUP BY email
       ORDER BY last_booking DESC`,
      params
    );
    return NextResponse.json({ customers: result.rows });
  } catch (err) {
    console.error("[/api/admin/customers GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

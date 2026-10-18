import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "";
  const destination = searchParams.get("destination") ?? "";
  const search = searchParams.get("search") ?? "";

  let where = "WHERE 1=1";
  const params: string[] = [];
  let idx = 1;

  if (status) { where += ` AND status = $${idx++}`; params.push(status); }
  if (destination) { where += ` AND destination ILIKE $${idx++}`; params.push(`%${destination}%`); }
  if (search) {
    where += ` AND (full_name ILIKE $${idx} OR email ILIKE $${idx} OR destination ILIKE $${idx})`;
    params.push(`%${search}%`); idx++;
  }

  try {
    const result = await pool.query(
      `SELECT id, full_name, email, phone, destination, start_date, end_date, num_travellers, budget, status, amount, created_at
       FROM bookings ${where} ORDER BY created_at DESC`,
      params
    );
    return NextResponse.json({ bookings: result.rows });
  } catch (err) {
    console.error("[/api/admin/bookings GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

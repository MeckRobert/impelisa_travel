import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { parseBudgetAmount } from "@/lib/adminFormat";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "";
  const destination = searchParams.get("destination") ?? "";
  const search = searchParams.get("search") ?? "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  let where = "WHERE 1=1";
  const params: string[] = [];
  let idx = 1;

  if (status) {
    where += ` AND status = $${idx++}`;
    params.push(status);
  }
  if (destination) {
    where += ` AND destination ILIKE $${idx++}`;
    params.push(`%${destination}%`);
  }
  if (search) {
    where += ` AND (full_name ILIKE $${idx} OR email ILIKE $${idx} OR destination ILIKE $${idx})`;
    params.push(`%${search}%`);
    idx++;
  }
  if (from) {
    where += ` AND COALESCE(start_date, created_at::date) >= $${idx++}`;
    params.push(from);
  }
  if (to) {
    where += ` AND COALESCE(start_date, created_at::date) <= $${idx++}`;
    params.push(to);
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
      status,
      amount,
    } = body;

    if (!email || !phone || !destination) {
      return NextResponse.json({ error: "Email, phone, and destination are required." }, { status: 400 });
    }

    const resolvedAmount = amount ?? parseBudgetAmount(budget);

    const result = await pool.query(
      `INSERT INTO bookings
         (full_name, email, phone, destination, start_date, end_date, num_travellers, budget, status, amount)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        fullName || null,
        email,
        phone,
        destination,
        startDate || null,
        endDate || null,
        numTravellers || null,
        budget || null,
        status || "pending",
        resolvedAmount,
      ]
    );

    return NextResponse.json({ booking: result.rows[0] });
  } catch (err) {
    console.error("[/api/admin/bookings POST]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

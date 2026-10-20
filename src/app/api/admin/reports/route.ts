import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from");
  const to = req.nextUrl.searchParams.get("to");
  const status = req.nextUrl.searchParams.get("status") ?? "";

  const params: string[] = [];
  let where = "WHERE 1=1";
  let idx = 1;
  if (from) {
    where += ` AND COALESCE(start_date, created_at::date) >= $${idx++}`;
    params.push(from);
  }
  if (to) {
    where += ` AND COALESCE(start_date, created_at::date) <= $${idx++}`;
    params.push(to);
  }
  if (status) {
    where += ` AND status = $${idx++}`;
    params.push(status);
  }

  try {
    const [bookings, revenue, destinations] = await Promise.all([
      pool.query(
        `SELECT id, full_name, destination, start_date, status, amount
         FROM bookings ${where} ORDER BY start_date DESC NULLS LAST, created_at DESC`,
        params
      ),
      pool.query(
        `SELECT TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') AS month,
                COALESCE(SUM(amount),0)::float AS revenue,
                COUNT(*)::int AS bookings
         FROM bookings ${where}
         GROUP BY DATE_TRUNC('month', created_at)
         ORDER BY DATE_TRUNC('month', created_at)`,
        params
      ),
      pool.query(
        `SELECT destination,
                COUNT(*)::int AS bookings,
                COALESCE(SUM(amount),0)::float AS revenue
         FROM bookings ${where}
         GROUP BY destination
         ORDER BY bookings DESC`,
        params
      ),
    ]);

    return NextResponse.json({
      bookings: bookings.rows,
      revenue: revenue.rows,
      destinations: destinations.rows,
      totals: {
        bookings: bookings.rows.length,
        revenue: bookings.rows.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0),
      },
    });
  } catch (err) {
    console.error("[/api/admin/reports GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

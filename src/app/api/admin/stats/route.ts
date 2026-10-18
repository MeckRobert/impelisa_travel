import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [bookingsRes, customersRes, revenueRes, recentRes, monthlyRes] = await Promise.all([
      pool.query(`SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status='confirmed') AS confirmed FROM bookings`),
      pool.query(`SELECT COUNT(DISTINCT email) AS total FROM bookings`),
      pool.query(`SELECT COALESCE(SUM(amount),0) AS total FROM bookings WHERE status='confirmed'`),
      pool.query(`
        SELECT id, full_name, destination, start_date, end_date, status, amount, created_at
        FROM bookings ORDER BY created_at DESC LIMIT 8
      `),
      pool.query(`
        SELECT
          TO_CHAR(created_at, 'Mon') AS month,
          COUNT(*) AS bookings
        FROM bookings
        WHERE created_at >= NOW() - INTERVAL '6 months'
        GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
        ORDER BY DATE_TRUNC('month', created_at)
      `),
    ]);

    return NextResponse.json({
      totalBookings: parseInt(bookingsRes.rows[0].total),
      confirmedBookings: parseInt(bookingsRes.rows[0].confirmed),
      totalCustomers: parseInt(customersRes.rows[0].total),
      totalRevenue: parseFloat(revenueRes.rows[0].total),
      recentBookings: recentRes.rows,
      monthlyData: monthlyRes.rows,
    });
  } catch (err) {
    console.error("[/api/admin/stats]", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

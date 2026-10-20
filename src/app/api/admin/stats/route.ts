import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [bookingsRes, customersRes, revenueRes, recentRes, monthlyRes, destRes, toursRes] =
      await Promise.all([
        pool.query(
          `SELECT COUNT(*) AS total,
                  COUNT(*) FILTER (WHERE status='confirmed') AS confirmed,
                  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS last_30,
                  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '60 days' AND created_at < NOW() - INTERVAL '30 days') AS prev_30
           FROM bookings`
        ),
        pool.query(`SELECT COUNT(DISTINCT email) AS total FROM bookings`),
        pool.query(
          `SELECT COALESCE(SUM(amount),0) AS total,
                  COALESCE(SUM(amount) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days' AND status='confirmed'),0) AS last_30
           FROM bookings WHERE status='confirmed'`
        ),
        pool.query(`
          SELECT id, full_name, destination, start_date, end_date, status, amount, created_at
          FROM bookings ORDER BY created_at DESC LIMIT 8
        `),
        pool.query(`
          SELECT
            TO_CHAR(created_at, 'Mon') AS month,
            COUNT(*)::int AS bookings
          FROM bookings
          WHERE created_at >= NOW() - INTERVAL '6 months'
          GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
          ORDER BY DATE_TRUNC('month', created_at)
        `),
        pool.query(`
          SELECT destination, COUNT(*)::int AS count
          FROM bookings
          GROUP BY destination
          ORDER BY count DESC
          LIMIT 6
        `),
        pool.query(`SELECT COUNT(*) AS total FROM safari_packages WHERE status='active'`).catch(() => ({
          rows: [{ total: 0 }],
        })),
      ]);

    const last30 = parseInt(bookingsRes.rows[0].last_30);
    const prev30 = parseInt(bookingsRes.rows[0].prev_30) || 1;
    const bookingChange = ((last30 - prev30) / prev30) * 100;

    return NextResponse.json({
      totalBookings: parseInt(bookingsRes.rows[0].total),
      confirmedBookings: parseInt(bookingsRes.rows[0].confirmed),
      totalCustomers: parseInt(customersRes.rows[0].total),
      activeTours: parseInt(toursRes.rows[0].total),
      totalRevenue: parseFloat(revenueRes.rows[0].total),
      bookingChange,
      recentBookings: recentRes.rows,
      monthlyData: monthlyRes.rows,
      destinationBreakdown: destRes.rows,
    });
  } catch (err) {
    console.error("[/api/admin/stats]", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

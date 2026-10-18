import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
    if (!result.rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ booking: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();
  const { status, amount } = body;
  try {
    const result = await pool.query(
      `UPDATE bookings SET status = COALESCE($1, status), amount = COALESCE($2, amount)
       WHERE id = $3 RETURNING *`,
      [status ?? null, amount ?? null, id]
    );
    return NextResponse.json({ booking: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

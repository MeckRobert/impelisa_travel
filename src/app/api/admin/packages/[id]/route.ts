import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const { name, duration_days, price_per_person, description, image_url, status } = await req.json();
  try {
    const result = await pool.query(
      `UPDATE safari_packages SET
         name = COALESCE($1, name),
         duration_days = COALESCE($2, duration_days),
         price_per_person = COALESCE($3, price_per_person),
         description = COALESCE($4, description),
         image_url = COALESCE($5, image_url),
         status = COALESCE($6, status)
       WHERE id = $7 RETURNING *`,
      [
        name ?? null,
        duration_days ?? null,
        price_per_person ?? null,
        description ?? null,
        image_url ?? null,
        status ?? null,
        id,
      ]
    );
    if (!result.rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ package: result.rows[0] });
  } catch (err) {
    console.error("[/api/admin/packages PATCH]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    await pool.query(`DELETE FROM safari_packages WHERE id = $1`, [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/admin/packages DELETE]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const { name, country, description, image_url, status } = await req.json();
  try {
    const result = await pool.query(
      `UPDATE destinations SET
         name = COALESCE($1, name),
         country = COALESCE($2, country),
         description = COALESCE($3, description),
         image_url = COALESCE($4, image_url),
         status = COALESCE($5, status)
       WHERE id = $6 RETURNING *`,
      [name ?? null, country ?? null, description ?? null, image_url ?? null, status ?? null, id]
    );
    if (!result.rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ destination: result.rows[0] });
  } catch (err) {
    console.error("[/api/admin/destinations PATCH]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    await pool.query(`DELETE FROM destinations WHERE id = $1`, [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/admin/destinations DELETE]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

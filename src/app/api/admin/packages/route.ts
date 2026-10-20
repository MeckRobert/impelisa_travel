import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, duration_days, price_per_person, description, image_url, status, created_at
       FROM safari_packages ORDER BY id ASC`
    );
    return NextResponse.json({ packages: result.rows });
  } catch (err) {
    console.error("[/api/admin/packages GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, duration_days, price_per_person, description, image_url, status } = await req.json();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  try {
    const result = await pool.query(
      `INSERT INTO safari_packages (name, duration_days, price_per_person, description, image_url, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        name,
        duration_days || 1,
        price_per_person || 0,
        description || null,
        image_url || null,
        status || "active",
      ]
    );
    return NextResponse.json({ package: result.rows[0] });
  } catch (err) {
    console.error("[/api/admin/packages POST]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, country, description, image_url, status, created_at
       FROM destinations ORDER BY id ASC`
    );
    return NextResponse.json({ destinations: result.rows });
  } catch (err) {
    console.error("[/api/admin/destinations GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, country, description, image_url, status } = await req.json();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  try {
    const result = await pool.query(
      `INSERT INTO destinations (name, country, description, image_url, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, country || "Tanzania", description || null, image_url || null, status || "active"]
    );
    return NextResponse.json({ destination: result.rows[0] });
  } catch (err) {
    console.error("[/api/admin/destinations POST]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

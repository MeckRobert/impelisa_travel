import { NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/adminAuth";

export async function GET() {
  const admin = await getAdminFromCookie();
  return NextResponse.json({ authenticated: !!admin });
}

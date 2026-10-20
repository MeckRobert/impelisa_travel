import { NextRequest, NextResponse } from "next/server";
import { isValidCredentials, signAdminToken, ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { username, password, remember } = await req.json();

  if (!isValidCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signAdminToken();
  const response = NextResponse.json({ success: true });

  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
    path: "/",
  });

  return response;
}

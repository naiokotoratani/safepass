import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, getSessionUser } from "@/lib/auth/store";
export const runtime = "nodejs";
export async function GET() {
  const user = await getSessionUser((await cookies()).get(COOKIE_NAME)?.value);
  return user ? NextResponse.json({ user }) : NextResponse.json({ user: null }, { status: 401 });
}

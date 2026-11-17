import { NextResponse } from "next/server";
import { COOKIE_NAME, createSession } from "./store";
import type { AuthUser } from "./types";
export function sessionResponse(user: AuthUser) {
  const response = NextResponse.json({ user });
  response.cookies.set(COOKIE_NAME, createSession(user), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
export function errorResponse(message: string, status = 400) { return NextResponse.json({ error: message }, { status }); }

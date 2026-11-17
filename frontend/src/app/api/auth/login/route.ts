import { NextRequest } from "next/server";
import { authenticate } from "@/lib/auth/store";
import { errorResponse, sessionResponse } from "@/lib/auth/http";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return errorResponse("Informe e-mail e senha.");
    const user = await authenticate(email, password);
    if (!user) return errorResponse("E-mail ou senha inválidos.", 401);
    return sessionResponse(user);
  } catch { return errorResponse("Não foi possível realizar o login.", 500); }
}

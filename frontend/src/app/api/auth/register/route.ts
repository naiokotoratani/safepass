import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/store";
import { sessionResponse, errorResponse } from "@/lib/auth/http";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, document, phone, specialty } = body;
    if (!name || !email || !password || !document || !phone || !["empresa", "prestador"].includes(role)) return errorResponse("Preencha todos os campos obrigatórios.");
    if (String(password).length < 8) return errorResponse("A senha deve ter pelo menos 8 caracteres.");
    const user = await registerUser({ name, email, password, role, document, phone, specialty });
    return sessionResponse(user);
  } catch (error) { return errorResponse(error instanceof Error ? error.message : "Não foi possível concluir o cadastro.", 409); }
}

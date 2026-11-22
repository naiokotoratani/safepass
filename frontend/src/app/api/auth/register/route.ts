import { NextRequest } from "next/server";
import { registerUser } from "@/lib/auth/store";
import { sessionResponse, errorResponse } from "@/lib/auth/http";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, document, phone, specialty, adminCode } = body;
    const allowedRoles = ["admin", "usuario", "empresa", "prestador"];
    if (!name || !email || !password || !document || !phone || !allowedRoles.includes(role)) {
      return errorResponse("Preencha todos os campos obrigatórios.");
    }
    if (String(password).length < 8) return errorResponse("A senha deve ter pelo menos 8 caracteres.");
    const user = await registerUser({ name, email, password, role, document, phone, specialty, adminCode });
    return sessionResponse(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível concluir o cadastro.";
    return errorResponse(message, message.includes("autorização") ? 403 : 409);
  }
}

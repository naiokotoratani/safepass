import { NextRequest, NextResponse } from "next/server";
// Demonstração: confirma a solicitação sem revelar se o e-mail existe. O envio real
// do link deve ser conectado ao provedor de e-mail quando o backend definitivo chegar.
export async function POST(request: NextRequest) {
  const { email } = await request.json();
  if (!email || !String(email).includes("@")) return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  return NextResponse.json({ message: "Se o e-mail estiver cadastrado, você receberá as instruções de recuperação." });
}

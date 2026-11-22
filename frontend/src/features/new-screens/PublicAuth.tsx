
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";

const field =
  "mt-1 h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

type ApiResult = {
  error?: string;
  message?: string;
  user?: {
    role: "admin" | "usuario" | "empresa" | "prestador";
  };
};

async function postAuth(
  url: string,
  payload: unknown
): Promise<ApiResult> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Não foi possível concluir a solicitação."
    );
  }

  return data;
}

function getDashboardPath(role?: "admin" | "usuario" | "empresa" | "prestador") {
  switch (role) {
    case "admin": return "/admin";
    case "usuario": return "/usuario";
    case "empresa": return "/empresa";
    case "prestador": return "/prestador";
    default: return "/login";
  }
}

// Estrutura compartilhada das telas de autenticação
export function AuthFrame({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-[480px]">
        {/* Logo superior */}
        <div className="mb-7 flex justify-center">
          <Logo href="/login" />
        </div>

        <section className="rounded-3xl border bg-card p-6 shadow-card sm:p-9">
          <div className="mb-7 text-center">
            {/* Logo oficial no lugar do escudo */}
            <div className="mb-4 flex justify-center">
              <Image
                src="/safepass-logo.png"
                alt="SAFEpass"
                width={180}
                height={60}
                priority
                className="h-auto w-[150px] object-contain"
              />
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {children}
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Sua plataforma de benefícios e cuidado.
        </p>
      </div>
    </main>
  );
}

// Tela de login
export function LoginForm() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await postAuth("/api/auth/login", {
        email,
        password,
      });

      router.replace(
        getDashboardPath(data.user?.role)
      );

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha no login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFrame subtitle="Entre na sua conta para continuar.">
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold">
          E-mail

          <input
            className={field}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@empresa.com"
          />
        </label>

        <label className="block text-sm font-semibold">
          Senha

          <span className="relative mt-1 block">
            <input
              className={`${field} pr-12`}
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute top-3 right-3 text-muted-foreground"
              aria-label={show ? "Ocultar senha" : "Mostrar senha"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </span>
        </label>

        <div className="flex justify-end text-sm">
          <Link
            className="font-semibold text-primary hover:underline"
            href="/recuperar-senha"
          >
            Esqueci minha senha
          </Link>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-warning-soft p-3 text-sm text-primary"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link
          className="font-bold text-primary hover:underline"
          href="/cadastro"
        >
          Criar cadastro
        </Link>
      </p>
    </AuthFrame>
  );
}

// Tela de cadastro
export function RegisterForm() {
  const router = useRouter();

  const [type, setType] = useState("Usuário");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));

    if (password !== String(form.get("confirmPassword"))) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const data = await postAuth("/api/auth/register", {
        role: type === "Empresa" ? "empresa" : type === "Prestador" ? "prestador" : type === "Administrador" ? "admin" : "usuario",
        adminCode: form.get("adminCode"),
        name: form.get("name"),
        document: form.get("document"),
        specialty: form.get("specialty"),
        phone: form.get("phone"),
        email: form.get("email"),
        password,
      });

      setMessage("Cadastro realizado! Redirecionando...");

      router.replace(
        getDashboardPath(data.user?.role)
      );

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível cadastrar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFrame subtitle="Crie seu acesso ao SAFEpass.">
      <form className="space-y-3" onSubmit={submit}>
        <label className="block text-sm font-semibold">
          Tipo de conta

          <select
            name="type"
            className={field}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Usuário</option>
            <option>Prestador</option>
            <option>Empresa</option>
            <option>Administrador</option>
          </select>
        </label>

        <label className="block text-sm font-semibold">
          {type === "Empresa" ? "Nome da empresa" : "Nome completo"}

          <input
            name="name"
            className={field}
            required
            placeholder={
              type === "Empresa" ? "Razão social" : "Seu nome"
            }
          />
        </label>

        <label className="block text-sm font-semibold">
          {type === "Empresa" ? "CNPJ" : "CPF"}

          <input
            name="document"
            className={field}
            required
            placeholder="Documento"
          />
        </label>

        {type === "Prestador" && (
          <label className="block text-sm font-semibold">
            Especialidade / categoria

            <input
              name="specialty"
              className={field}
              required
              placeholder="Ex.: Psicologia"
            />
          </label>
        )}

        {type === "Administrador" && (
          <label className="block text-sm font-semibold">
            Código de autorização administrativa
            <input
              name="adminCode"
              className={field}
              type="password"
              required
              placeholder="Código fornecido pela equipe SAFEpass"
              autoComplete="off"
            />
            <span className="mt-1 block text-xs font-normal text-muted-foreground">
              O cadastro administrativo só é liberado com um código autorizado.
            </span>
          </label>
        )}

        <label className="block text-sm font-semibold">
          Nome do responsável

          <input
            name="responsible"
            className={field}
            required
            placeholder="Nome completo"
          />
        </label>

        <label className="block text-sm font-semibold">
          E-mail

          <input
            name="email"
            className={field}
            type="email"
            required
            placeholder="voce@email.com"
          />
        </label>

        <label className="block text-sm font-semibold">
          Telefone

          <input
            name="phone"
            className={field}
            type="tel"
            required
            placeholder="(00) 00000-0000"
          />
        </label>

        <label className="block text-sm font-semibold">
          Senha

          <input
            name="password"
            className={field}
            type="password"
            minLength={8}
            required
            placeholder="Mínimo de 8 caracteres"
          />
        </label>

        <label className="block text-sm font-semibold">
          Confirmar senha

          <input
            name="confirmPassword"
            className={field}
            type="password"
            minLength={8}
            required
            placeholder="Repita sua senha"
          />
        </label>

        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            required
            className="mt-0.5 accent-primary"
          />

          Li e aceito os termos de uso e a política de privacidade.
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-warning-soft p-3 text-sm"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            className="rounded-xl bg-success-soft p-3 text-sm"
          >
            {message}
          </p>
        )}

        <Button
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Já possui conta?{" "}
        <Link
          className="font-bold text-primary"
          href="/login"
        >
          Entrar
        </Link>
      </p>
    </AuthFrame>
  );
}

// Tela de recuperação de senha
export function RecoveryForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const email = String(
        new FormData(e.currentTarget).get("email")
      );

      const data = await postAuth("/api/auth/recovery", {
        email,
      });

      setSent(true);
      setError(data.message || "");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Falha ao solicitar recuperação."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFrame subtitle="Informe seu e-mail para recuperar o acesso.">
      <form className="space-y-4" onSubmit={submit}>
        <label className="block text-sm font-semibold">
          E-mail cadastrado

          <input
            name="email"
            className={field}
            type="email"
            required
            placeholder="voce@email.com"
          />
        </label>

        {error && (
          <p
            role={sent ? "status" : "alert"}
            className="rounded-xl bg-warning-soft p-3 text-sm"
          >
            {error}
          </p>
        )}

        <Button
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Solicitar recuperação"}
        </Button>

        <Link
          className="block text-center text-sm font-semibold text-primary hover:underline"
          href="/login"
        >
          Voltar para o login
        </Link>
      </form>
    </AuthFrame>
  );
}

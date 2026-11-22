import type { Metadata } from "next";
import { PageTitle } from "@/components/layout/PageTitle";

export const metadata: Metadata = { title: "Minha área | SAFEpass" };

export default function UserDashboardPage() {
  return (
    <>
      <PageTitle
        eyebrow="Área do usuário"
        title="Bem-vindo ao SAFEpass"
        description="Acompanhe seus benefícios e organize sua jornada de saúde e bem-estar."
      />
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Meus benefícios", "Consulte os benefícios disponíveis para sua conta."],
          ["Minha família", "Organize as informações dos seus dependentes."],
          ["Meu perfil", "Mantenha seus dados pessoais atualizados."],
        ].map(([title, description]) => (
          <article key={title} className="rounded-2xl border bg-card p-6 shadow-card">
            <h2 className="font-semibold text-foreground">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>
    </>
  );
}

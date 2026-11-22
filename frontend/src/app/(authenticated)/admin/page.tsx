import type { Metadata } from "next";
import { PageTitle } from "@/components/layout/PageTitle";

export const metadata: Metadata = { title: "Painel administrativo | SAFEpass" };

export default function AdminDashboardPage() {
  return (
    <>
      <PageTitle
        eyebrow="Área administrativa"
        title="Painel administrativo"
        description="Área restrita para a equipe autorizada do SAFEpass."
      />
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Gestão de usuários", "Acompanhe e gerencie os acessos da plataforma."],
          ["Prestadores e empresas", "Consulte os cadastros e as parcerias."],
          ["Configurações", "Área reservada para as configurações administrativas."],
        ].map(([title, description]) => (
          <article key={title} className="rounded-2xl border bg-card p-6 shadow-card">
            <h2 className="font-semibold text-foreground">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>
      <p className="mt-6 text-xs text-muted-foreground">
        Os módulos de gestão serão conectados ao backend definitivo quando ele estiver disponível.
      </p>
    </>
  );
}

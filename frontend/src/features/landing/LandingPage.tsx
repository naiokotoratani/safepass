"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, Check, ChevronDown, HeartHandshake, Menu, ShieldCheck,
  Sparkles, Star, Stethoscope, Users, X, Building2, Gift, CalendarCheck,
} from "lucide-react";

const testimonials = [
  ["Mariana Alves", "Beneficiária", "Encontrei profissionais excelentes perto de casa e consegui organizar melhor meus cuidados."],
  ["Rafael Souza", "Beneficiário", "Os benefícios deixam tudo mais simples. Consigo acompanhar meus pontos e meus agendamentos."],
  ["Camila Ribeiro", "Beneficiária", "Uma plataforma prática, clara e que realmente facilita o acesso ao bem-estar."],
  ["João Pedro Lima", "Prestador", "O SAFEpass aproximou meu trabalho de pessoas que precisam dos meus serviços."],
  ["Fernanda Costa", "Beneficiária", "Gosto de ter tudo organizado em um só lugar, sem perder informações importantes."],
  ["Beatriz Martins", "Beneficiária", "A experiência é simples até para quem não tem tanta familiaridade com tecnologia."],
  ["André Oliveira", "Prestador", "A gestão dos atendimentos e benefícios ficou muito mais organizada."],
  ["Patrícia Gomes", "Empresa", "É muito mais fácil acompanhar os benefícios oferecidos à nossa equipe."],
  ["Lucas Ferreira", "Beneficiário", "Consigo descobrir novos serviços e aproveitar melhor os benefícios disponíveis."],
] as const;

const faqs = [
  ["O que é o SAFEpass?", "É uma plataforma que conecta pessoas, empresas e prestadores a benefícios de saúde e bem-estar."],
  ["Como faço meu cadastro?", "Acesse a área de entrada e escolha o tipo de cadastro disponível para você."],
  ["Como funcionam os pontos?", "Os pontos podem ser acumulados e trocados por benefícios disponíveis conforme as regras do seu plano."],
  ["Posso cadastrar meus dependentes?", "A plataforma permite organizar dependentes, incluindo pessoas e pets, de acordo com as permissões da conta."],
];

export function LandingPage() {
  const [providerOpen, setProviderOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="font-display text-2xl font-extrabold tracking-tight text-primary">SAFE<span className="text-emerald-500">pass</span></Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="#como-funciona" className="hover:text-primary">Como funciona</a>
            <a href="#beneficios" className="hover:text-primary">Benefícios</a>
            <a href="#planos" className="hover:text-primary">Planos</a>
            <a href="#duvidas" className="hover:text-primary">Dúvidas</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-full px-5 py-2.5 text-sm font-bold text-primary hover:bg-slate-50">Entrar</Link>
            <Link href="/cadastro" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-button hover:bg-primary-strong">Começar agora <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
          </div>
          <button aria-label="Abrir menu" className="rounded-lg p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <nav className="grid gap-3 border-t border-slate-100 px-6 py-5 text-sm font-semibold md:hidden"><a href="#como-funciona">Como funciona</a><a href="#beneficios">Benefícios</a><a href="#planos">Planos</a><a href="#duvidas">Dúvidas</a><Link href="/login">Entrar</Link><Link href="/cadastro">Criar conta</Link></nav>}
      </header>

      <section className="relative isolate bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700"><Sparkles className="h-4 w-4" /> Saúde e bem-estar em um só lugar</span>
            <h1 className="mt-7 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-6xl">Cuidar de você ficou <span className="text-emerald-500">mais simples.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Conectamos pessoas, empresas e prestadores a uma rede de benefícios que aproxima você de mais saúde, cuidado e qualidade de vida.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/cadastro" className="rounded-full bg-primary px-7 py-4 text-center font-bold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-primary-strong">Quero fazer parte <ArrowRight className="ml-2 inline h-4 w-4" /></Link>
              <a href="#como-funciona" className="rounded-full border border-slate-200 bg-white px-7 py-4 text-center font-bold text-primary hover:bg-slate-50">Conheça a plataforma</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-slate-500"><span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-500" /> Experiência integrada</span><span className="flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-emerald-500" /> Mais conexão e cuidado</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[3rem] bg-emerald-100/70 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white bg-white p-6 shadow-2xl shadow-primary/10 md:p-8">
              <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-slate-500">Sua jornada de cuidado</p><h2 className="mt-1 font-display text-2xl font-bold text-primary">Tudo conectado.</h2></div><div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600"><HeartHandshake className="h-7 w-7" /></div></div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-5"><Users className="h-6 w-6 text-primary" /><p className="mt-4 text-sm text-slate-500">Pessoas e família</p><p className="mt-1 font-bold text-primary">Mais cuidado</p></div>
                <div className="rounded-2xl bg-emerald-50 p-5"><Stethoscope className="h-6 w-6 text-emerald-600" /><p className="mt-4 text-sm text-slate-500">Rede de serviços</p><p className="mt-1 font-bold text-primary">Mais opções</p></div>
                <div className="rounded-2xl bg-blue-50 p-5"><Gift className="h-6 w-6 text-blue-600" /><p className="mt-4 text-sm text-slate-500">Pontos e benefícios</p><p className="mt-1 font-bold text-primary">Mais vantagens</p></div>
                <div className="rounded-2xl bg-amber-50 p-5"><CalendarCheck className="h-6 w-6 text-amber-600" /><p className="mt-4 text-sm text-slate-500">Organização</p><p className="mt-1 font-bold text-primary">Mais praticidade</p></div>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary p-5 text-white"><div className="rounded-xl bg-white/15 p-2"><Check className="h-5 w-5" /></div><p className="text-sm font-medium leading-6">Sua experiência de saúde e bem-estar em um só espaço.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Feito para conectar</p><h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-4xl">Um espaço para cada necessidade</h2><p className="mt-4 leading-7 text-slate-600">O SAFEpass aproxima quem busca cuidado de quem oferece serviços e de quem deseja promover qualidade de vida.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[{icon:Users,title:"Para você e sua família",desc:"Encontre prestadores, acompanhe benefícios, organize dependentes e consulte seus pontos.",cta:"Acessar minha conta"},{icon:Stethoscope,title:"Para prestadores",desc:"Apresente seus serviços, gerencie sua agenda e conecte-se a novos clientes.",cta:"Tenho um negócio"},{icon:Building2,title:"Para empresas",desc:"Organize benefícios, acompanhe a utilização e cuide melhor das pessoas da sua equipe.",cta:"Sou uma empresa"}].map((item) => <article key={item.title} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-lg"><div className="inline-flex rounded-2xl bg-emerald-50 p-4 text-emerald-600"><item.icon className="h-7 w-7" /></div><h3 className="mt-6 text-xl font-bold text-primary">{item.title}</h3><p className="mt-3 min-h-20 leading-7 text-slate-600">{item.desc}</p><Link href="/cadastro" className="mt-6 inline-flex items-center font-bold text-primary">{item.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link></article>)}
        </div>
      </section>

      <section id="como-funciona" className="bg-slate-50 py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Simples assim</p><h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-4xl">Sua experiência em quatro passos</h2></div><div className="mt-12 grid gap-8 md:grid-cols-4">{[{n:"01",t:"Crie sua conta",d:"Escolha seu perfil e faça seu cadastro."},{n:"02",t:"Explore",d:"Conheça serviços, planos e benefícios."},{n:"03",t:"Aproveite",d:"Use os recursos disponíveis para você."},{n:"04",t:"Acompanhe",d:"Organize sua jornada em um só painel."}].map(x=><div key={x.n} className="relative rounded-2xl bg-white p-7"><span className="font-display text-4xl font-extrabold text-emerald-200">{x.n}</span><h3 className="mt-4 font-bold text-primary">{x.t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{x.d}</p></div>)}</div></div></section>

      <section id="planos" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Escolha seu caminho</p><h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-4xl">Um plano que acompanha você</h2><p className="mt-4 text-slate-600">Conheça as opções e encontre a experiência que combina com suas necessidades.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[{name:"Free",desc:"Para começar a explorar",features:["Acesso à plataforma","Consulta de benefícios disponíveis","Perfil e informações da conta"]},{name:"Aura",desc:"Para aproveitar ainda mais",features:["Todos os recursos Free","Benefícios ampliados conforme o plano","Mais possibilidades de cuidado"],featured:true},{name:"Aura+",desc:"Uma experiência mais completa",features:["Todos os recursos Aura","Benefícios exclusivos conforme o plano","Experiência ampliada"]}].map(p=><article key={p.name} className={`rounded-3xl border p-8 ${p.featured?"border-primary bg-primary text-white shadow-hero":"border-slate-100 bg-white"}`}><p className={`text-sm font-bold ${p.featured?"text-emerald-200":"text-emerald-600"}`}>{p.name}</p><h3 className="mt-3 font-display text-2xl font-extrabold">{p.desc}</h3><ul className={`mt-7 space-y-4 text-sm ${p.featured?"text-white/90":"text-slate-600"}`}>{p.features.map(f=><li key={f} className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-emerald-500" />{f}</li>)}</ul><Link href="/cadastro" className={`mt-8 block rounded-full px-5 py-3 text-center font-bold ${p.featured?"bg-white text-primary":"bg-slate-100 text-primary hover:bg-slate-200"}`}>Conhecer plano</Link></article>)}</div><p className="mt-5 text-center text-xs text-slate-400">Valores e condições comerciais devem ser configurados pela administração da plataforma.</p></section>

      <section className="bg-emerald-50/70 py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Quem usa, recomenda</p><h2 className="mt-3 font-display text-3xl font-extrabold text-primary md:text-4xl">Histórias que conectam</h2></div><button onClick={()=>setRatingOpen(true)} className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-bold text-primary shadow-sm"><Star className="h-4 w-4 text-amber-400" /> Avaliar experiência</button></div><div className="mt-10 grid gap-4 md:grid-cols-3">{testimonials.map(([name,role,quote])=><article key={name} className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex gap-1 text-amber-400">{[1,2,3,4,5].map(n=><Star key={n} className="h-4 w-4 fill-current" />)}</div><p className="mt-4 leading-7 text-slate-600">“{quote}”</p><p className="mt-5 font-bold text-primary">{name}</p><p className="text-xs text-slate-400">{role}</p></article>)}</div></div></section>

      <section id="duvidas" className="mx-auto max-w-3xl px-5 py-20"><div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-emerald-600">FAQ</p><h2 className="mt-3 font-display text-3xl font-extrabold text-primary">Ficou com alguma dúvida?</h2></div><div className="mt-9 divide-y divide-slate-100">{faqs.map(([q,a],i)=><div key={q} className="py-5"><button className="flex w-full items-center justify-between gap-4 text-left font-bold text-primary" onClick={()=>setFaqOpen(faqOpen===i?null:i)}>{q}<ChevronDown className={`h-5 w-5 transition ${faqOpen===i?"rotate-180":""}`} /></button>{faqOpen===i&&<p className="mt-3 leading-7 text-slate-600">{a}</p>}</div>)}</div></section>

      <section className="bg-primary px-5 py-16 text-center text-white"><h2 className="font-display text-3xl font-extrabold md:text-4xl">Vamos cuidar melhor do que importa?</h2><p className="mx-auto mt-4 max-w-xl text-white/75">Faça parte de uma experiência que conecta saúde, bem-estar e benefícios.</p><Link href="/cadastro" className="mt-8 inline-flex rounded-full bg-white px-7 py-4 font-bold text-primary hover:bg-emerald-50">Começar agora <ArrowRight className="ml-2 h-4 w-4" /></Link><button onClick={()=>setProviderOpen(true)} className="mt-4 block w-full text-sm font-semibold text-white/80 underline underline-offset-4">Quero indicar meu estabelecimento</button></section>

      <footer className="bg-slate-950 px-5 py-10 text-slate-300"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row"><div><p className="font-display text-2xl font-extrabold text-white">SAFE<span className="text-emerald-400">pass</span></p><p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Conectando pessoas, empresas e prestadores a mais saúde e bem-estar.</p></div><div className="flex flex-wrap gap-8 text-sm"><a href="#como-funciona" className="hover:text-white">Como funciona</a><a href="#planos" className="hover:text-white">Planos</a><a href="#duvidas" className="hover:text-white">FAQ</a><Link href="/login" className="hover:text-white">Entrar</Link></div></div><div className="mx-auto mt-9 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">© {new Date().getFullYear()} SAFEpass. Todos os direitos reservados.</div></footer>

      {providerOpen && <div role="dialog" aria-modal="true" aria-labelledby="provider-title" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"><div className="w-full max-w-md rounded-3xl bg-white p-7"><div className="flex items-center justify-between"><h2 id="provider-title" className="text-xl font-bold text-primary">Indique seu estabelecimento</h2><button aria-label="Fechar" onClick={()=>setProviderOpen(false)}><X /></button></div><p className="mt-2 text-sm text-slate-500">Conte um pouco sobre seu negócio para conhecer as possibilidades de parceria.</p><form className="mt-6 space-y-4" onSubmit={e=>{e.preventDefault();setProviderOpen(false);}}><label className="block text-sm font-semibold">Nome do estabelecimento<input required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal" /></label><label className="block text-sm font-semibold">E-mail de contato<input type="email" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal" /></label><button className="w-full rounded-full bg-primary px-5 py-3 font-bold text-white">Enviar interesse</button></form></div></div>}
      {ratingOpen && <div role="dialog" aria-modal="true" aria-labelledby="rating-title" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"><div className="w-full max-w-md rounded-3xl bg-white p-7 text-center"><button aria-label="Fechar" className="ml-auto block" onClick={()=>setRatingOpen(false)}><X /></button><h2 id="rating-title" className="text-xl font-bold text-primary">Como foi sua experiência?</h2><p className="mt-2 text-sm text-slate-500">Sua opinião ajuda a melhorar a plataforma.</p><div className="mt-6 flex justify-center gap-2">{[1,2,3,4,5].map(n=><button key={n} aria-label={`${n} estrelas`} onClick={()=>setRating(n)} className={rating>=n?"text-amber-400":"text-slate-200"}><Star className="h-9 w-9 fill-current" /></button>)}</div><button disabled={!rating} onClick={()=>setRatingOpen(false)} className="mt-7 w-full rounded-full bg-primary px-5 py-3 font-bold text-white disabled:opacity-40">Enviar avaliação</button></div></div>}
    </main>
  );
}

"use client";
import { BriefcaseBusiness, Building2, ChevronDown, LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { COMPANY_AREA, PROVIDER_AREA, type Area } from "./navigation";
export function AccountMenu({ area }: { area: Area }) {
  const router=useRouter(); const otherArea=area.key==="provider"?COMPANY_AREA:PROVIDER_AREA; const OtherIcon=otherArea.key==="company"?Building2:BriefcaseBusiness; const [name,setName]=useState("Minha conta");
  useEffect(()=>{fetch("/api/auth/me",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(data=>{if(data?.user?.name)setName(data.user.name);}).catch(()=>{});},[]);
  async function logout(){try{await fetch("/api/auth/logout",{method:"POST"});router.replace("/login");router.refresh();}catch{toast.error("Não foi possível encerrar a sessão.");}}
  return <DropdownMenu><DropdownMenuTrigger className="group flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring" aria-label="Abrir menu da conta"><span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-primary">{name.slice(0,1).toUpperCase()}</span><span className="hidden max-w-36 truncate text-sm font-medium sm:block">{name}</span><ChevronDown className="size-4 text-primary transition-transform group-data-[state=open]:rotate-180" aria-hidden="true"/></DropdownMenuTrigger><DropdownMenuContent align="end">{area.key==="provider"&&<DropdownMenuItem onSelect={()=>router.push("/prestador/perfil")}><UserRound className="text-primary"/>Meu perfil</DropdownMenuItem>}<DropdownMenuItem onSelect={()=>router.push(otherArea.home)}><OtherIcon className="text-primary"/>Ir para {otherArea.key==="company"?"Empresa":"Prestador"}</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem className="data-[highlighted]:text-destructive" onSelect={logout}><LogOut/>Sair</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
}

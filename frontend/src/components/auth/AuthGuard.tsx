"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter(); const pathname = usePathname(); const [ready, setReady] = useState(false);
  useEffect(() => { let active = true;
    fetch("/api/auth/me", { cache: "no-store" }).then(async (response) => {
      if (!response.ok) { router.replace(`/login?next=${encodeURIComponent(pathname)}`); return; }
      const data = await response.json(); const role = data.user?.role;
      if (role === "empresa" && !pathname.startsWith("/empresa") && pathname !== "/notificacoes") { router.replace("/empresa"); return; }
      if (role === "prestador" && !pathname.startsWith("/prestador") && pathname !== "/notificacoes") { router.replace("/prestador"); return; }
      if (active) setReady(true);
    }).catch(() => router.replace("/login"));
    return () => { active = false; };
  }, [pathname, router]);
  if (!ready) return <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">Verificando acesso...</div>;
  return <>{children}</>;
}

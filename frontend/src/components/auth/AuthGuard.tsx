"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const destinations: Record<string, string> = {
  admin: "/admin",
  usuario: "/usuario",
  empresa: "/empresa",
  prestador: "/prestador",
};

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          router.replace(`/login?next=${encodeURIComponent(pathname)}`);
          return;
        }

        const data = await response.json();
        const role = data.user?.role as string | undefined;
        const destination = role ? destinations[role] : undefined;

        if (!destination) {
          router.replace("/login");
          return;
        }

        // Notificações são compartilhadas; as demais áreas são restritas ao perfil.
        const isInOwnArea = pathname === destination || pathname.startsWith(destination + "/");
        if (pathname !== "/notificacoes" && !isInOwnArea) {
          router.replace(destination);
          return;
        }

        if (active) setReady(true);
      })
      .catch(() => router.replace("/login"));

    return () => {
      active = false;
    };
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Verificando acesso...
      </div>
    );
  }

  return <>{children}</>;
}

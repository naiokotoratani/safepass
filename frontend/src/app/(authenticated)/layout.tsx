import { AppShell } from "@/components/layout/AppShell";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ChatWidget } from "@/features/assistant";
export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard><AppShell>{children}</AppShell><ChatWidget /></AuthGuard>;
}

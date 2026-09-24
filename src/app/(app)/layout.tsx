import { AppShell } from "@/components/layout/app-shell";

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  // TODO(phase 2): gate this layout behind Supabase Auth (redirect to /login if unauthenticated).
  return <AppShell>{children}</AppShell>;
}

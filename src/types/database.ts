// Domain types mirroring the Supabase schema (see supabase/migrations).
// Kept hand-written for phase 1; once Supabase CLI codegen is wired up
// (phase 2), this can be replaced by `supabase gen types typescript`.

export type Role = "admin" | "member";
export type ShiftStatus = "scheduled" | "confirmed" | "open" | "completed";
export type PaymentStatus = "paid" | "pending";

export interface Organization {
  id: string;
  name: string;
  created_at: string;
}

export interface Profile {
  id: string;
  organization_id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  role: Role;
  status: "active" | "inactive";
  created_at: string;
}

export interface Shift {
  id: string;
  organization_id: string;
  employee_id: string;
  start: string; // ISO timestamp
  end: string; // ISO timestamp
  notes: string | null;
  status: ShiftStatus;
  created_at: string;
  updated_at: string;
}

export interface RevenueEntry {
  id: string;
  organization_id: string;
  date: string;
  description: string;
  client: string | null;
  category: string;
  amount: number;
  status: PaymentStatus;
  created_by: string;
  created_at: string;
}

export interface ExpenseEntry {
  id: string;
  organization_id: string;
  date: string;
  description: string;
  supplier: string | null;
  category: string;
  amount: number;
  created_by: string;
  created_at: string;
}

export interface FinancialGoal {
  id: string;
  organization_id: string;
  month: string; // e.g. "2026-09-01" (first day of month)
  target_amount: number;
  created_at: string;
}

export interface Post {
  id: string;
  organization_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export type ReactionType = "like" | "celebrate" | "support";

export interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  type: ReactionType;
  created_at: string;
}

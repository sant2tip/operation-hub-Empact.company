# Company OS

Lightweight operating system for small businesses — daily activity, schedules, finances, team, and an internal feed in one place. Working name, meant to be replaced.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript (strict) · Tailwind CSS v4 · Radix UI primitives (shadcn-style, hand-authored — see note below) · Supabase (Postgres + Auth + RLS) · Recharts · Lucide Icons

> **Note on shadcn/ui:** the `shadcn` CLI registry (`ui.shadcn.com`) wasn't reachable from the build sandbox, so the UI primitives in `src/components/ui/` were hand-written following the same patterns (Radix primitive + `class-variance-authority` + `cn()`). They're drop-in compatible if you later run `npx shadcn add <component>` from your own machine.

## Status — Phase 1 of 8

Done: project architecture, application shell (sidebar, topbar, responsive mobile nav), design tokens (light/dark), the 7 MVP routes as empty-state placeholders, domain types, financial calculation helpers, Supabase client/server/middleware setup, and the full database schema + RLS migrations.

Not yet wired: authentication, live data fetching, and the actual CRUD/interactions for each section — that's phases 2 onward, per the roadmap below.

| Phase | Scope |
|---|---|
| 1 ✅ | Architecture + application shell |
| 2 | Data model + Supabase Auth |
| 3 | Revenue + Expenses (CRUD) |
| 4 | Financial Dashboard (charts, forecast) |
| 5 | Schedule (weekly calendar) |
| 6 | Home (Daily Operating View) |
| 7 | Feed + Team |
| 8 | Polish, responsive refinement |

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

## Database

Migrations live in `supabase/migrations/`. Apply them with the Supabase CLI:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

`supabase/seed.sql` has demo data (5ish clients, ~10 revenue/expense entries, a €10,000 monthly target, a handful of feed posts) — read the comments at the top before running it; it needs at least one real auth user to attach as admin.

## Project structure

```
src/
  app/
    (app)/            route group behind the shell — Home, Schedule, Dashboard, Revenue, Expenses, Team, Settings
  components/
    ui/                low-level primitives (Button, Card, Badge, Sheet, ...)
    layout/            AppShell, Sidebar, Topbar, mobile nav
    shared/             PageHeader, EmptyState, LoadingState, ErrorState, MetricCard
  lib/
    supabase/          browser/server clients + session middleware
    calculations/      financial.ts — profit, margin, target progress, run-rate forecast (never stored, always derived)
  types/
    database.ts        domain types mirroring the schema
supabase/
  migrations/          schema + RLS
  seed.sql             demo data
```

## Design principles

Clarity over decoration · hierarchy over density · information over widgets · action over reporting. No heavy gradients, no glassmorphism, no generic admin-template look. Conceptually close to Linear/Stripe/Notion — not a copy.

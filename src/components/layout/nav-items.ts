import {
  LayoutDashboard,
  CalendarDays,
  LineChart,
  TrendingUp,
  Receipt,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Primary sections, in the order defined for the application shell.
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Schedule", href: "/schedule", icon: CalendarDays },
  { label: "Dashboard", href: "/dashboard", icon: LineChart },
  { label: "Revenue", href: "/revenue", icon: TrendingUp },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Team", href: "/team", icon: Users },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
];

// Mobile bottom nav prioritizes what the spec calls out: Today, Schedule, Pulse, Feed.
export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Schedule", href: "/schedule", icon: CalendarDays },
  { label: "Dashboard", href: "/dashboard", icon: LineChart },
  { label: "Team", href: "/team", icon: Users },
];

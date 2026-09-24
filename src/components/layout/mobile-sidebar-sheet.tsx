"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "./nav-items";
import * as React from "react";

export function MobileSidebarSheet() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex h-14 items-center gap-2 px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Company OS</span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
          {[...NAV_ITEMS, ...SECONDARY_NAV_ITEMS].map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-surface-muted text-foreground"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-accent" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

import { cn } from "@/lib/utils";

export function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-lg bg-surface-muted" />
      ))}
    </div>
  );
}

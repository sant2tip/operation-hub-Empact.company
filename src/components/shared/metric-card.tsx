import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function MetricCard({
  label,
  value,
  delta,
  deltaLabel,
  tone = "neutral",
  className,
}: {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  tone?: "neutral" | "positive" | "negative";
  className?: string;
}) {
  const positive = delta !== undefined ? delta >= 0 : undefined;
  return (
    <Card className={className}>
      <CardHeader className="pb-1">
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {delta !== undefined && (
          <p
            className={cn(
              "mt-1 flex items-center gap-1 text-xs font-medium",
              positive ? "text-success" : "text-danger",
              tone === "neutral" && "text-muted-foreground"
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta).toFixed(1)}% {deltaLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

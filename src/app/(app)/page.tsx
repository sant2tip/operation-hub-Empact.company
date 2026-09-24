import { CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Home — Daily Operating View. Combines Business + People + Activity + "Needs Attention".
// TODO(phase 6): replace static structure below with live data once phases 2–5 land.
export default function HomePage() {
  return (
    <div>
      <PageHeader
        title="Home"
        description="What's happening today across the business."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Revenue (month)" value="—" />
        <MetricCard label="Expenses (month)" value="—" />
        <MetricCard label="Profit" value="—" />
        <MetricCard label="Target progress" value="—" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today &amp; Tomorrow</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={CalendarClock}
              title="No shifts scheduled yet"
              description="Once the Schedule module is connected, today's and tomorrow's shifts will appear here."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nothing needs attention right now.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Posts and announcements will show up here once the Feed module is connected.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

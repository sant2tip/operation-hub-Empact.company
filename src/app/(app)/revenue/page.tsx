import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { MetricCard } from "@/components/shared/metric-card";
import { Button } from "@/components/ui/button";

// TODO(phase 3): CRUD table with filters (date, client, status, category).
export default function RevenuePage() {
  return (
    <div>
      <PageHeader
        title="Revenue"
        description="Track invoices and payments."
        actions={<Button size="sm">Add revenue</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Total revenue" value="—" />
        <MetricCard label="Collected" value="—" />
        <MetricCard label="Pending" value="—" />
      </div>
      <div className="mt-6">
        <EmptyState
          icon={TrendingUp}
          title="No revenue entries yet"
          description="Add your first entry to start tracking income."
          actionLabel="Add revenue"
        />
      </div>
    </div>
  );
}

import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { MetricCard } from "@/components/shared/metric-card";
import { Button } from "@/components/ui/button";

// TODO(phase 3): CRUD table with configurable categories.
export default function ExpensesPage() {
  return (
    <div>
      <PageHeader
        title="Expenses"
        description="Track spending by category."
        actions={<Button size="sm">Add expense</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Total expenses" value="—" />
        <MetricCard label="Top category" value="—" />
        <MetricCard label="Change vs. last month" value="—" />
      </div>
      <div className="mt-6">
        <EmptyState
          icon={Receipt}
          title="No expenses yet"
          description="Add your first expense to start tracking spending."
          actionLabel="Add expense"
        />
      </div>
    </div>
  );
}

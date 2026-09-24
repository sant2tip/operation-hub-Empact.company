import { LineChart } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { MetricCard } from "@/components/shared/metric-card";

// TODO(phase 4): revenue evolution, revenue vs target, expense categories, run-rate forecast.
export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Financial Dashboard" description="How the business is doing this month." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Revenue" value="—" />
        <MetricCard label="Expenses" value="—" />
        <MetricCard label="Profit" value="—" />
        <MetricCard label="Margin" value="—" />
      </div>
      <div className="mt-6">
        <EmptyState
          icon={LineChart}
          title="No financial data yet"
          description="Charts for revenue evolution, revenue vs. target, and expense categories will appear once Revenue and Expenses have entries."
        />
      </div>
    </div>
  );
}

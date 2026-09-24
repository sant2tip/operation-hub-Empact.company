import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

// TODO(phase 5): weekly calendar (prev/next/today, create/edit/delete shift, statuses).
export default function SchedulePage() {
  return (
    <div>
      <PageHeader
        title="Schedule"
        description="Weekly view of who's working and when."
        actions={<Button size="sm">Create shift</Button>}
      />
      <EmptyState
        icon={CalendarDays}
        title="No shifts yet"
        description="The weekly schedule will appear here once shifts are added."
        actionLabel="Create shift"
      />
    </div>
  );
}

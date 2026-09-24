import { Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

// TODO(phase 7): team roster with weekly hours, next shift, status.
export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Team"
        description="Everyone working at the company."
        actions={<Button size="sm">Invite member</Button>}
      />
      <EmptyState
        icon={Users}
        title="No team members yet"
        description="Invite your first team member to get started."
        actionLabel="Invite member"
      />
    </div>
  );
}

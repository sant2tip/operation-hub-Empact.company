import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Organization and account preferences." />
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Settings will be connected once authentication and organizations land (phase 2).</CardDescription>
        </CardHeader>
        <CardContent />
      </Card>
    </div>
  );
}

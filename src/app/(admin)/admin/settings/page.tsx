import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminSettingsPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Name</span>
            <span className="text-sm text-muted-foreground">
              {session?.user?.name || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Email</span>
            <span className="text-sm text-muted-foreground">
              {session?.user?.email || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Role</span>
            <Badge>Admin</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Database</span>
            <Badge variant={process.env.DATABASE_URL ? "default" : "destructive"}>
              {process.env.DATABASE_URL ? "Connected" : "Not configured"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Email (Resend)</span>
            <Badge variant={process.env.RESEND_API_KEY ? "default" : "secondary"}>
              {process.env.RESEND_API_KEY ? "Configured" : "Not configured"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">GitHub API</span>
            <Badge variant={process.env.GITHUB_TOKEN ? "default" : "secondary"}>
              {process.env.GITHUB_TOKEN ? "Configured" : "Not configured"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

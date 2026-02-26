import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteMessage, markMessageRead } from "@/lib/actions/messages";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, CheckCircle, Mail } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";

export default async function AdminMessagesPage() {
  let messages: Awaited<ReturnType<typeof prisma.contactSubmission.findMany>> = [];
  try {
    messages = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    messages = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <Badge variant="secondary">
          {messages.filter((m) => !m.read).length} unread
        </Badge>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={!message.read ? "border-primary/50" : ""}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {!message.read && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                  {message.subject}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  From {message.name} ({message.email}) ·{" "}
                  {formatRelativeDate(message.createdAt)}
                </p>
              </div>
              <div className="flex gap-1">
                {message.read && <Badge variant="outline">Read</Badge>}
                {message.replied && <Badge variant="secondary">Replied</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {message.message}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/messages/${message.id}`}>
                    <Mail className="mr-2 h-3 w-3" />
                    View
                  </Link>
                </Button>
                {!message.read && (
                  <form
                    action={async () => {
                      "use server";
                      await markMessageRead(message.id);
                      revalidatePath("/admin/messages");
                    }}
                  >
                    <Button variant="outline" size="sm" type="submit">
                      <CheckCircle className="mr-2 h-3 w-3" />
                      Mark Read
                    </Button>
                  </form>
                )}
                <form
                  action={async () => {
                    "use server";
                    await deleteMessage(message.id);
                    revalidatePath("/admin/messages");
                  }}
                >
                  <Button variant="destructive" size="sm" type="submit">
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  );
}

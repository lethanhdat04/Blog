import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { markMessageRead, markMessageReplied } from "@/lib/actions/messages";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MessagePageProps {
  params: { id: string };
}

export default async function MessageDetailPage({ params }: MessagePageProps) {
  let message;
  try {
    message = await prisma.contactSubmission.findUnique({
      where: { id: params.id },
    });
  } catch {
    notFound();
  }

  if (!message) notFound();

  // Auto-mark as read
  if (!message.read) {
    await markMessageRead(message.id);
    revalidatePath("/admin/messages");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/admin/messages">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Messages
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{message.subject}</CardTitle>
            <div className="flex gap-2">
              {message.read && <Badge variant="outline">Read</Badge>}
              {message.replied && <Badge variant="secondary">Replied</Badge>}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            From <strong>{message.name}</strong> ({message.email})
            <br />
            {formatDate(message.createdAt)}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
            {message.message}
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
                Reply via Email
              </a>
            </Button>
            {!message.replied && (
              <form
                action={async () => {
                  "use server";
                  await markMessageReplied(message.id);
                  revalidatePath(`/admin/messages/${message.id}`);
                }}
              >
                <Button variant="outline" type="submit">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Replied
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

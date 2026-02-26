import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteExperience } from "@/lib/actions/experience";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

export default async function AdminExperiencePage() {
  let experiences: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];
  try {
    experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    experiences = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus className="mr-2 h-4 w-4" />
            New Experience
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{exp.position}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {exp.company} · {formatDateShort(exp.startDate)} —{" "}
                  {exp.endDate ? formatDateShort(exp.endDate) : "Present"}
                </p>
              </div>
              {exp.current && <Badge>Current</Badge>}
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground line-clamp-1">
                {exp.description}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/experience/${exp.id}/edit`}>
                    <Pencil className="mr-2 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
                <form
                  action={async () => {
                    "use server";
                    await deleteExperience(exp.id);
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
        {experiences.length === 0 && (
          <p className="text-center text-muted-foreground">
            No experience entries yet.
          </p>
        )}
      </div>
    </div>
  );
}

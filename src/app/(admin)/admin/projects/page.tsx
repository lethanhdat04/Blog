import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function AdminProjectsPage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    projects = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  /{project.slug}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    project.status === "published" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
                {project.featured && <Badge variant="outline">Featured</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground line-clamp-1">
                {project.description}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <Pencil className="mr-2 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
                <form
                  action={async () => {
                    "use server";
                    await deleteProject(project.id);
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
        {projects.length === 0 && (
          <p className="text-center text-muted-foreground">
            No projects yet. Create your first one!
          </p>
        )}
      </div>
    </div>
  );
}

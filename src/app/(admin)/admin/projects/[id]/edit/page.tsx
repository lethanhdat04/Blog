import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditProjectPageProps {
  params: { id: string };
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  let project;
  try {
    project = await prisma.project.findUnique({ where: { id: params.id } });
  } catch {
    notFound();
  }

  if (!project) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateProject(params.id, formData);
    redirect("/admin/projects");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit Project</h2>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={project.title}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={project.slug}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={project.description}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (HTML)</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={project.content || ""}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                defaultValue={project.image || ""}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  defaultValue={project.liveUrl || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  defaultValue={project.githubUrl || ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
              <Input
                id="techStack"
                name="techStack"
                defaultValue={project.techStack.join(", ")}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={project.featured}
                />
                <span className="text-sm">Featured</span>
              </label>
              <select
                name="status"
                className="rounded-md border px-3 py-1 text-sm"
                defaultValue={project.status}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <Button type="submit">Update Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { redirect } from "next/navigation";
import { createProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProjectPage() {
  async function handleCreate(formData: FormData) {
    "use server";
    await createProject(formData);
    redirect("/admin/projects");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">New Project</h2>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (HTML)</Label>
              <Textarea id="content" name="content" rows={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input id="liveUrl" name="liveUrl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" name="githubUrl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
              <Input id="techStack" name="techStack" />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="featured" />
                <span className="text-sm">Featured</span>
              </label>
              <select
                name="status"
                className="rounded-md border px-3 py-1 text-sm"
                defaultValue="published"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <Button type="submit">Create Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

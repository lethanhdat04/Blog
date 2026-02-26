import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/lib/actions/experience";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditExperiencePageProps {
  params: { id: string };
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  let experience;
  try {
    experience = await prisma.experience.findUnique({
      where: { id: params.id },
    });
  } catch {
    notFound();
  }

  if (!experience) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateExperience(params.id, formData);
    redirect("/admin/experience");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit Experience</h2>
      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={experience.company}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  defaultValue={experience.position}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={experience.location || ""}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={
                    experience.startDate.toISOString().split("T")[0]
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={
                    experience.endDate
                      ? experience.endDate.toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="current"
                defaultChecked={experience.current}
              />
              <span className="text-sm">Currently working here</span>
            </label>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={experience.description || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlights">Highlights (one per line)</Label>
              <Textarea
                id="highlights"
                name="highlights"
                defaultValue={experience.highlights.join("\n")}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
              <Input
                id="techStack"
                name="techStack"
                defaultValue={experience.techStack.join(", ")}
              />
            </div>
            <Button type="submit">Update Experience</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

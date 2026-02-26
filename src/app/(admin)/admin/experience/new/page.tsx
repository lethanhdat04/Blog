import { redirect } from "next/navigation";
import { createExperience } from "@/lib/actions/experience";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewExperiencePage() {
  async function handleCreate(formData: FormData) {
    "use server";
    await createExperience(formData);
    redirect("/admin/experience");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">New Experience</h2>
      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" name="position" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="current" />
              <span className="text-sm">Currently working here</span>
            </label>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlights">Highlights (one per line)</Label>
              <Textarea id="highlights" name="highlights" rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
              <Input id="techStack" name="techStack" />
            </div>
            <Button type="submit">Create Experience</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

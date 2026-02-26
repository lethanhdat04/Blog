import { prisma } from "@/lib/prisma";
import { createSkill, deleteSkill } from "@/lib/actions/skills";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default async function AdminSkillsPage() {
  let skills: Awaited<ReturnType<typeof prisma.skill.findMany>> = [];
  try {
    skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  } catch {
    skills = [];
  }

  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  async function handleCreate(formData: FormData) {
    "use server";
    await createSkill(formData);
    revalidatePath("/admin/skills");
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Skills</h2>

      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="flex flex-wrap gap-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required className="w-40" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                required
                className="w-40"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="level">Level (0-100)</Label>
              <Input
                id="level"
                name="level"
                type="number"
                min="0"
                max="100"
                defaultValue="50"
                className="w-24"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                defaultValue="0"
                className="w-20"
              />
            </div>
            <input type="hidden" name="icon" value="" />
            <div className="flex items-end">
              <Button type="submit">Add Skill</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {Object.entries(grouped).map(([category, categorySkills]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{skill.name}</Badge>
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <form
                    action={async () => {
                      "use server";
                      await deleteSkill(skill.id);
                      revalidatePath("/admin/skills");
                    }}
                  >
                    <Button variant="ghost" size="sm" type="submit">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

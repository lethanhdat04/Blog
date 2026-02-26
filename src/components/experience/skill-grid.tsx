import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

interface SkillGridProps {
  skills: Skill[];
}

export function SkillGrid({ skills }: SkillGridProps) {
  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <StaggerChildren className="grid gap-6 sm:grid-cols-2">
      {Object.entries(grouped).map(([category, categorySkills]) => (
        <StaggerItem key={category}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{skill.name}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}

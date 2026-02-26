import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateShort } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";

interface TimelineItem {
  id: string;
  company: string;
  position: string;
  logo?: string | null;
  location?: string | null;
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
  description?: string | null;
  highlights: string[];
  techStack: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-8">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

      {items.map((item, index) => (
        <FadeIn
          key={item.id}
          delay={index * 0.1}
          direction={index % 2 === 0 ? "left" : "right"}
        >
          <div
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="absolute left-0 top-6 h-3 w-3 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2" />

            {/* Content */}
            <div className={`ml-8 w-full md:ml-0 md:w-1/2 ${
              index % 2 === 0 ? "md:pr-12" : "md:pl-12"
            }`}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.position}</CardTitle>
                    {item.current && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">{item.company}</p>
                    <p>
                      {item.location && `${item.location} · `}
                      {formatDateShort(item.startDate)} —{" "}
                      {item.endDate ? formatDateShort(item.endDate) : "Present"}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                  {item.highlights.length > 0 && (
                    <ul className="space-y-1 text-sm">
                      {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

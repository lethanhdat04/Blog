import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
}

export function ProjectCard({
  slug,
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {image && (
        <Link href={`/projects/${slug}`}>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
      )}
      <CardHeader>
        <Link href={`/projects/${slug}`}>
          <CardTitle className="text-xl hover:underline">{title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
        )}
        {liveUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live
            </a>
          </Button>
        )}
        <Button variant="ghost" size="sm" asChild className="ml-auto">
          <Link href={`/projects/${slug}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

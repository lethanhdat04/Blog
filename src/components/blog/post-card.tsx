import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  metadata?: { readingTime: number; wordCount: number };
}

export function PostCard({
  slug,
  title,
  description,
  date,
  tags,
  metadata,
}: PostCardProps) {
  return (
    <Link href={`/${slug}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardHeader>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(date)}
            </span>
            {metadata?.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {metadata.readingTime} min read
              </span>
            )}
          </div>
          <CardTitle className="text-xl leading-tight">{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

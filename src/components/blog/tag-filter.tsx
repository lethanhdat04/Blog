"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onSelectTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selectedTag === null ? "default" : "secondary"}
        className={cn("cursor-pointer")}
        onClick={() => onSelectTag(null)}
      >
        All
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTag === tag ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    async function incrementView() {
      try {
        const res = await fetch(`/api/posts/${slug}/views`, {
          method: "POST",
        });
        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch {
        // Silently fail
      }
    }
    incrementView();
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="flex items-center gap-1 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      {views.toLocaleString()} views
    </span>
  );
}

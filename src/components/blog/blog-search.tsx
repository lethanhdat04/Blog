"use client";

import { useCallback, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export function BlogSearch({ onSearch }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      startTransition(() => {
        onSearch(value);
      });
    },
    [onSearch]
  );

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search posts..."
        value={query}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}

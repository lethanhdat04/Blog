"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface TocProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (!items.length) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree items={items} activeId={activeId} />
    </div>
  );
}

function Tree({ items, activeId }: { items: TocItem[]; activeId: string }) {
  return (
    <ul className="m-0 list-none space-y-1 text-sm">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            className={cn(
              "inline-block text-muted-foreground no-underline transition-colors hover:text-foreground",
              activeId === item.url.slice(1) && "font-medium text-foreground"
            )}
          >
            {item.title}
          </a>
          {item.items?.length ? (
            <ul className="ml-4 mt-1 list-none space-y-1">
              {item.items.map((subItem) => (
                <li key={subItem.url}>
                  <a
                    href={subItem.url}
                    className={cn(
                      "inline-block text-muted-foreground no-underline transition-colors hover:text-foreground",
                      activeId === subItem.url.slice(1) &&
                        "font-medium text-foreground"
                    )}
                  >
                    {subItem.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

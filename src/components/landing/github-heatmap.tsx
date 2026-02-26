"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Skeleton } from "@/components/ui/skeleton";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const levelColors = {
  0: "bg-muted",
  1: "bg-emerald-200 dark:bg-emerald-900",
  2: "bg-emerald-400 dark:bg-emerald-700",
  3: "bg-emerald-600 dark:bg-emerald-500",
  4: "bg-emerald-800 dark:bg-emerald-300",
};

export function GitHubHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch("/api/github/contributions");
        if (res.ok) {
          const data = await res.json();
          setContributions(data.contributions);
          setTotalContributions(data.total);
        }
      } catch {
        // Generate placeholder data
        const days: ContributionDay[] = [];
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const level = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
          days.push({
            date: date.toISOString().split("T")[0],
            count: level * 3,
            level,
          });
        }
        setContributions(days);
        setTotalContributions(days.reduce((sum, d) => sum + d.count, 0));
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
  }, []);

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section className="container py-12 md:py-24">
      <FadeIn>
        <SectionHeading
          title="GitHub Activity"
          description={
            totalContributions > 0
              ? `${totalContributions} contributions in the last year`
              : "Contribution activity"
          }
        />
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`h-3 w-3 rounded-sm ${levelColors[day.level]}`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}

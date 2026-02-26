import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2 text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

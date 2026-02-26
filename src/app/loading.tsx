import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-4">
      <Skeleton className="h-12 w-48" />
      <Skeleton className="h-4 w-64" />
      <div className="mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

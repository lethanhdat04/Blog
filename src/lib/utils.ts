import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return format(new Date(date), "MMMM d, yyyy");
}

export function formatDateShort(date: string | Date) {
  return format(new Date(date), "MMM yyyy");
}

export function formatRelativeDate(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + "..." : str;
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

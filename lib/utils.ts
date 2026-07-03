import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function formatList(items: string[] = [], fallback = "Global") {
  return items.filter(Boolean).slice(0, 3).join(", ") || fallback;
}

export function isLikelyHd(channelName: string, streamUrl?: string) {
  return /\b(HD|FHD|UHD|4K|1080|720)\b/i.test(
    `${channelName} ${streamUrl ?? ""}`
  );
}

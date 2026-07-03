import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-semibold text-zinc-100 light:border-zinc-200 light:bg-zinc-100 light:text-zinc-800",
        className
      )}
      {...props}
    />
  );
}

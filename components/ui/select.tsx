import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-12 rounded-2xl border border-white/10 bg-zinc-900/90 px-4 text-sm text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary light:border-zinc-200 light:bg-white light:text-zinc-950",
      className
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = "Select";

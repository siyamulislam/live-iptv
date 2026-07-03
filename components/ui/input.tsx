import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 text-sm text-white placeholder:text-zinc-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary light:border-zinc-200 light:bg-white light:text-zinc-950",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

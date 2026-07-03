"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const items = mainNavigation.slice(0, 5);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/85 px-2 py-2 backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              aria-label={item.label}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] text-zinc-500",
                active && "bg-white/10 text-white"
              )}
              href={item.href}
              key={item.href}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

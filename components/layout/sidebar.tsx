"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isCountryNavigationItem,
  isNavigationItemActive,
  mainNavigation
} from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-white/10 px-3 py-6 lg:block">
      <nav className="space-y-1">
        {mainNavigation.map((item) => {
          const active = isNavigationItemActive(item, pathname);
          const Icon = item.icon;
          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white",
                active && "bg-white/10 text-white"
              )}
              href={item.href}
              key={item.href}
            >
              <Icon className="h-5 w-5" />
              {isCountryNavigationItem(item) && <span>{item.flag}</span>}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

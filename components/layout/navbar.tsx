"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, Tv } from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { CommandPalette } from "@/components/search/command-palette";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-2xl">
        <div className="flex h-16 items-center gap-3 px-4 md:px-8">
          <Link className="flex items-center gap-2 font-bold" href="/">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
              <Tv className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">Modern Live TV</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {mainNavigation.slice(0, 5).map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white",
                    active && "bg-white/10 text-white"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button
              className="hidden min-w-52 justify-start text-zinc-400 md:inline-flex"
              variant="secondary"
              onClick={() => setCommandOpen(true)}
            >
              <Command className="h-4 w-4" />
              Search channels
            </Button>
            <ThemeSwitch />
            <Button
              aria-label="Open command palette"
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setCommandOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}

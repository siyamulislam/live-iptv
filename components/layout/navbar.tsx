"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, Search, Tv, X } from "lucide-react";
import {
  countryNavigation,
  isCountryNavigationItem,
  isNavigationItemActive,
  primaryNavigation,
  utilityNavigation
} from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { CommandPalette } from "@/components/search/command-palette";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerItems = [...primaryNavigation, ...utilityNavigation];

  return (
    <>
      <header className="glass sticky top-0 z-40 border-x-0 border-t-0 bg-background/70">
        <div className="flex h-16 items-center gap-3 px-4 md:px-8">
          <Link className="flex items-center gap-2 font-bold" href="/">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
              <Tv className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">Modern Live TV</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 xl:flex">
            {primaryNavigation.map((item) => {
              const active = isNavigationItemActive(item, pathname);
              const Icon = item.icon;
              return (
                <Link
                  className={cn(
                    "relative flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-zinc-400 transition-colors duration-300 hover:text-white",
                    active && "text-white"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl bg-white/10 shadow-lg shadow-primary/10"
                      layoutId="desktop-nav-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <motion.span
                    className="relative flex items-center gap-2"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  >
                    <Icon className="h-4 w-4" />
                    {isCountryNavigationItem(item) && <span>{item.flag}</span>}
                    <span>{item.label}</span>
                  </motion.span>
                </Link>
              );
            })}
            <div className="group relative">
              <button
                className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-zinc-400 transition hover:bg-white/10 hover:text-white"
                type="button"
              >
                Countries
              </button>
              <div className="glass invisible absolute left-0 top-full mt-3 w-56 translate-y-2 rounded-2xl p-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {countryNavigation.map((country) => (
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    href={country.href}
                    key={country.code}
                  >
                    <span>{country.flag}</span>
                    {country.label}
                  </Link>
                ))}
              </div>
            </div>
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
              aria-label="Open navigation menu"
              size="icon"
              variant="ghost"
              className="xl:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="glass fixed right-0 top-0 z-50 flex h-dvh w-[min(22rem,calc(100vw-2rem))] flex-col rounded-l-3xl border-y-0 border-r-0 p-4 xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <Link
                  className="flex items-center gap-2 font-bold"
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
                    <Tv className="h-5 w-5" />
                  </span>
                  Modern Live TV
                </Link>
                <Button
                  aria-label="Close navigation menu"
                  size="icon"
                  variant="ghost"
                  onClick={() => setDrawerOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <Button
                className="mt-6 justify-start text-zinc-400"
                variant="secondary"
                onClick={() => {
                  setDrawerOpen(false);
                  setCommandOpen(true);
                }}
              >
                <Search className="h-4 w-4" />
                Search channels
              </Button>
              <nav className="mt-6 space-y-2">
                {drawerItems.map((item, index) => {
                  const active = isNavigationItemActive(item, pathname);
                  const Icon = item.icon;
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035 }}
                      key={item.href}
                    >
                      <Link
                        className={cn(
                          "relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:bg-white/10 hover:text-white",
                          active && "bg-white/10 text-white shadow-lg shadow-primary/10"
                        )}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        {isCountryNavigationItem(item) && <span>{item.flag}</span>}
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}

"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <Button aria-label="Theme" size="icon" variant="ghost" />;
  }

  const nextTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <Button
      aria-label="Switch theme"
      title={`Theme: ${theme}`}
      size="icon"
      variant="ghost"
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
}

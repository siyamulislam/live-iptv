"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommandPalette({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  if (!open) return null;

  function go(path: string) {
    router.push(path);
    onOpenChange(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-4 backdrop-blur" role="dialog">
      <Command className="glass mx-auto mt-20 max-w-xl overflow-hidden rounded-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <Search className="h-5 w-5 text-zinc-500" />
          <Command.Input
            autoFocus
            className="h-14 flex-1 bg-transparent text-sm outline-none"
            placeholder="Search or jump to a page"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const value = event.currentTarget.value.trim();
                if (value) go(`/search?q=${encodeURIComponent(value)}`);
              }
              if (event.key === "Escape") onOpenChange(false);
            }}
          />
          <Button size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="p-4 text-sm text-zinc-400">
            Press Enter to search all channels.
          </Command.Empty>
          {[
            ["/", "Home"],
            ["/live", "Live TV"],
            ["/favorites", "Favorites"],
            ["/history", "History"],
            ["/settings", "Settings"]
          ].map(([href, label]) => (
            <Command.Item
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm data-[selected=true]:bg-white/10"
              key={href}
              onSelect={() => go(href)}
            >
              <Tv className="h-4 w-4 text-accent" />
              {label}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}

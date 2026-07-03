"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/store/favorites-store";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  channelId,
  className
}: {
  channelId: string;
  className?: string;
}) {
  const isFavorite = useFavoritesStore((state) => state.has(channelId));
  const toggle = useFavoritesStore((state) => state.toggle);
  const push = useToast((state) => state.push);

  return (
    <Button
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={cn("rounded-full", className)}
      size="icon"
      variant={isFavorite ? "default" : "secondary"}
      onClick={(event) => {
        event.preventDefault();
        toggle(channelId);
        push(isFavorite ? "Removed from favorites" : "Added to favorites");
      }}
    >
      <Heart className={cn("h-5 w-5", isFavorite && "fill-white")} />
    </Button>
  );
}

"use client";

import { ChannelGrid } from "@/components/channel/channel-grid";
import { EmptyState } from "@/components/feedback/empty-state";
import { EnrichedChannel } from "@/types/iptv";
import { useFavoritesStore } from "@/store/favorites-store";
import { useHistoryStore } from "@/store/history-store";

export function FavoritesList({ channels }: { channels: EnrichedChannel[] }) {
  const ids = useFavoritesStore((state) => state.ids);
  const saved = ids
    .map((id) => channels.find((channel) => channel.id === id))
    .filter(Boolean) as EnrichedChannel[];

  if (!saved.length) {
    return (
      <EmptyState
        title="No favorites yet"
        description="Save channels you love and they will appear here across sessions."
      />
    );
  }

  return <ChannelGrid channels={saved} />;
}

export function HistoryList({ channels }: { channels: EnrichedChannel[] }) {
  const items = useHistoryStore((state) => state.items);
  const watched = items
    .map((item) => channels.find((channel) => channel.id === item.id))
    .filter(Boolean) as EnrichedChannel[];

  if (!watched.length) {
    return (
      <EmptyState
        title="No watch history"
        description="Channels you watch will appear here so you can jump back quickly."
      />
    );
  }

  return <ChannelGrid channels={watched} />;
}

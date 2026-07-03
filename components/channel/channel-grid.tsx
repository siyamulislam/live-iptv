import { ChannelCard } from "@/components/channel/channel-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { EnrichedChannel } from "@/types/iptv";

export function ChannelGrid({ channels }: { channels: EnrichedChannel[] }) {
  if (!channels.length) {
    return (
      <EmptyState
        title="No channels matched"
        description="Try changing your filters or searching a broader term."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {channels.map((channel) => (
        <ChannelCard channel={channel} key={channel.id} />
      ))}
    </div>
  );
}

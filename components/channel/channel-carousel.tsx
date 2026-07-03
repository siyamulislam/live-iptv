import { ChannelCard } from "@/components/channel/channel-card";
import { EnrichedChannel } from "@/types/iptv";

export function ChannelCarousel({
  title,
  channels
}: {
  title: string;
  channels: EnrichedChannel[];
}) {
  if (!channels.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="scrollbar-hidden flex snap-x gap-4 overflow-x-auto pb-3">
        {channels.map((channel) => (
          <div className="w-72 shrink-0 snap-start" key={channel.id}>
            <ChannelCard channel={channel} />
          </div>
        ))}
      </div>
    </section>
  );
}

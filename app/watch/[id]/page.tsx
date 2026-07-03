import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Link2 } from "lucide-react";
import { ChannelCarousel } from "@/components/channel/channel-carousel";
import { FavoriteButton } from "@/components/channel/favorite-button";
import { BackButton } from "@/components/navigation/back-button";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { HistoryRecorder } from "@/components/personal/history-recorder";
import { VideoPlayer } from "@/components/player/video-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCatalog, getRelatedChannels } from "@/services/iptv";
import { formatList } from "@/lib/utils";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { channels } = await getCatalog();
  const channel = channels.find((item) => item.id === id);

  return {
    title: channel ? `Watch ${channel.name}` : "Watch Live TV",
    description: channel
      ? `Watch ${channel.name} live online.`
      : "Watch public live TV streams."
  };
}

export default async function WatchPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { channels } = await getCatalog();
  const channel = channels.find((item) => item.id === id);

  if (!channel?.stream?.url) notFound();

  const related = getRelatedChannels(channels, channel, 14);

  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <HistoryRecorder channelId={channel.id} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Live TV", href: "/live" },
              { label: channel.name }
            ]}
          />
          <BackButton />
        </div>
        <FavoriteButton channelId={channel.id} />
      </div>
      <VideoPlayer src={channel.stream.url} title={channel.name} />
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div>
          <h1 className="text-4xl font-black">{channel.name}</h1>
          <p className="mt-3 text-zinc-400">
            {channel.countryName ?? "Global"} • {formatList(channel.languageNames)} •{" "}
            {formatList(channel.categoryNames)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{channel.countryName ?? "Global"}</Badge>
            {channel.isHd ? <Badge>HD stream</Badge> : null}
            {channel.categoryNames.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </div>
        <aside className="glass space-y-3 rounded-2xl p-5">
          <h2 className="font-bold">Stream details</h2>
          <p className="break-all text-sm text-zinc-400">{channel.stream.url}</p>
          <div className="flex flex-wrap gap-2">
            {channel.website ? (
              <Button asChild size="sm" variant="secondary">
                <Link href={channel.website} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                  Website
                </Link>
              </Button>
            ) : null}
            <Button asChild size="sm" variant="secondary">
              <Link href={channel.stream.url} target="_blank">
                <Link2 className="h-4 w-4" />
                Stream URL
              </Link>
            </Button>
          </div>
        </aside>
      </section>
      <ChannelCarousel title="Related Channels" channels={related} />
      <ChannelCarousel
        title="Recommended Channels"
        channels={channels.filter((item) => item.id !== channel.id).slice(0, 12)}
      />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnrichedChannel } from "@/types/iptv";

export function Hero({ channel }: { channel?: EnrichedChannel }) {
  return (
    <section className="relative min-h-[520px] overflow-hidden rounded-2xl border border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.96),rgba(9,9,11,0.68),rgba(9,9,11,0.18))]" />
      <div className="absolute inset-y-0 right-0 w-2/3">
        {channel?.logoUrl ? (
          <Image
            alt=""
            className="object-contain p-20 opacity-45"
            fill
            priority
            src={channel.logoUrl}
          />
        ) : null}
      </div>
      <div className="relative z-10 flex min-h-[520px] max-w-2xl flex-col justify-center px-6 py-10 md:px-12">
        <Badge className="w-fit gap-2">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Featured live channel
        </Badge>
        <h1 className="mt-5 text-5xl font-black leading-none md:text-7xl">
          {channel?.name ?? "Stream live TV beautifully"}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
          Discover public live channels from around the world with instant
          search, favorites, watch history, and a cinematic HLS player.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={channel ? `/watch/${channel.id}` : "/live"}>
              <Play className="h-5 w-5 fill-white" />
              Watch now
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/live">Browse channels</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

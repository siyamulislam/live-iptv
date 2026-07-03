"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/channel/favorite-button";
import { EnrichedChannel } from "@/types/iptv";
import { formatList } from "@/lib/utils";

export function ChannelCard({ channel }: { channel: EnrichedChannel }) {
  return (
    <motion.article whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link
        className="group glass block overflow-hidden rounded-2xl"
        href={`/watch/${encodeURIComponent(channel.id)}`}
      >
        <div className="relative aspect-video bg-zinc-900">
          {channel.logoUrl ? (
            <Image
              alt={`${channel.name} logo`}
              className="object-contain p-8 transition duration-300 group-hover:scale-105"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 25vw"
              src={channel.logoUrl}
            />
          ) : (
            <div className="grid h-full place-items-center text-3xl font-black text-zinc-600">
              {channel.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/35">
            <span className="grid h-14 w-14 scale-75 place-items-center rounded-full bg-white text-zinc-950 opacity-0 shadow-2xl transition group-hover:scale-100 group-hover:opacity-100">
              <Play className="h-6 w-6 fill-zinc-950" />
            </span>
          </div>
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge className="bg-danger text-white">LIVE</Badge>
            {channel.isHd ? <Badge>HD</Badge> : null}
          </div>
          <FavoriteButton
            channelId={channel.id}
            className="absolute right-3 top-3"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-1 font-semibold">{channel.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-zinc-400">
            {channel.countryName ?? "Global"} • {formatList(channel.categoryNames)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

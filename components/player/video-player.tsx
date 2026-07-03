"use client";

import Hls from "hls.js";
import {
  Maximize,
  PictureInPicture2,
  RefreshCcw,
  Share2,
  Volume2,
  VolumeX
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useSettingsStore } from "@/store/settings-store";
import { useToast } from "@/components/ui/toast";

export function VideoPlayer({
  src,
  title
}: {
  src: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [levels, setLevels] = useState<{ label: string; index: number }[]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const autoplay = useSettingsStore((state) => state.autoplay);
  const defaultMuted = useSettingsStore((state) => state.muted);
  const push = useToast((state) => state.push);

  const attach = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    hlsRef.current?.destroy();
    setLoading(true);
    setMuted(defaultMuted);
    video.muted = defaultMuted;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(
          hls.levels.map((level, index) => ({
            index,
            label: level.height ? `${level.height}p` : `Level ${index + 1}`
          }))
        );
        setLoading(false);
        if (autoplay) void video.play().catch(() => setLoading(false));
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
          else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
          else setLoading(false);
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      void video.play().catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [autoplay, defaultMuted, src]);

  useEffect(() => {
    attach();
    return () => hlsRef.current?.destroy();
  }, [attach]);

  const shortcuts = useMemo(
    () => ({
      f: () => void videoRef.current?.requestFullscreen(),
      m: () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setMuted(video.muted);
      },
      p: () => void videoRef.current?.requestPictureInPicture()
    }),
    []
  );

  useKeyboardShortcuts(shortcuts);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      <div className="relative aspect-video">
        <video
          aria-label={title}
          className="h-full w-full bg-black"
          controls
          playsInline
          ref={videoRef}
          onCanPlay={() => setLoading(false)}
          onWaiting={() => setLoading(true)}
        />
        <div className="pointer-events-none absolute left-4 top-4 flex gap-2">
          <Badge className="bg-danger text-white">LIVE</Badge>
          {loading ? (
            <Badge className="gap-2">
              <LoadingSpinner className="h-3 w-3" />
              Connecting
            </Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 p-3">
        <Button size="sm" variant="secondary" onClick={attach}>
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = !video.muted;
            setMuted(video.muted);
          }}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          Volume
        </Button>
        <select
          aria-label="Stream quality"
          className="h-9 rounded-xl bg-white/10 px-3 text-sm"
          value={currentLevel}
          onChange={(event) => {
            const level = Number(event.currentTarget.value);
            setCurrentLevel(level);
            if (hlsRef.current) hlsRef.current.currentLevel = level;
          }}
        >
          <option value={-1}>Auto quality</option>
          {levels.map((level) => (
            <option key={level.index} value={level.index}>
              {level.label}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => void videoRef.current?.requestPictureInPicture()}
        >
          <PictureInPicture2 className="h-4 w-4" />
          PiP
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => void videoRef.current?.requestFullscreen()}
        >
          <Maximize className="h-4 w-4" />
          Fullscreen
        </Button>
        <Button
          className="ml-auto"
          size="sm"
          variant="secondary"
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            push("Share link copied");
          }}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </section>
  );
}

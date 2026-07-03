"use client";

import { useEffect } from "react";
import { useHistoryStore } from "@/store/history-store";

export function HistoryRecorder({ channelId }: { channelId: string }) {
  const add = useHistoryStore((state) => state.add);

  useEffect(() => {
    add(channelId);
  }, [add, channelId]);

  return null;
}

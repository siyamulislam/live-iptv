"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsState = {
  autoplay: boolean;
  muted: boolean;
  compactCards: boolean;
  setAutoplay: (value: boolean) => void;
  setMuted: (value: boolean) => void;
  setCompactCards: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      autoplay: true,
      muted: true,
      compactCards: false,
      setAutoplay: (autoplay) => set({ autoplay }),
      setMuted: (muted) => set({ muted }),
      setCompactCards: (compactCards) => set({ compactCards })
    }),
    { name: "live-tv-settings" }
  )
);

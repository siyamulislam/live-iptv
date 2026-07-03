"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HistoryItem = {
  id: string;
  watchedAt: number;
  progress?: number;
};

type HistoryState = {
  items: HistoryItem[];
  add: (id: string, progress?: number) => void;
  clear: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],
      add: (id, progress = 0) =>
        set((state) => ({
          items: [
            { id, watchedAt: Date.now(), progress },
            ...state.items.filter((item) => item.id !== id)
          ].slice(0, 80)
        })),
      clear: () => set({ items: [] })
    }),
    { name: "live-tv-history" }
  )
);

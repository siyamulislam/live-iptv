"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SearchState = {
  recent: string[];
  add: (query: string) => void;
  clear: () => void;
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recent: [],
      add: (query) => {
        const value = query.trim();
        if (!value) return;
        set((state) => ({
          recent: [value, ...state.recent.filter((item) => item !== value)].slice(
            0,
            10
          )
        }));
      },
      clear: () => set({ recent: [] })
    }),
    { name: "live-tv-search" }
  )
);

"use client";

import { useEffect } from "react";

type ShortcutMap = Record<string, () => void>;

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const handler = shortcuts[event.key.toLowerCase()];
      if (!handler || event.target instanceof HTMLInputElement) return;
      event.preventDefault();
      handler();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcuts]);
}

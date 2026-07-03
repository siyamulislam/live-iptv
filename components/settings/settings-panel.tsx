"use client";

import { useSettingsStore } from "@/store/settings-store";

function Toggle({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="glass flex items-center justify-between rounded-2xl p-5">
      <span className="font-semibold">{label}</span>
      <input
        checked={checked}
        className="h-5 w-5 accent-primary"
        type="checkbox"
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
    </label>
  );
}

export function SettingsPanel() {
  const {
    autoplay,
    muted,
    compactCards,
    setAutoplay,
    setMuted,
    setCompactCards
  } = useSettingsStore();

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Toggle label="Autoplay live streams" checked={autoplay} onChange={setAutoplay} />
      <Toggle label="Start streams muted" checked={muted} onChange={setMuted} />
      <Toggle
        label="Compact browsing cards"
        checked={compactCards}
        onChange={setCompactCards}
      />
    </div>
  );
}

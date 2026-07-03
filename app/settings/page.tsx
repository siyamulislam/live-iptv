import type { Metadata } from "next";
import { SettingsPanel } from "@/components/settings/settings-panel";

export const metadata: Metadata = {
  title: "Settings",
  description: "Adjust playback and browsing preferences."
};

export default function SettingsPage() {
  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <section>
        <h1 className="text-4xl font-black">Settings</h1>
        <p className="mt-3 text-zinc-400">
          Preferences are saved locally in this browser.
        </p>
      </section>
      <SettingsPanel />
    </main>
  );
}

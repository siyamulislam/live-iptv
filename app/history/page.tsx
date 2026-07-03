import type { Metadata } from "next";
import { HistoryList } from "@/components/personal/saved-channel-list";
import { getCatalog } from "@/services/iptv";

export const metadata: Metadata = {
  title: "History",
  description: "Recently watched live TV channels."
};

export default async function HistoryPage() {
  const { channels } = await getCatalog();

  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <section>
        <h1 className="text-4xl font-black">History</h1>
        <p className="mt-3 text-zinc-400">
          Recently watched channels are stored locally in your browser.
        </p>
      </section>
      <HistoryList channels={channels} />
    </main>
  );
}

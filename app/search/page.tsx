import type { Metadata } from "next";
import { SearchClient } from "@/components/search/search-client";
import { getCatalog } from "@/services/iptv";

export const metadata: Metadata = {
  title: "Search",
  description: "Instantly search live TV channels by channel, country, language or category."
};

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { channels } = await getCatalog();

  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <section>
        <h1 className="text-4xl font-black">Search</h1>
        <p className="mt-3 text-zinc-400">
          Search by channel name, country, language, category, or ID.
        </p>
      </section>
      <SearchClient channels={channels} initialQuery={String(params.q ?? "")} />
    </main>
  );
}

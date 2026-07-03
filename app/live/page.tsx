import type { Metadata } from "next";
import { ChannelFilters } from "@/components/channel/channel-filters";
import { ChannelGrid } from "@/components/channel/channel-grid";
import { filterChannels, getCatalog } from "@/services/iptv";
import { ChannelFilters as FilterType } from "@/types/iptv";

export const metadata: Metadata = {
  title: "Live TV",
  description: "Browse public live TV channels by country, language and category."
};

export default async function LivePage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { channels, countries, languages, categories } = await getCatalog();
  const filters: FilterType = {
    query: String(params.q ?? ""),
    country: String(params.country ?? ""),
    category: String(params.category ?? ""),
    language: String(params.language ?? ""),
    hdOnly: params.hd === "1",
    hasLogo: params.logo === "1",
    sort: (params.sort as FilterType["sort"]) ?? "az"
  };
  const results = filterChannels(channels, filters).slice(0, 160);

  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Live TV
        </p>
        <h1 className="mt-2 text-4xl font-black">Browse channels</h1>
        <p className="mt-3 text-zinc-400">
          {results.length} channels ready to stream from the public IPTV catalog.
        </p>
      </section>
      <ChannelFilters
        categories={categories}
        countries={countries}
        languages={languages}
      />
      <ChannelGrid channels={results} />
    </main>
  );
}

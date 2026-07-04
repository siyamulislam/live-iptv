import type { Metadata } from "next";
import { ChannelGrid } from "@/components/channel/channel-grid";
import { getCatalog } from "@/services/iptv";

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const { countries } = await getCatalog();
  const country = countries.find(
    (item) => item.code.toLowerCase() === code.toLowerCase()
  );
  const title = country?.name ?? code.toUpperCase();

  return {
    title,
    description: `Browse live TV channels from ${title}.`
  };
}

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const { channels, countries } = await getCatalog();
  const normalizedCode = code.toLowerCase();
  const country = countries.find(
    (item) => item.code.toLowerCase() === normalizedCode
  );
  const results = channels
    .filter((channel) => channel.country?.toLowerCase() === normalizedCode)
    .slice(0, 160);
  const title = country ? `${country.flag ?? ""} ${country.name}` : code.toUpperCase();

  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Country
        </p>
        <h1 className="mt-2 text-4xl font-black">{title}</h1>
        <p className="mt-3 text-zinc-400">
          {results.length} channels streaming from this country.
        </p>
      </section>
      <ChannelGrid channels={results} />
    </main>
  );
}

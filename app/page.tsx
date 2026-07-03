import { ChannelCarousel } from "@/components/channel/channel-carousel";
import { TaxonomyCard } from "@/components/discovery/taxonomy-card";
import { Hero } from "@/components/home/hero";
import { getCatalog } from "@/services/iptv";

export default async function HomePage() {
  const { channels, countries, categories } = await getCatalog();
  const featured = channels.find((channel) => channel.isHd && channel.logoUrl);
  const trending = channels.filter((channel) => channel.logoUrl).slice(0, 16);
  const live = channels.filter((channel) => channel.isHd).slice(16, 32);

  return (
    <main className="space-y-10 px-4 py-6 md:px-8">
      <Hero channel={featured} />
      <ChannelCarousel title="Trending Channels" channels={trending} />
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Popular Countries</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {countries.slice(0, 6).map((country) => (
              <TaxonomyCard
                href={`/live?country=${country.code}`}
                key={country.code}
                subtitle={`${country.languages?.length ?? 0} languages`}
                title={`${country.flag ?? ""} ${country.name}`}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.slice(0, 6).map((category) => (
              <TaxonomyCard
                href={`/live?category=${category.id}`}
                key={category.id}
                subtitle="Browse live channels"
                title={category.name}
              />
            ))}
          </div>
        </div>
      </section>
      <ChannelCarousel title="Featured Live Channels" channels={live} />
      <ChannelCarousel
        title="Continue Watching"
        channels={channels.slice(32, 44)}
      />
    </main>
  );
}

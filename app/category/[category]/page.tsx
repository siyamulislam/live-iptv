import type { Metadata } from "next";
import { ChannelGrid } from "@/components/channel/channel-grid";
import { getCatalog } from "@/services/iptv";

type Props = {
  params: Promise<{ category: string }>;
};

function formatCategoryName(category: string) {
  return category
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const title = formatCategoryName(category);

  return {
    title,
    description: `Browse ${title} live TV channels.`
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const { channels } = await getCatalog();
  const categoryName = formatCategoryName(category);
  const normalizedCategory = category.toLowerCase();
  const results = channels
    .filter((channel) => {
      const ids = (channel.categories ?? []).map((item) => item.toLowerCase());
      const names = channel.categoryNames.map((item) => item.toLowerCase());

      return [...ids, ...names].some((item) => item.includes(normalizedCategory));
    })
    .slice(0, 160);

  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Category
        </p>
        <h1 className="mt-2 text-4xl font-black">{categoryName}</h1>
        <p className="mt-3 text-zinc-400">
          {results.length} channels matched this category.
        </p>
      </section>
      <ChannelGrid channels={results} />
    </main>
  );
}

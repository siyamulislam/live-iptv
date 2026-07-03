import type { Metadata } from "next";
import { FavoritesList } from "@/components/personal/saved-channel-list";
import { getCatalog } from "@/services/iptv";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved live TV channels."
};

export default async function FavoritesPage() {
  const { channels } = await getCatalog();

  return (
    <main className="space-y-6 px-4 py-6 md:px-8">
      <section>
        <h1 className="text-4xl font-black">Favorites</h1>
        <p className="mt-3 text-zinc-400">Your saved channels live here.</p>
      </section>
      <FavoritesList channels={channels} />
    </main>
  );
}

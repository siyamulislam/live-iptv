import {
  Category,
  Channel,
  ChannelFilters,
  Country,
  EnrichedChannel,
  Language,
  Logo,
  Stream
} from "@/types/iptv";
import { isLikelyHd } from "@/lib/utils";

const API_BASE = "https://iptv-org.github.io/api";
const nextOptions = { revalidate: 60 * 60 * 6 };

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}/${path}`, { next: nextOptions });

  if (!response.ok) {
    throw new Error(`IPTV API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
}

export const getChannels = () => getJson<Channel[]>("channels.json");
export const getStreams = () => getJson<Stream[]>("streams.json");
export const getCountries = () => getJson<Country[]>("countries.json");
export const getLanguages = () => getJson<Language[]>("languages.json");
export const getCategories = () => getJson<Category[]>("categories.json");
export const getLogos = () => getJson<Logo[]>("logos.json");

export async function getCatalog() {
  const [channels, streams, countries, languages, categories, logos] =
    await Promise.all([
      getChannels(),
      getStreams(),
      getCountries(),
      getLanguages(),
      getCategories(),
      getLogos()
    ]);

  const streamMap = new Map(streams.map((stream) => [stream.channel, stream]));
  const countryMap = new Map(countries.map((country) => [country.code, country]));
  const languageMap = new Map(
    languages.map((language) => [language.code, language.name])
  );
  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name])
  );
  const logoMap = new Map(logos.map((logo) => [logo.channel, logo.url]));

  const enriched = channels
    .filter((channel) => !channel.is_nsfw && streamMap.has(channel.id))
    .map<EnrichedChannel>((channel) => {
      const stream = streamMap.get(channel.id);
      const logoUrl = channel.logo ?? logoMap.get(channel.id);

      return {
        ...channel,
        stream,
        countryName: channel.country
          ? countryMap.get(channel.country)?.name
          : undefined,
        languageNames: (channel.languages ?? []).map(
          (language) => languageMap.get(language) ?? language
        ),
        categoryNames: (channel.categories ?? []).map(
          (category) => categoryMap.get(category) ?? category
        ),
        logoUrl,
        isHd: isLikelyHd(channel.name, stream?.url)
      };
    });

  return { channels: enriched, countries, languages, categories };
}

export async function getChannelById(id: string) {
  const catalog = await getCatalog();
  return catalog.channels.find((channel) => channel.id === id);
}

export function filterChannels(
  channels: EnrichedChannel[],
  filters: ChannelFilters
) {
  const query = filters.query?.trim().toLowerCase();

  const filtered = channels.filter((channel) => {
    const searchable = [
      channel.name,
      channel.id,
      channel.countryName,
      ...(channel.languages ?? []),
      ...channel.languageNames,
      ...(channel.categories ?? []),
      ...channel.categoryNames
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (query && !searchable.includes(query)) return false;
    if (filters.country && channel.country !== filters.country) return false;
    if (
      filters.category &&
      !(channel.categories ?? []).includes(filters.category)
    ) {
      return false;
    }
    if (filters.language && !(channel.languages ?? []).includes(filters.language)) {
      return false;
    }
    if (filters.hdOnly && !channel.isHd) return false;
    if (filters.hasLogo && !channel.logoUrl) return false;
    return true;
  });

  return filtered.sort((a, b) => {
    if (filters.sort === "za") return b.name.localeCompare(a.name);
    if (filters.sort === "recent") return b.id.localeCompare(a.id);
    return a.name.localeCompare(b.name);
  });
}

export function getRelatedChannels(
  channels: EnrichedChannel[],
  current: EnrichedChannel,
  limit = 12
) {
  return channels
    .filter((channel) => channel.id !== current.id)
    .filter(
      (channel) =>
        channel.country === current.country ||
        channel.categories?.some((category) =>
          current.categories?.includes(category)
        ) ||
        channel.languages?.some((language) => current.languages?.includes(language))
    )
    .slice(0, limit);
}

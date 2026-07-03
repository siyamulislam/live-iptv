"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Category, Country, Language } from "@/types/iptv";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";

type Props = {
  countries: Country[];
  categories: Category[];
  languages: Language[];
};

export function ChannelFilters({ countries, categories, languages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addRecent = useSearchStore((state) => state.add);

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
      if (key === "q") addRecent(value);
    } else {
      params.delete(key);
    }
    router.push(`/live?${params.toString()}`);
  }

  return (
    <form
      className="glass grid gap-3 rounded-2xl p-3 md:grid-cols-[1.5fr_repeat(5,minmax(0,1fr))]"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          className="pl-11"
          defaultValue={searchParams.get("q") ?? ""}
          name="q"
          placeholder="Search channel, country, language"
          onBlur={(event) => update("q", event.currentTarget.value)}
        />
      </label>
      <Select
        aria-label="Country"
        defaultValue={searchParams.get("country") ?? ""}
        onChange={(event) => update("country", event.currentTarget.value)}
      >
        <option value="">All countries</option>
        {countries.slice(0, 240).map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Category"
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(event) => update("category", event.currentTarget.value)}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Language"
        defaultValue={searchParams.get("language") ?? ""}
        onChange={(event) => update("language", event.currentTarget.value)}
      >
        <option value="">All languages</option>
        {languages.slice(0, 160).map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Sort"
        defaultValue={searchParams.get("sort") ?? "az"}
        onChange={(event) => update("sort", event.currentTarget.value)}
      >
        <option value="az">Sort A-Z</option>
        <option value="za">Sort Z-A</option>
        <option value="recent">Recently added</option>
      </Select>
      <Button
        type="button"
        variant={searchParams.get("hd") === "1" ? "default" : "secondary"}
        onClick={() => update("hd", searchParams.get("hd") === "1" ? "" : "1")}
      >
        HD only
      </Button>
    </form>
  );
}

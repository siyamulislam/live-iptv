"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ChannelGrid } from "@/components/channel/channel-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EnrichedChannel } from "@/types/iptv";
import { filterChannels } from "@/services/iptv";
import { useSearchStore } from "@/store/search-store";

export function SearchClient({
  channels,
  initialQuery = ""
}: {
  channels: EnrichedChannel[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const { recent, add, clear } = useSearchStore();
  const results = useMemo(
    () => filterChannels(channels, { query }).slice(0, 120),
    [channels, query]
  );

  function submit(value: string) {
    setQuery(value);
    add(value);
  }

  return (
    <div className="space-y-6">
      <form
        className="glass flex gap-3 rounded-2xl p-3"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          submit(String(formData.get("q") ?? ""));
        }}
      >
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            className="pl-11"
            defaultValue={query}
            name="q"
            placeholder="Search by channel, ID, country, language, category"
          />
        </label>
        <Button type="submit">Search</Button>
      </form>
      {recent.length ? (
        <section className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-400">Recent</span>
          {recent.map((item) => (
            <Button
              key={item}
              size="sm"
              variant="secondary"
              onClick={() => setQuery(item)}
            >
              {item}
            </Button>
          ))}
          <Button size="sm" variant="ghost" onClick={clear}>
            Clear
          </Button>
        </section>
      ) : null}
      <ChannelGrid channels={results} />
    </div>
  );
}

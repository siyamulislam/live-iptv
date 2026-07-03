export type Channel = {
  id: string;
  name: string;
  alt_names?: string[];
  network?: string | null;
  owners?: string[];
  country?: string;
  subdivision?: string | null;
  city?: string | null;
  broadcast_area?: string[];
  languages?: string[];
  categories?: string[];
  is_nsfw?: boolean;
  launched?: string | null;
  closed?: string | null;
  replaced_by?: string | null;
  website?: string | null;
  logo?: string | null;
};

export type Stream = {
  channel: string;
  url: string;
  http_referrer?: string | null;
  user_agent?: string | null;
};

export type Country = {
  name: string;
  code: string;
  languages?: string[];
  flag?: string;
};

export type Language = {
  name: string;
  code: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Logo = {
  channel: string;
  url: string;
  width?: number;
  height?: number;
};

export type EnrichedChannel = Channel & {
  stream?: Stream;
  countryName?: string;
  languageNames: string[];
  categoryNames: string[];
  logoUrl?: string;
  isHd: boolean;
};

export type ChannelFilters = {
  query?: string;
  country?: string;
  category?: string;
  language?: string;
  hdOnly?: boolean;
  hasLogo?: boolean;
  sort?: "az" | "za" | "recent";
};

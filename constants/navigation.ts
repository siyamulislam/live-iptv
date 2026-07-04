import {
  Flag,
  Heart,
  History,
  Home,
  Search,
  Settings,
  Trophy,
  Tv
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  match?: "exact" | "startsWith";
  badge?: string;
};

export type CountryNavigationItem = NavigationItem & {
  code: string;
  flag: string;
};

export const countryNavigation = [
  {
    code: "bd",
    flag: "🇧🇩",
    href: "/country/bd",
    label: "Bangladesh",
    icon: Flag,
    match: "startsWith"
  },
  {
    code: "in",
    flag: "🇮🇳",
    href: "/country/in",
    label: "India",
    icon: Flag,
    match: "startsWith"
  },
  {
    code: "us",
    flag: "🇺🇸",
    href: "/country/us",
    label: "United States",
    icon: Flag,
    match: "startsWith"
  },
  {
    code: "gb",
    flag: "🇬🇧",
    href: "/country/gb",
    label: "United Kingdom",
    icon: Flag,
    match: "startsWith"
  },
  {
    code: "jp",
    flag: "🇯🇵",
    href: "/country/jp",
    label: "Japan",
    icon: Flag,
    match: "startsWith"
  }
] satisfies CountryNavigationItem[];

export const primaryNavigation = [
  { href: "/", label: "Home", icon: Home },
  { href: "/live", label: "Live TV", icon: Tv },
  {
    href: "/category/sports",
    label: "Sports",
    icon: Trophy,
    match: "startsWith"
  },
  countryNavigation[0],
  { href: "/favorites", label: "Favorites", icon: Heart }
] satisfies NavigationItem[];

export const utilityNavigation = [
  { href: "/search", label: "Search", icon: Search },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings }
] satisfies NavigationItem[];

export const mainNavigation = [...primaryNavigation, ...utilityNavigation];

export function isNavigationItemActive(item: NavigationItem, pathname: string) {
  if (item.match === "exact" || item.href === "/") {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function isCountryNavigationItem(
  item: NavigationItem
): item is CountryNavigationItem {
  return "flag" in item;
}

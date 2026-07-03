import {
  Heart,
  History,
  Home,
  Search,
  Settings,
  Tv
} from "lucide-react";

export const mainNavigation = [
  { href: "/", label: "Home", icon: Home },
  { href: "/live", label: "Live TV", icon: Tv },
  { href: "/search", label: "Search", icon: Search },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings }
];

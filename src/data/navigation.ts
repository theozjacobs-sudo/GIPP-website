import type { NavLink, NavGroup } from "@/types";

/**
 * Primary navigation links.
 * Grouped logically for desktop mega-menus and mobile drawers.
 */

/** Top-level pages that always appear in the main nav bar. */
export const PRIMARY_NAV: NavLink[] = [
  {
    label: "Home",
    href: "/",
    description: "Return to the pitch",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Match reports, musings, and questionable takes",
  },
  {
    label: "Team",
    href: "/team",
    description: "Meet the squad behind the good intentions",
  },
  {
    label: "Playoffs",
    href: "/playoffs",
    description: "Live playoff probabilities and what we need to do",
  },
  {
    label: "Philosophy",
    href: "/philosophy",
    description: "Why we play the way we play (and lose the way we lose)",
  },
];

/** Secondary / community pages — shown in a submenu or after the primary links. */
export const COMMUNITY_NAV: NavLink[] = [
  {
    label: "Enemies",
    href: "/enemies",
    description: "Know thy rival. Fear thy rival. Respect thy rival (maybe).",
  },
  {
    label: "Recruit",
    href: "/recruit",
    description: "Think you have what it takes? Prove it.",
  },
  {
    label: "Ambassadors",
    href: "/ambassadors",
    description: "Spread the GIPP gospel and earn your stripes",
  },
  {
    label: "Moodboard",
    href: "/moodboard",
    description: "Weekly vibes, inspo, and collective consciousness",
  },
];

/** Grouped navigation — useful for footers and mega-menus. */
export const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Club",
    links: [
      { label: "Home", href: "/" },
      { label: "Team", href: "/team" },
      { label: "Playoffs", href: "/playoffs" },
      { label: "Philosophy", href: "/philosophy" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Enemies", href: "/enemies" },
      { label: "Recruit", href: "/recruit" },
      { label: "Ambassadors", href: "/ambassadors" },
      { label: "Moodboard", href: "/moodboard" },
    ],
  },
  {
    heading: "Connect",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/good_intent_poor_product",
      },
      { label: "Group Stage NYC", href: "https://www.groupstagenyc.com" },
    ],
  },
];

/**
 * Every navigable page as a flat list (handy for sitemaps, search, etc.).
 */
export const ALL_NAV_LINKS: NavLink[] = [...PRIMARY_NAV, ...COMMUNITY_NAV];

/** Alias used by Navigation and MobileMenu components. */
export const NAV_LINKS = ALL_NAV_LINKS;

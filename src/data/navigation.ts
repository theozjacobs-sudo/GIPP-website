import type { NavLink, NavGroup } from "@/types";

/**
 * Primary navigation links.
 *
 * The other site sections (Team, Blog, Philosophy, Enemies, Recruit,
 * Ambassadors, Moodboard) are intentionally hidden from the nav until
 * they're ready to share. The pages still exist at their URLs but are
 * not linked anywhere.
 */
export const PRIMARY_NAV: NavLink[] = [
  {
    label: "Playoffs",
    href: "/playoffs",
    description: "Live playoff probabilities and what we need to do",
  },
];

export const COMMUNITY_NAV: NavLink[] = [];

export const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Club",
    links: [{ label: "Playoffs", href: "/playoffs" }],
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

export const ALL_NAV_LINKS: NavLink[] = [...PRIMARY_NAV, ...COMMUNITY_NAV];
export const NAV_LINKS = ALL_NAV_LINKS;

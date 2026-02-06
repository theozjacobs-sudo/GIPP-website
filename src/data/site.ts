export const SITE = {
  name: "Good Intent, Poor Product F.C.",
  shortName: "GIPP F.C.",
  abbreviation: "GIPP",
  tagline: "Extremely high quality amateur soccer team operating out of Brooklyn, NY",
  motto: "i remain transfixed by the flame of good intentions",
  location: "Brooklyn, NY",
  venue: "Brooklyn Bridge Park",
  homePitch: "Brooklyn Bridge Park",
  league: "Group Stage NYC",
  leagueUrl: "https://www.groupstagenyc.com",
  instagram: "@good_intent_poor_product",
  instagramUrl: "https://www.instagram.com/good_intent_poor_product",
  championships: 5,
  logoStars: 6,
  founded: 2015,
} as const;

export type SiteConfig = typeof SITE;

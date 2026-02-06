/** Position a player can occupy on the pitch. */
export type Position = "GK" | "DEF" | "MID" | "FWD";

/** A player on the GIPP F.C. roster. */
export interface Player {
  id: string;
  name: string;
  nickname?: string;
  number: number;
  position: Position;
  photo: string;
  bio: string;
  funFact: string;
  joinedYear: number;
  isCaptain?: boolean;
  instagram?: string;
}

/** Threat level from 1 (mildly annoying) to 5 (arch-nemesis). */
export type ThreatLevel = 1 | 2 | 3 | 4 | 5;

/** A rival team in the GIPP universe. */
export interface Enemy {
  id: string;
  teamName: string;
  threatLevel: ThreatLevel;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  description: string;
  reasonForEnmity: string;
  logo?: string;
  lastEncounter?: string;
}

/** A blog post — content is optional (omitted in list views). */
export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  authorSlug?: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  content?: string;
}

/** Content types an ambassador can submit. */
export type AmbassadorContentType =
  | "photo"
  | "video"
  | "reel"
  | "story"
  | "tiktok"
  | "other";

/** An ambassador-program submission. */
export interface AmbassadorSubmission {
  id: string;
  name: string;
  instagram: string;
  contentType: AmbassadorContentType;
  contentUrl: string;
  message?: string;
  submittedAt: string;
  approved: boolean;
}

/** A recruit application submission. */
export interface RecruitSubmission {
  id: string;
  name: string;
  email: string;
  position: Position;
  experience: string;
  highlightTapeUrl: string;
  whyGipp: string;
  submittedAt: string;
}

/** Allowed moodboard item types. */
export type MoodboardItemType = "image" | "quote" | "link" | "video";

/** A single item posted to the team moodboard. */
export interface MoodboardItem {
  id: string;
  submittedBy: string;
  type: MoodboardItemType;
  content: string;
  caption?: string;
  week: number;
  submittedAt: string;
}

/** A link in the site navigation. */
export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

/** A group of navigation links (for mega-menus or grouped navs). */
export interface NavGroup {
  heading: string;
  links: NavLink[];
}

import Link from "next/link";
import { Instagram, ExternalLink } from "lucide-react";
import { SITE } from "@/data/site";
import { NAV_LINKS } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Split nav links into two columns
  const midpoint = Math.ceil(NAV_LINKS.length / 2);
  const leftColumnLinks = NAV_LINKS.slice(0, midpoint);
  const rightColumnLinks = NAV_LINKS.slice(midpoint);

  return (
    <footer className="relative bg-gipp-orange text-white" role="contentinfo">
      {/* Geometric top edge */}
      <div className="absolute -top-px left-0 right-0 overflow-hidden">
        <svg
          className="w-full h-4 text-gipp-orange"
          viewBox="0 0 1200 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon fill="currentColor" points="0,20 1200,20 1200,0 600,12 0,0" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Motto - prominent display */}
        <div className="mb-12 text-center">
          <p className="font-script text-3xl sm:text-4xl text-white/90 leading-relaxed">
            &ldquo;{SITE.motto}&rdquo;
          </p>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Team Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-bold tracking-tight">
              {SITE.name}
            </h2>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              {SITE.tagline}
            </p>
            <p className="mt-3 text-sm text-white/70">
              Est. {SITE.founded} &middot; {SITE.location}
            </p>
          </div>

          {/* Column 2: Nav Links (left half) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Navigate
            </h3>
            <ul className="mt-3 space-y-2" role="list">
              {leftColumnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gipp-orange rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Nav Links (right half) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              More
            </h3>
            <ul className="mt-3 space-y-2" role="list">
              {rightColumnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gipp-orange rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social & League */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Connect
            </h3>
            <ul className="mt-3 space-y-3" role="list">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gipp-orange rounded-sm"
                  aria-label={`Follow us on Instagram at ${SITE.instagram}`}
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  <span>{SITE.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.leagueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gipp-orange rounded-sm"
                  aria-label={`Visit our league: ${SITE.league}`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>{SITE.league}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/20 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/60">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            {SITE.venue} &middot; {SITE.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

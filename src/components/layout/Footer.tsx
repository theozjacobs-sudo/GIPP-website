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
    <footer className="relative border-t-4 border-gipp-orange bg-gray-950 grain text-white" role="contentinfo">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Motto - prominent display */}
        <div className="mb-12 text-center">
          <p className="font-script text-4xl sm:text-5xl text-gipp-orange leading-relaxed" style={{ transform: 'rotate(-1deg)' }}>
            &ldquo;{SITE.motto}&rdquo;
          </p>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Team Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gipp-orange">
              {SITE.name}
            </h2>
            <p className="mt-2 text-sm text-white/50 leading-relaxed">
              {SITE.tagline}
            </p>
            <p className="mt-3 text-sm text-white/40">
              Est. {SITE.founded} &middot; {SITE.location}
            </p>
          </div>

          {/* Column 2: Nav Links (left half) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gipp-orange">
              Navigate
            </h3>
            <ul className="mt-3 space-y-2" role="list">
              {leftColumnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-gipp-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Nav Links (right half) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gipp-orange">
              More
            </h3>
            <ul className="mt-3 space-y-2" role="list">
              {rightColumnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-gipp-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social & League */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gipp-orange">
              Connect
            </h3>
            <ul className="mt-3 space-y-3" role="list">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gipp-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded-sm"
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
                  className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gipp-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded-sm"
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
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            {SITE.venue} &middot; {SITE.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

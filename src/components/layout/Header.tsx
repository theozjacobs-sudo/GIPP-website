import Link from "next/link";
import { SITE } from "@/data/site";
import Navigation from "@/components/layout/Navigation";
import MobileMenu from "@/components/layout/MobileMenu";

function ChampionshipStars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} championship stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          className="h-3 w-3 text-gipp-cream fill-current"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gipp-cream/50 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo area with stars + abbreviation */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2"
          aria-label={`${SITE.name} - Home`}
        >
          <div className="flex flex-col items-center gap-0.5">
            <ChampionshipStars count={SITE.logoStars} />
            <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-gipp-orange">
              {SITE.abbreviation}
            </span>
          </div>
        </Link>

        {/* Center/Right: Desktop Navigation */}
        <Navigation />

        {/* Right: Mobile Menu Toggle */}
        <MobileMenu />
      </div>
    </header>
  );
}

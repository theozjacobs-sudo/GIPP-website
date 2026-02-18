"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden md:block">
      <ul className="flex items-center gap-1" role="list">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors rounded-md",
                  "hover:text-gipp-orange",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
                  isActive
                    ? "text-gipp-orange after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gipp-orange after:rounded-full"
                    : "text-white/70"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

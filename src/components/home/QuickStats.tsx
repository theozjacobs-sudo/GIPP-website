import React from "react";
import { Trophy, MapPin, Calendar, Users } from "lucide-react";
import { SITE } from "@/data/site";

/**
 * Chunky black stats bar with grain texture, bold uppercase labels,
 * thick orange top border, and vertical separators on desktop.
 */
export default function QuickStats() {
  const stats = [
    { icon: Trophy, value: `${SITE.championships}x`, label: "Champions" },
    { icon: MapPin, value: SITE.location, label: "Home Base" },
    { icon: Calendar, value: SITE.league, label: "League" },
    { icon: Users, value: `Est. ${SITE.founded}`, label: "Founded" },
  ];

  return (
    <section
      className="grain relative border-t-[3px] border-gipp-orange bg-gray-950"
      aria-label="Quick stats"
    >
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                "relative flex flex-col items-center justify-center gap-1 text-center text-gipp-cream" +
                (index < stats.length - 1
                  ? " md:border-r md:border-white/10"
                  : "")
              }
            >
              <stat.icon
                className="mb-1 h-5 w-5 shrink-0 text-gipp-orange"
                aria-hidden="true"
              />
              <span className="text-lg font-black uppercase tracking-wide">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-gipp-cream/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

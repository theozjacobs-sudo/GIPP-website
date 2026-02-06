import React from "react";
import { Trophy, MapPin, Calendar, Users } from "lucide-react";
import { SITE } from "@/data/site";

/**
 * Dark stats bar beneath the hero. Displays four key facts about
 * GIPP F.C. in a compact, icon-driven grid layout.
 */
export default function QuickStats() {
  const stats = [
    { icon: Trophy, label: `${SITE.championships}x Champions` },
    { icon: MapPin, label: SITE.location },
    { icon: Calendar, label: SITE.league },
    { icon: Users, label: `Est. ${SITE.founded}` },
  ];

  return (
    <section className="bg-gipp-red-dark" aria-label="Quick stats">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-center gap-2 text-gipp-cream"
            >
              <stat.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

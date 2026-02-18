import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Instagram } from "lucide-react";
import Hero from "@/components/home/Hero";
import QuickStats from "@/components/home/QuickStats";
import LatestPosts from "@/components/home/LatestPosts";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.tagline,
};

/**
 * Scrolling text divider — full-width black bar with
 * infinitely scrolling marquee text.
 */
function ScrollingDivider({ text }: { text: string }) {
  // Double the text for seamless looping
  const repeated = Array.from({ length: 10 }).map(() => text).join(" \u2022 ");
  return (
    <div
      className="overflow-hidden whitespace-nowrap bg-gray-950 py-3"
      aria-hidden="true"
    >
      <div className="marquee-content text-xs font-black uppercase tracking-[0.3em] text-white/20">
        {repeated}
        {" \u2022 "}
        {repeated}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickStats />

      {/* Scrolling text divider between stats and posts */}
      <ScrollingDivider text="5X CHAMPIONS \u2022 BROOKLYN BRIDGE PARK \u2022 TUESDAY NIGHTS \u2022 GROUP STAGE NYC" />

      <LatestPosts />

      {/* Instagram CTA — dark gritty treatment */}
      <section className="grain relative bg-gray-950 px-4 py-20 text-white">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Instagram
            className="mx-auto mb-6 h-10 w-10 text-gipp-orange"
            aria-hidden="true"
          />
          <h2 className="text-4xl font-black uppercase tracking-wider text-gipp-cream sm:text-5xl md:text-6xl">
            Follow the Journey
          </h2>
          <p className="mt-5 text-base text-white/60">
            Match-day moments, training ground chaos, and post-game wisdom.
            Follow us for the unfiltered GIPP experience.
          </p>
          <Link
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-none border-3 border-white/40 bg-transparent px-8 py-4 font-black uppercase tracking-widest text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:shadow-[4px_4px_0_0_rgba(232,117,42,0.4)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
            <span className="font-script text-xl normal-case italic">
              {SITE.instagram}
            </span>
          </Link>
        </div>
      </section>

      {/* Scrolling motto divider before footer */}
      <ScrollingDivider text={SITE.motto.toUpperCase()} />
    </>
  );
}

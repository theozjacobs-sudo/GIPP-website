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

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickStats />
      <LatestPosts />

      {/* Instagram CTA */}
      <section className="bg-gipp-orange px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <Instagram className="mx-auto mb-4 h-10 w-10" aria-hidden="true" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Follow the Journey
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Match-day moments, training ground chaos, and post-game wisdom.
            Follow {SITE.instagram} for the unfiltered GIPP experience.
          </p>
          <Link
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-7 py-3.5 text-lg font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-gipp-orange"
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
            {SITE.instagram}
          </Link>
        </div>
      </section>
    </>
  );
}

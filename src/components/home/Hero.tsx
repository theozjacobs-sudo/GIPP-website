"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { SITE } from "@/data/site";

/**
 * Full-viewport hero section — matchday poster / ultras banner aesthetic.
 *
 * Brutalist typography with stacked layout, film grain overlay,
 * hand-scrawled motto, and a scrolling marquee at the bottom.
 */
export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
  }, []);

  // Faster stagger for more dramatic entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };

  return (
    <section className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Geometric pattern overlay */}
      <GeometricPattern colorScheme="orange" opacity={0.15} />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Row of 6 stars — bigger with more spacing */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3"
          variants={itemVariants}
        >
          {Array.from({ length: SITE.logoStars }).map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-gipp-cream"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </motion.div>

        {/* EST. 2015 horizontal rule divider — stamp treatment */}
        <motion.div
          className="mb-10 flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          <div className="h-px w-16 bg-gipp-cream/40 sm:w-24" aria-hidden="true" />
          <span className="border-2 border-gipp-cream/60 px-3 py-1 text-xs font-black uppercase tracking-[0.3em] text-gipp-cream/80">
            Est. {SITE.founded}
          </span>
          <div className="h-px w-16 bg-gipp-cream/40 sm:w-24" aria-hidden="true" />
        </motion.div>

        {/* Team name — MASSIVE stacked brutalist layout */}
        <motion.h1
          className="text-shadow-brutal mb-6 text-6xl font-black uppercase leading-[0.85] tracking-tighter text-gipp-cream sm:text-7xl md:text-8xl lg:text-9xl"
          variants={itemVariants}
        >
          <span className="block">Good Intent</span>
          <span className="block">Poor Product</span>
          <span className="mt-2 block text-3xl tracking-[0.2em] text-gipp-cream/70 sm:text-4xl md:text-5xl">
            F.C.
          </span>
        </motion.h1>

        {/* Tagline — matchday poster subtitle */}
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70"
          variants={itemVariants}
        >
          {SITE.tagline}
        </motion.p>

        {/* Motto — hand-scrawled Caveat with slight rotation */}
        <motion.p
          className="mb-12 font-script text-3xl italic text-white/60"
          style={{ transform: "rotate(-2deg)" }}
          variants={itemVariants}
        >
          &ldquo;{SITE.motto}&rdquo;
        </motion.p>

        {/* CTA buttons — brutalist sharp corners, thick borders */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Link
            href="/team"
            className="inline-flex items-center justify-center rounded-none border-3 border-gipp-cream bg-gipp-cream px-8 py-4 text-base font-black uppercase tracking-widest text-gray-900 transition-all duration-200 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            Meet the Squad
          </Link>
          <Link
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-none border-3 border-white/60 bg-transparent px-8 py-4 text-base font-black uppercase tracking-widest text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            Follow Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Scrolling marquee at the very bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden whitespace-nowrap py-3">
        <div
          className="inline-block animate-marquee text-sm font-bold uppercase tracking-widest text-white/10"
          aria-hidden="true"
        >
          {Array.from({ length: 12 })
            .map(() => "GOOD INTENT POOR PRODUCT \u00A0\u2022\u00A0 ")
            .join("")}
          {Array.from({ length: 12 })
            .map(() => "GOOD INTENT POOR PRODUCT \u00A0\u2022\u00A0 ")
            .join("")}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { SITE } from "@/data/site";

/**
 * Full-viewport hero section for the GIPP F.C. homepage.
 *
 * Uses framer-motion for staggered fade-in + slide-up entrance
 * animations, with a prefers-reduced-motion check that disables
 * animation entirely when the OS-level setting is active.
 */
export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
  }, []);

  // Stagger container — children animate in sequence
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Geometric pattern overlay */}
      <GeometricPattern colorScheme="orange" opacity={0.15} />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Row of 6 stars */}
        <motion.div
          className="mb-6 flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          {Array.from({ length: SITE.logoStars }).map((_, i) => (
            <svg
              key={i}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gipp-cream"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </motion.div>

        {/* SVG Crest */}
        <motion.div className="mb-8 flex justify-center" variants={itemVariants}>
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="GIPP F.C. crest"
            role="img"
          >
            {/* Circle border */}
            <circle cx="75" cy="75" r="60" stroke="#F5D6A0" strokeWidth="3" fill="transparent" />
            <circle cx="75" cy="75" r="54" stroke="#F5D6A0" strokeWidth="1" fill="transparent" opacity="0.4" />

            {/* Simplified scales icon */}
            {/* Balance beam */}
            <line x1="55" y1="62" x2="95" y2="62" stroke="#F5D6A0" strokeWidth="2" strokeLinecap="round" />
            {/* Center post */}
            <line x1="75" y1="52" x2="75" y2="62" stroke="#F5D6A0" strokeWidth="2" strokeLinecap="round" />
            {/* Triangle base */}
            <polygon points="75,48 71,52 79,52" fill="#F5D6A0" />
            {/* Left pan */}
            <path d="M55,62 L50,76 A8,3 0 0,0 66,76 L61,62" stroke="#F5D6A0" strokeWidth="1.5" fill="transparent" />
            {/* Right pan */}
            <path d="M89,62 L84,76 A8,3 0 0,0 100,76 L95,62" stroke="#F5D6A0" strokeWidth="1.5" fill="transparent" />

            {/* "GIPP" text */}
            <text
              x="75"
              y="102"
              textAnchor="middle"
              fill="#F5D6A0"
              fontSize="20"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              letterSpacing="4"
            >
              GIPP
            </text>
          </svg>
        </motion.div>

        {/* Team name */}
        <motion.h1
          className="mb-4 text-5xl font-black uppercase tracking-wider text-gipp-cream sm:text-6xl md:text-7xl"
          variants={itemVariants}
        >
          <span className="block">Good Intent,</span>
          <span className="block">Poor Product F.C.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mb-4 text-lg text-white/80"
          variants={itemVariants}
        >
          {SITE.tagline}
        </motion.p>

        {/* Motto */}
        <motion.p
          className="mb-10 font-script text-2xl italic text-white/70"
          variants={itemVariants}
        >
          &ldquo;{SITE.motto}&rdquo;
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Link
            href="/team"
            className="inline-flex items-center justify-center rounded-lg bg-gipp-cream px-7 py-3.5 text-lg font-semibold text-gray-900 transition-colors duration-200 hover:bg-gipp-cream/80"
          >
            Meet the Squad
          </Link>
          <Link
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white/50 bg-transparent px-7 py-3.5 text-lg font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            Follow Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

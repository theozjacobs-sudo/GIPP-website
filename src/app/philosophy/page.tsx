import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "The ideas, principles, and controlled chaos behind Good Intent, Poor Product F.C.",
};

export default function PhilosophyPage() {
  const filePath = path.join(process.cwd(), "src/content/philosophy.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gipp-red-dark px-4 py-20 grain">
        <GeometricPattern colorScheme="dark" opacity={0.12} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-sans text-5xl font-black uppercase tracking-tight text-gipp-cream sm:text-7xl text-shadow-brutal">
            The Philosophy
          </h1>
          <p className="mt-4 font-script text-2xl text-gipp-cream/80">
            &ldquo;{SITE.motto}&rdquo;
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="prose prose-lg max-w-3xl mx-auto prose-headings:text-gipp-orange-dark prose-a:text-gipp-orange prose-blockquote:border-l-4 prose-blockquote:border-gipp-orange prose-blockquote:bg-gray-950 prose-blockquote:text-gipp-cream prose-blockquote:not-italic prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:text-2xl prose-blockquote:font-black prose-blockquote:rounded-none">
          <MDXRemote source={content} />
        </div>

        {/* Formation diagram — dramatic dark section */}
        <div className="relative my-16 -mx-4 bg-gray-950 px-4 py-16 grain overflow-hidden">
          <h3 className="mb-8 text-center text-2xl font-black uppercase tracking-wider text-gipp-cream text-shadow-brutal">
            The 4-3-3
          </h3>
          <div className="relative z-10 mx-auto max-w-md">
            <svg
              viewBox="0 0 400 560"
              className="w-full drop-shadow-2xl"
              aria-label="4-3-3 formation diagram"
              role="img"
            >
              {/* Pitch rectangle */}
              <rect
                x="10"
                y="10"
                width="380"
                height="540"
                rx="0"
                fill="#1a1a1a"
                stroke="#E8752A"
                strokeWidth="3"
              />

              {/* Center line */}
              <line
                x1="10"
                y1="280"
                x2="390"
                y2="280"
                stroke="#E8752A"
                strokeWidth="1.5"
                opacity="0.5"
              />

              {/* Center circle */}
              <circle
                cx="200"
                cy="280"
                r="50"
                fill="none"
                stroke="#E8752A"
                strokeWidth="1.5"
                opacity="0.5"
              />

              {/* Penalty areas */}
              <rect
                x="110"
                y="10"
                width="180"
                height="80"
                fill="none"
                stroke="#E8752A"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <rect
                x="110"
                y="470"
                width="180"
                height="80"
                fill="none"
                stroke="#E8752A"
                strokeWidth="1.5"
                opacity="0.5"
              />

              {/* --- Players (4-3-3) --- */}
              {/* GK */}
              <circle cx="200" cy="510" r="14" fill="#F5D6A0" />
              <text
                x="200"
                y="515"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#8B1A1A"
              >
                GK
              </text>

              {/* Back 4 */}
              {[80, 160, 240, 320].map((x) => (
                <g key={`def-${x}`}>
                  <circle cx={x} cy="420" r="14" fill="#F5D6A0" />
                  <text
                    x={x}
                    y="425"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#8B1A1A"
                  >
                    DEF
                  </text>
                </g>
              ))}

              {/* Midfield 3 */}
              {[120, 200, 280].map((x) => (
                <g key={`mid-${x}`}>
                  <circle cx={x} cy="300" r="14" fill="#E8752A" />
                  <text
                    x={x}
                    y="305"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#fff"
                  >
                    MID
                  </text>
                </g>
              ))}

              {/* Front 3 */}
              {[100, 200, 300].map((x) => (
                <g key={`fwd-${x}`}>
                  <circle cx={x} cy="180" r="14" fill="#E8752A" />
                  <text
                    x={x}
                    y="185"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#fff"
                  >
                    FWD
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 border-2 border-gray-900 bg-gipp-cream/50 p-8 text-center shadow-brutal">
          <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900">
            Think You Fit the System?
          </h3>
          <p className="mt-2 text-gray-600">
            We are always looking for players who share the vision — even if the
            execution remains a work in progress.
          </p>
          <Link
            href="/recruit"
            className="mt-6 inline-flex items-center justify-center rounded-none border-2 border-gray-900 bg-gipp-orange px-7 py-3.5 text-lg font-black uppercase tracking-wider text-white shadow-brutal transition-all duration-200 hover:bg-gipp-orange-dark hover:-translate-y-0.5"
          >
            Apply to Join GIPP F.C.
          </Link>
        </div>
      </section>
    </>
  );
}

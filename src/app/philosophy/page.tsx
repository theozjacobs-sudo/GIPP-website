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
      <section className="relative overflow-hidden bg-gipp-red-dark px-4 py-16">
        <GeometricPattern colorScheme="dark" opacity={0.12} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <SectionHeading
            align="center"
            className="[&_h2]:text-gipp-cream [&_p]:text-gipp-cream/70 [&_div:last-child]:bg-gipp-cream"
            subtitle=""
          >
            The Philosophy
          </SectionHeading>
          <p className="mt-2 font-script text-2xl text-gipp-cream/80">
            &ldquo;{SITE.motto}&rdquo;
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="prose prose-lg max-w-3xl mx-auto prose-headings:text-gipp-orange-dark prose-a:text-gipp-orange">
          <MDXRemote source={content} />
        </div>

        {/* Formation diagram */}
        <div className="my-16">
          <h3 className="mb-6 text-center text-xl font-bold text-gray-900">
            The 4-3-3
          </h3>
          <div className="mx-auto max-w-md">
            <svg
              viewBox="0 0 400 560"
              className="w-full"
              aria-label="4-3-3 formation diagram"
              role="img"
            >
              {/* Pitch rectangle */}
              <rect
                x="10"
                y="10"
                width="380"
                height="540"
                rx="4"
                fill="#2d8a4e"
                stroke="#3da562"
                strokeWidth="2"
              />

              {/* Center line */}
              <line
                x1="10"
                y1="280"
                x2="390"
                y2="280"
                stroke="#3da562"
                strokeWidth="1.5"
              />

              {/* Center circle */}
              <circle
                cx="200"
                cy="280"
                r="50"
                fill="none"
                stroke="#3da562"
                strokeWidth="1.5"
              />

              {/* Penalty areas */}
              <rect
                x="110"
                y="10"
                width="180"
                height="80"
                fill="none"
                stroke="#3da562"
                strokeWidth="1.5"
              />
              <rect
                x="110"
                y="470"
                width="180"
                height="80"
                fill="none"
                stroke="#3da562"
                strokeWidth="1.5"
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
        <div className="mt-12 rounded-xl bg-gipp-cream/50 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Think You Fit the System?
          </h3>
          <p className="mt-2 text-gray-600">
            We are always looking for players who share the vision — even if the
            execution remains a work in progress.
          </p>
          <Link
            href="/recruit"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-gipp-orange px-7 py-3.5 text-lg font-semibold text-white transition-colors duration-200 hover:bg-gipp-orange-dark"
          >
            Apply to Join GIPP F.C.
          </Link>
        </div>
      </section>
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dispatches from the pitch — match reports, tactical musings, and behind-the-scenes stories from Good Intent, Poor Product F.C.",
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Header strip */}
      <section className="relative overflow-hidden bg-gipp-red-dark px-4 py-16">
        <GeometricPattern colorScheme="dark" opacity={0.12} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-sans text-4xl font-bold tracking-tight text-gipp-cream sm:text-5xl">
            Dispatches from the Pitch
          </h1>
          <p className="mt-3 text-lg text-gipp-cream/70">
            Match reports, tactical musings, and behind-the-scenes stories from
            the GIPP gazette.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            No dispatches yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

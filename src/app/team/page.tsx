import type { Metadata } from 'next';
import Link from 'next/link';
import { GeometricPattern } from '@/components/ui/GeometricPattern';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RosterGrid } from '@/components/team/RosterGrid';
import { getTeamRoster } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meet the Squad',
  description: 'The players who make Good Intent, Poor Product F.C. what it is. Most Tuesdays.',
};

export default function TeamPage() {
  const players = getTeamRoster();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gipp-orange py-16 sm:py-20 grain">
        <GeometricPattern colorScheme="orange" opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-sans text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Meet the Squad
            </h2>
            <p className="mt-2 font-script text-xl italic text-white/70">
              The players who make it happen. Most Tuesdays.
            </p>
            <div className="mt-4 h-1.5 w-24 bg-white mx-auto" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Roster */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <RosterGrid players={players} />
      </section>

      {/* CTA */}
      <section className="bg-gipp-cream-light py-12 text-center">
        <p className="text-lg text-gray-700 mb-4">
          Think you have what it takes?
        </p>
        <Link
          href="/recruit"
          className="inline-flex items-center gap-2 text-gipp-orange font-semibold hover:text-gipp-orange-dark transition-colors"
        >
          Join the Ranks
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}

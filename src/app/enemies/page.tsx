import type { Metadata } from 'next';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { GeometricPattern } from '@/components/ui/GeometricPattern';
import { EnemyCard } from '@/components/enemies/EnemyCard';
import { getEnemies } from '@/lib/data';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'The Enemies List',
  description: 'Those who have wronged GIPP F.C. We do not forget.',
};

export default function EnemiesPage() {
  const enemies = getEnemies();

  return (
    <>
      {/* Dramatic header */}
      <section className="relative overflow-hidden bg-gipp-red-dark py-20 sm:py-24">
        <GeometricPattern colorScheme="dark" opacity={0.2} />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Eye
            className="mx-auto mb-4 h-10 w-10 text-gipp-cream/60"
            aria-hidden="true"
          />
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-widest text-gipp-cream">
            The Enemies List
          </h1>
          <p className="mt-4 text-lg text-gipp-cream/70">
            Those who have wronged us. We do not forget.
          </p>
        </div>
      </section>

      {/* Enemy cards */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        {enemies.map((enemy) => (
          <EnemyCard key={enemy.id} enemy={enemy} />
        ))}

        {enemies.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            The list is clean. For now.
          </p>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-gipp-cream-light py-12 text-center">
        <p className="text-gray-600 mb-2">
          Think you belong on this list?
        </p>
        <a
          href={SITE.leagueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gipp-orange font-semibold hover:text-gipp-orange-dark transition-colors"
        >
          Challenge us through {SITE.league} &rarr;
        </a>
      </section>
    </>
  );
}

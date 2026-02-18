import type { Metadata } from 'next';
import { GeometricPattern } from '@/components/ui/GeometricPattern';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MoodboardGrid } from '@/components/moodboard/MoodboardGrid';
import { MoodboardForm } from '@/components/forms/MoodboardForm';
import { readSubmissions } from '@/lib/submissions';
import type { MoodboardItem } from '@/types';

export const metadata: Metadata = {
  title: 'Moodboard',
  description: "What's inspiring the GIPP F.C. squad this week. Vibes, inspo, and collective consciousness.",
};

export default async function MoodboardPage() {
  const items = await readSubmissions<MoodboardItem>('moodboard');
  const sorted = items.sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gipp-orange py-20 grain">
        <GeometricPattern colorScheme="orange" opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-5xl font-black uppercase tracking-tight text-white sm:text-6xl text-shadow-brutal">
            The Moodboard
          </h1>
          <p className="mt-4 text-center text-lg text-white/70">
            What&apos;s inspiring the squad this week
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <MoodboardGrid items={sorted} />
      </section>

      {/* Form — dark contrast section */}
      <section className="relative bg-gray-950 py-16 grain">
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black uppercase tracking-wider text-gipp-cream mb-6">
            Post Something
          </h2>
          <MoodboardForm />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { Award, Sticker, Globe, Heart } from 'lucide-react';
import { GeometricPattern } from '@/components/ui/GeometricPattern';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { AmbassadorForm } from '@/components/forms/AmbassadorForm';
import { getApprovedAmbassadors } from '@/lib/submissions';

export const metadata: Metadata = {
  title: 'Ambassador Program',
  description: 'Join the GIPP F.C. ambassador program. Represent the cause. Spread the good intent.',
};

const PERKS = [
  { icon: Award, label: 'Bragging Rights', desc: 'Tell everyone you represent GIPP. They may or may not be impressed.' },
  { icon: Sticker, label: 'Possible Free Sticker', desc: "We're working on merch. You'll be first in line. Probably." },
  { icon: Globe, label: 'Featured on Our Site', desc: 'Your content, showcased right here for the world to see.' },
  { icon: Heart, label: 'Eternal Gratitude', desc: 'The squad will literally never forget you. Or at least try not to.' },
];

export default async function AmbassadorsPage() {
  const approved = await getApprovedAmbassadors();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gipp-orange py-16 sm:py-20">
        <GeometricPattern colorScheme="orange" opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            className="text-white [&>p]:text-white/70"
            subtitle="Represent the cause. Spread the good intent."
          >
            The Ambassador Program
          </SectionHeading>
        </div>
      </section>

      {/* Description / Perks */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          As a GIPP Ambassador, you join an elite network of supporters dedicated to
          spreading the gospel of good intentions and questionable product. Here&apos;s what you get:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PERKS.map(({ icon: Icon, label, desc }) => (
            <Card key={label} variant="bordered" padding="md">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gipp-orange/10">
                    <Icon className="h-5 w-5 text-gipp-orange" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{label}</h3>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gipp-cream-light py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Ambassadors</h2>
          {approved.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {approved.map((amb) => (
                <Card key={amb.id} variant="elevated" padding="md">
                  <p className="font-bold text-gray-900">{amb.name}</p>
                  <p className="text-sm text-gipp-orange">{amb.instagram}</p>
                  <a
                    href={amb.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-gipp-orange-dark hover:underline"
                  >
                    View content &rarr;
                  </a>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              The ambassador program is new. Be the first to represent.
            </p>
          )}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Become an Ambassador</h2>
        <AmbassadorForm />
      </section>
    </>
  );
}

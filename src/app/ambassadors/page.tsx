import type { Metadata } from 'next';
import { Award, Sticker, Globe, Heart } from 'lucide-react';
import { GeometricPattern } from '@/components/ui/GeometricPattern';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
      <section className="relative overflow-hidden bg-gipp-orange py-20 grain">
        <GeometricPattern colorScheme="orange" opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-5xl font-black uppercase tracking-tight text-white sm:text-6xl text-shadow-brutal">
            The Ambassador Program
          </h1>
          <p className="mt-4 text-center text-lg text-white/70">
            Represent the cause. Spread the good intent.
          </p>
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
            <div key={label} className="rounded-none border-2 border-gray-900 bg-white p-5 shadow-brutal transition-transform hover:-translate-y-1">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-none border-2 border-gray-900 bg-gipp-orange/10">
                    <Icon className="h-5 w-5 text-gipp-orange" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-wider text-gray-900">{label}</h3>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery — dramatic dark section */}
      <section className="relative bg-gray-950 py-16 grain">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black uppercase tracking-wider text-gipp-cream mb-2 text-shadow-brutal">
            Our Ambassadors
          </h2>
          <div className="mb-8 h-1 w-24 bg-gipp-orange" />
          {approved.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {approved.map((amb) => (
                <div key={amb.id} className="rounded-none border-2 border-gipp-orange bg-gray-900 p-5 shadow-brutal-orange transition-transform hover:-translate-y-1">
                  <p className="font-black uppercase tracking-wider text-gipp-cream">{amb.name}</p>
                  <p className="text-sm text-gipp-orange">{amb.instagram}</p>
                  <a
                    href={amb.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-bold uppercase tracking-wider text-gipp-orange hover:text-gipp-cream transition-colors"
                  >
                    View content &rarr;
                  </a>
                </div>
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
        <h2 className="text-2xl font-black uppercase tracking-wider text-gray-900 mb-6">Become an Ambassador</h2>
        <AmbassadorForm />
      </section>
    </>
  );
}

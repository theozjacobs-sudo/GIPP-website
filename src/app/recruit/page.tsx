import type { Metadata } from 'next';
import { Heart, MapPin, Smile, Flame } from 'lucide-react';
import { GeometricPattern } from '@/components/ui/GeometricPattern';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RecruitForm } from '@/components/forms/RecruitForm';

export const metadata: Metadata = {
  title: 'Join the Ranks',
  description: 'Think you have what it takes to play for Good Intent, Poor Product F.C.? Submit your highlight tape.',
};

const QUALITIES = [
  {
    icon: Heart,
    title: 'Heart Over Skill',
    description: 'We value effort, attitude, and showing up. Skill is a bonus.',
  },
  {
    icon: MapPin,
    title: 'Brooklyn Based',
    description: 'Or at least willing to make the trek. We play at Brooklyn Bridge Park.',
  },
  {
    icon: Smile,
    title: 'Sense of Humor',
    description: "If you can't laugh at a 7-0 loss, this isn't the team for you.",
  },
  {
    icon: Flame,
    title: 'Good Intentions',
    description: 'Poor product optional, good intent required.',
  },
];

const FAQS = [
  {
    q: 'When do you play?',
    a: 'Tuesday nights, year-round. Rain or shine. Sometimes snow.',
  },
  {
    q: 'How competitive is it?',
    a: "Competitive enough to care, casual enough to have fun. We've won 5 championships, so we're doing something right.",
  },
  {
    q: 'Do I need experience?',
    a: 'Some experience helps, but attitude matters more. If you can run and kick a ball in the same direction, we can work with that.',
  },
  {
    q: 'What does it cost?',
    a: "League fees are split among the team. It's rec league soccer, not the Premier League.",
  },
];

export default function RecruitPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gipp-orange py-20 grain">
        <GeometricPattern colorScheme="orange" opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-5xl font-black uppercase tracking-tight text-white sm:text-6xl text-shadow-brutal">
            Join the Ranks
          </h1>
          <p className="mt-4 text-center text-lg text-white/70">
            Think you have what it takes?
          </p>
        </div>
      </section>

      {/* What we're looking for */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black uppercase tracking-wider text-gray-900 mb-8 text-center">
          What We&apos;re Looking For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {QUALITIES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-none border-2 border-gray-900 bg-white p-5 shadow-brutal transition-transform hover:-translate-y-1">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-none border-2 border-gray-900 bg-gipp-orange/10">
                    <Icon className="h-5 w-5 text-gipp-orange" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-wider text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black uppercase tracking-wider text-gray-900 mb-6">Apply</h2>
        <RecruitForm />
      </section>

      {/* FAQ — dark dossier section */}
      <section className="relative bg-gray-950 py-16 grain">
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black uppercase tracking-wider text-gipp-cream mb-8">
            Dossier <span className="text-gipp-orange">{"//"}</span> FAQ
          </h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-none border-l-4 border-gipp-orange border-r border-t border-b border-r-gray-700 border-t-gray-700 border-b-gray-700 bg-gray-900"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-black uppercase tracking-wider text-sm text-gipp-cream hover:bg-gray-800 transition-colors">
                  {q}
                  <span className="ml-2 text-gipp-orange transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-4 text-gray-400 leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

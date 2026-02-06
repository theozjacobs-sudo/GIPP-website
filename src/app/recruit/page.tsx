import type { Metadata } from 'next';
import { Heart, MapPin, Smile, Flame } from 'lucide-react';
import { GeometricPattern } from '@/components/ui/GeometricPattern';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
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
      <section className="relative overflow-hidden bg-gipp-orange py-16 sm:py-20">
        <GeometricPattern colorScheme="orange" opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            className="text-white [&>p]:text-white/70"
            subtitle="Think you have what it takes?"
          >
            Join the Ranks
          </SectionHeading>
        </div>
      </section>

      {/* What we're looking for */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          What We&apos;re Looking For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {QUALITIES.map(({ icon: Icon, title, description }) => (
            <Card key={title} variant="bordered" padding="md">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gipp-orange/10">
                    <Icon className="h-5 w-5 text-gipp-orange" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply</h2>
        <RecruitForm />
      </section>

      {/* FAQ */}
      <section className="bg-gipp-cream-light py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-lg border border-gray-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  {q}
                  <span className="ml-2 text-gipp-orange transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-4 text-gray-600 leading-relaxed">
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

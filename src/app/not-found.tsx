import Link from 'next/link';
import { GeometricPattern } from '@/components/ui/GeometricPattern';

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 bg-gray-950 grain overflow-hidden">
      <GeometricPattern colorScheme="dark" opacity={0.06} />
      <div className="relative z-10 text-center max-w-lg">
        <p className="text-[10rem] sm:text-[14rem] font-black leading-none text-gipp-orange text-shadow-brutal select-none">
          404
        </p>
        <h1 className="text-3xl font-black uppercase tracking-wider text-gipp-cream mb-3">
          You&apos;ve Wandered Offside
        </h1>
        <p className="text-lg text-gray-400 mb-2">
          The ref has blown the whistle. This page doesn&apos;t exist.
        </p>
        <p className="text-xl text-gray-500 mb-8 font-script italic">
          &ldquo;Even the best lose their way sometimes.&rdquo;
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-none border-2 border-gipp-orange bg-gipp-orange text-white font-black uppercase tracking-wider shadow-brutal-orange transition-all hover:bg-gipp-orange-dark hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gipp-orange focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Back to the Pitch
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center justify-center px-6 py-3 rounded-none border-2 border-gipp-orange text-gipp-orange font-black uppercase tracking-wider shadow-brutal-orange transition-all hover:bg-gipp-orange hover:text-white hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gipp-orange focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Meet the Squad
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { GeometricPattern } from '@/components/ui/GeometricPattern';

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4">
      <GeometricPattern colorScheme="orange" opacity={0.06} />
      <div className="relative z-10 text-center max-w-lg">
        <p className="text-8xl font-black text-gipp-orange mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          You&apos;ve Wandered Offside
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          The ref has blown the whistle. This page doesn&apos;t exist.
        </p>
        <p className="text-base text-gray-500 mb-8 font-script text-xl italic">
          &ldquo;Even the best lose their way sometimes.&rdquo;
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gipp-orange text-white font-semibold rounded-lg hover:bg-gipp-orange-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gipp-orange focus:ring-offset-2"
          >
            Back to the Pitch
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-gipp-orange text-gipp-orange font-semibold rounded-lg hover:bg-gipp-orange hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gipp-orange focus:ring-offset-2"
          >
            Meet the Squad
          </Link>
        </div>
      </div>
    </div>
  );
}

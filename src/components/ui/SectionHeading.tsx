import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  /** The heading text. */
  children: React.ReactNode;
  /** Optional subtitle rendered below the heading. */
  subtitle?: string;
  /** Text alignment. Defaults to `left`. */
  align?: 'left' | 'center';
  /** Additional CSS classes applied to the wrapper. */
  className?: string;
}

/**
 * Consistent section heading used across the GIPP F.C. website.
 *
 * Renders a large bold `<h2>` in Inter with an optional subtitle and a
 * decorative orange accent line.
 */
function SectionHeading({
  children,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {children}
      </h2>

      {subtitle && (
        <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
      )}

      {/* Decorative orange line */}
      <div
        className={cn(
          'mt-4 h-1 w-16 rounded-full bg-gipp-orange',
          align === 'center' && 'mx-auto',
        )}
        aria-hidden="true"
      />
    </div>
  );
}

export { SectionHeading };

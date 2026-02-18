import React from 'react';
import { cn } from '@/lib/utils';

const variantStyles = {
  default: 'bg-white shadow-sm border border-gray-200',
  elevated:
    'bg-white shadow-brutal transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg',
  bordered: 'bg-white border-2 border-gipp-orange',
} as const;

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

type CardVariant = keyof typeof variantStyles;
type CardPadding = keyof typeof paddingStyles;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
}

/**
 * Content card for the GIPP F.C. design system.
 *
 * - `default`  – subtle shadow with border
 * - `elevated` – brutal shadow, shifts on hover
 * - `bordered` – thick orange border
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-none overflow-hidden',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };

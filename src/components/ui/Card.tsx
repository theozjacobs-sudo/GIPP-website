import React from 'react';
import { cn } from '@/lib/utils';

const variantStyles = {
  default: 'bg-white shadow-sm',
  elevated:
    'bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300',
  bordered: 'bg-white border border-gipp-orange/20',
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
 * - `default`  – subtle shadow
 * - `elevated` – larger shadow, lifts on hover
 * - `bordered` – orange-tinted border
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl overflow-hidden',
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

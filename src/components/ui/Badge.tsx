import React from 'react';
import { cn } from '@/lib/utils';

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  orange: 'bg-gipp-orange text-white',
  cream: 'bg-gipp-cream text-gray-900',
  red: 'bg-gipp-red text-white',
  outline: 'bg-transparent border border-gipp-orange text-gipp-orange',
} as const;

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
} as const;

type BadgeVariant = keyof typeof variantStyles;
type BadgeSize = keyof typeof sizeStyles;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

/**
 * Pill-shaped badge for tags, positions, status indicators, etc.
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', size = 'sm', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full font-medium leading-none whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export { Badge };

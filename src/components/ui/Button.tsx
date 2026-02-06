import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const variantStyles = {
  primary:
    'bg-gipp-orange text-white hover:bg-gipp-orange-dark active:bg-gipp-orange-dark/90 focus-visible:ring-gipp-orange',
  secondary:
    'bg-gipp-cream text-gray-900 hover:bg-gipp-cream/80 active:bg-gipp-cream/70 focus-visible:ring-gipp-cream',
  outline:
    'border-2 border-gipp-orange bg-transparent text-gipp-orange hover:bg-gipp-orange/10 active:bg-gipp-orange/20 focus-visible:ring-gipp-orange',
  ghost:
    'bg-transparent text-gipp-orange hover:bg-gipp-orange-light/20 active:bg-gipp-orange-light/30 focus-visible:ring-gipp-orange',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

/** Props shared across both button and anchor renderings. */
interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

/** When rendered as an anchor via Next.js Link. */
type ButtonAsLinkProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> & {
    href: string;
    disabled?: boolean;
  };

/** When rendered as a native <button>. */
type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'className'> & {
    href?: never;
  };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const baseStyles =
  'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

/**
 * Versatile button component for the GIPP F.C. design system.
 *
 * Pass an `href` prop to render a Next.js `<Link>` instead of a `<button>`.
 */
const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  } = props;

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  /* ---- Render as Link ---- */
  if ('href' in rest && rest.href !== undefined) {
    const { href, disabled, ...linkRest } = rest as ButtonAsLinkProps;

    if (disabled) {
      return (
        <span
          className={cn(classes, 'opacity-50 pointer-events-none')}
          aria-disabled="true"
          role="link"
        >
          {children}
        </span>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  /* ---- Render as button ---- */
  const buttonRest = rest as Omit<ButtonAsButtonProps, 'variant' | 'size' | 'className' | 'children'>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonRest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };

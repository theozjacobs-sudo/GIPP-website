import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Visible label text. */
  label: string;
  /** HTML `id` shared between the label and input for accessibility. */
  id: string;
  /** Validation error message. When present the input enters its error state. */
  error?: string;
}

/**
 * Accessible form input with associated label and optional error message.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, error, className, ...rest },
  ref,
) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          'block w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gipp-orange focus:border-transparent',
          error
            ? 'border-gipp-red focus:ring-gipp-red'
            : 'border-gray-300',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          className,
        )}
        {...rest}
      />

      {error && (
        <p id={errorId} className="text-sm text-gipp-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };

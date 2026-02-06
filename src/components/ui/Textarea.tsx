import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  /** Visible label text. */
  label: string;
  /** HTML `id` shared between the label and textarea for accessibility. */
  id: string;
  /** Validation error message. When present the textarea enters its error state. */
  error?: string;
}

/**
 * Accessible multiline form input with associated label and optional error message.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, id, error, rows = 4, className, ...rest }, ref) {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'block w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400',
            'transition-colors duration-200 resize-y',
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
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };

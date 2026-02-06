import React from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  /** Visible label text. */
  label: string;
  /** HTML `id` shared between the label and select for accessibility. */
  id: string;
  /** The list of selectable options. */
  options: SelectOption[];
  /** Optional placeholder shown as the first disabled option. */
  placeholder?: string;
  /** Validation error message. When present the select enters its error state. */
  error?: string;
}

/**
 * Accessible select dropdown styled to match the GIPP F.C. input components.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, id, options, placeholder, error, className, ...rest },
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

        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={cn(
              'block w-full appearance-none rounded-lg border bg-white px-4 py-2.5 pr-10 text-gray-900',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gipp-orange focus:border-transparent',
              error
                ? 'border-gipp-red focus:ring-gipp-red'
                : 'border-gray-300',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
              className,
            )}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p id={errorId} className="text-sm text-gipp-red" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

export { Select };

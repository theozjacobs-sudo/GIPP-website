'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface ModalProps {
  /** Whether the modal is currently visible. */
  isOpen: boolean;
  /** Callback invoked when the user requests the modal be closed. */
  onClose: () => void;
  /** Heading rendered at the top of the modal panel. */
  title: string;
  /** Modal body content. */
  children: React.ReactNode;
}

/**
 * Accessible overlay modal for the GIPP F.C. design system.
 *
 * - Portals to `document.body`
 * - Backdrop click and Escape key close the modal
 * - Traps focus within the dialog while open
 * - Entrance animation (fade + slide-up)
 * - Full ARIA attributes (`role="dialog"`, `aria-modal`, `aria-labelledby`)
 */
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /* ------------------------------------------------------------------ */
  /*  Focus management                                                   */
  /* ------------------------------------------------------------------ */

  // Store the element that had focus before the modal opened so we can
  // restore it when the modal closes.
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Move focus into the dialog on the next frame so the DOM has
      // finished mounting the portal content.
      requestAnimationFrame(() => {
        panelRef.current?.focus();
      });
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  /* ------------------------------------------------------------------ */
  /*  Escape key                                                         */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* ------------------------------------------------------------------ */
  /*  Scroll lock                                                        */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /* ------------------------------------------------------------------ */
  /*  Focus trap                                                         */
  /* ------------------------------------------------------------------ */

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [],
  );

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  if (!isOpen) return null;

  const titleId = 'modal-title';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-xl bg-white shadow-2xl',
          'outline-none',
          'animate-slide-up',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2
            id={titleId}
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              'inline-flex items-center justify-center rounded-lg p-1.5 text-gray-400',
              'transition-colors hover:bg-gray-100 hover:text-gray-600',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange',
            )}
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export { Modal };

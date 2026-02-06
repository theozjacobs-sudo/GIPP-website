"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the toggle button when the menu closes
    toggleButtonRef.current?.focus();
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    // Focus the close button when the menu opens
    closeButtonRef.current?.focus();

    const menu = menuRef.current;
    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    function handleTabTrap(event: KeyboardEvent) {
      if (event.key !== "Tab") return;

      const focusableElements = menu.querySelectorAll(focusableSelectors);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTabTrap);
    return () => document.removeEventListener("keydown", handleTabTrap);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={open}
        className={cn(
          "relative z-50 inline-flex items-center justify-center rounded-md p-2",
          "text-gray-700 hover:text-gipp-orange hover:bg-gipp-orange/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2",
          "transition-colors"
        )}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Overlay + Menu Panel */}
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={close}
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-[70] w-full max-w-sm",
          "bg-white shadow-2xl",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Close Button */}
          <div className="flex items-center justify-between border-b border-gipp-cream/60 px-6 py-4">
            <span className="text-lg font-bold tracking-tight text-gray-900">
              {SITE.abbreviation}
            </span>
            <button
              ref={closeButtonRef}
              onClick={close}
              className={cn(
                "inline-flex items-center justify-center rounded-md p-2",
                "text-gray-700 hover:text-gipp-orange hover:bg-gipp-orange/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2",
                "transition-colors"
              )}
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Nav Links */}
          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1" role="list">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2",
                        isActive
                          ? "bg-gipp-orange/10 text-gipp-orange border-l-4 border-gipp-orange"
                          : "text-gray-700 hover:bg-gipp-cream-light hover:text-gipp-orange"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Motto at Bottom */}
          <div className="border-t border-gipp-cream/60 px-6 py-6">
            <p className="font-script text-xl text-gipp-orange-muted text-center italic leading-relaxed">
              &ldquo;{SITE.motto}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

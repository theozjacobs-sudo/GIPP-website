import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Color palettes keyed by scheme.
 *
 * Each palette contains three tones that build the jersey-inspired
 * checkerboard-of-circles pattern:
 * - `bg`     – background fill of the pattern cell
 * - `circle` – full circle in the centre of the cell
 * - `arc`    – quarter-arc shapes in the corners
 */
const COLOR_SCHEMES = {
  orange: {
    bg: '#E8752A',      // gipp-orange
    circle: '#C85A19',  // gipp-orange-dark
    arc: '#F29650',     // gipp-orange-light
  },
  cream: {
    bg: '#FFF7ED',      // gipp-cream-light
    circle: '#F5D6A0',  // gipp-cream
    arc: '#F29650',     // gipp-orange-light
  },
  dark: {
    bg: '#8B1A1A',      // gipp-red-dark
    circle: '#B22222',  // gipp-red
    arc: '#6B1414',     // darker tone
  },
} as const;

export type ColorScheme = keyof typeof COLOR_SCHEMES;

export interface GeometricPatternProps {
  /** Which colour family to render. */
  colorScheme?: ColorScheme;
  /** Overall opacity of the SVG overlay (0-1). */
  opacity?: number;
  /** Additional CSS classes applied to the SVG element. */
  className?: string;
}

/**
 * Signature jersey-inspired SVG background pattern for GIPP F.C.
 *
 * Renders a tiling pattern inside an absolutely-positioned SVG that fills
 * its nearest positioned parent. The pattern consists of an 80x80 unit cell
 * containing:
 *   - A background rectangle
 *   - A full circle centred in the cell
 *   - Quarter-arc shapes in each corner
 *
 * The component is purely decorative (`aria-hidden`) and does not capture
 * pointer events.
 */
function GeometricPattern({
  colorScheme = 'orange',
  opacity = 0.15,
  className,
}: GeometricPatternProps) {
  const palette = COLOR_SCHEMES[colorScheme];

  // Use a deterministic id that avoids collisions when multiple patterns
  // render on the same page.
  const patternId = `gipp-pattern-${colorScheme}`;
  const arcRadius = 24;

  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className,
      )}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Cell background */}
          <rect width="80" height="80" fill={palette.bg} />

          {/* Full circle – centred in the cell */}
          <circle cx="40" cy="40" r="28" fill={palette.circle} />

          {/* Quarter-arcs in each corner */}
          {/* Top-left */}
          <path
            d={`M0,0 L${arcRadius},0 A${arcRadius},${arcRadius} 0 0,0 0,${arcRadius} Z`}
            fill={palette.arc}
          />
          {/* Top-right */}
          <path
            d={`M80,0 L${80 - arcRadius},0 A${arcRadius},${arcRadius} 0 0,1 80,${arcRadius} Z`}
            fill={palette.arc}
          />
          {/* Bottom-left */}
          <path
            d={`M0,80 L${arcRadius},80 A${arcRadius},${arcRadius} 0 0,1 0,${80 - arcRadius} Z`}
            fill={palette.arc}
          />
          {/* Bottom-right */}
          <path
            d={`M80,80 L${80 - arcRadius},80 A${arcRadius},${arcRadius} 0 0,0 80,${80 - arcRadius} Z`}
            fill={palette.arc}
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export { GeometricPattern };

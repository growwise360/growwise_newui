/**
 * Avoid network font fetching during build/dev. CSS variables are defined in
 * globals.css and resolve to system fallbacks unless a deployed font face is
 * added later.
 */
export const inter = {
  variable: 'font-inter-variable',
} as const;

/** Homepage hero font wrapper class. */
export const plusJakarta = {
  variable: 'font-plus-jakarta-variable',
} as const;

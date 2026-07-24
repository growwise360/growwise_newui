export const SMOKEY_VARIANT_CONFIG = {
  dark: {
    colorIntensity: 0.15,
    alphaScale: 1,
    clickBoost: 10,
  },
  light: {
    colorIntensity: 0.42,
    alphaScale: 0.22,
    clickBoost: 2.5,
  },
} as const;

export type SmokeyCursorVariant = keyof typeof SMOKEY_VARIANT_CONFIG;

const SMOKEY_CURSOR_INTERACTIVE_SELECTOR = [
  'form',
  'a[href]',
  'button',
  'input',
  'textarea',
  'select',
  'option',
  'label',
  'summary',
  '[contenteditable="true"]',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[tabindex]:not([tabindex="-1"])',
  '.cursor-pointer',
].join(',');

const SMOKEY_CURSOR_READING_SELECTOR = [
  'article',
  '[role="article"]',
  '.prose',
  '[data-smokey-cursor-quiet]',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'blockquote',
  'pre',
  'code',
  'table',
  'figure',
  'figcaption',
  'picture',
  'img',
  'video',
  'iframe',
  '[class~="rounded-md"][class~="border"]',
  '[class~="rounded-lg"][class~="border"]',
  '[class~="rounded-xl"][class~="border"]',
  '[class~="rounded-2xl"][class~="border"]',
].join(',');

export function canRunSmokeyCursorEffect(): boolean {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isSmokeyCursorInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest(SMOKEY_CURSOR_INTERACTIVE_SELECTOR));
}

export function isSmokeyCursorQuietTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    Boolean(
      target.closest(
        `${SMOKEY_CURSOR_INTERACTIVE_SELECTOR},${SMOKEY_CURSOR_READING_SELECTOR}`,
      ),
    )
  );
}

export function getSmokeyVariantOptions(variant: SmokeyCursorVariant) {
  return SMOKEY_VARIANT_CONFIG[variant];
}

/** Radix `type="multiple"` defaultValue — open 2–3 FAQ panels on first paint. */
export function getDefaultOpenFaqValues(
  count: number,
  valueForIndex: (index: number) => string,
): string[] {
  if (count <= 0) return [];
  if (count === 1) return [valueForIndex(0)];
  const openCount = Math.min(3, count);
  return Array.from({ length: openCount }, (_, index) => valueForIndex(index));
}

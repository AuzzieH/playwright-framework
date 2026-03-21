/**
 * Extracts a numeric price from a string like "$29.99".
 */
export function extractPrice(text: string): number {
  const match = text.replace(/[^0-9.]/g, '');
  return parseFloat(match);
}

/**
 * Converts a product name to kebab-case for selector construction.
 * e.g. "Sauce Labs Backpack" -> "sauce-labs-backpack"
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

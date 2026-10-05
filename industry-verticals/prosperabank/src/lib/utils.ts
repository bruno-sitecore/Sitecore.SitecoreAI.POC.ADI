/**
 * Joins conditional class names (minimal helper for search UI components).
 */
export function cn(
  ...inputs: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  const parts: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      parts.push(input);
    } else if (typeof input === 'object') {
      for (const [key, val] of Object.entries(input)) {
        if (val) parts.push(key);
      }
    }
  }
  return parts.join(' ');
}

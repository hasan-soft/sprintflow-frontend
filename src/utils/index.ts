/**
 * Format a date string or Date object to a readable format.
 * Example: "Oct 9, 2026"
 */
export function formatDate(
  date: string | Date | undefined | null,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  if (!date) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  } catch {
    return "—";
  }
}

/**
 * Format a number as currency.
 * Example: formatCurrency(29) -> "$29"
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Truncate a string to a maximum length, appending "..." if needed.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Merge class names (thin helper for clarity alongside shadcn cn()).
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Convert UPPER_SNAKE_CASE status to "Title Case".
 * Example: "ON_HOLD" -> "On Hold"
 */
export function formatStatus(status: string): string {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Get initials from a full name (up to 2 characters).
 * Example: "Hasan Ahmed" -> "HA"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

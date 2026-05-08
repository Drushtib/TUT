/**
 * Utility Functions
 * Export all utilities from a single entry point
 */

export * from "./date";
export * from "./string";
export * from "./array";
export * from "./sitemap";

// Re-export for backward compatibility
export { slugify } from "./string";
export { formatDate as dateFormate, sortByDate as SortingByDate } from "./date";
export { removeDuplicates } from "./array";
export { formatDate, sortByDate } from "./date";
export { removeDuplicates as removeDuplicatesArray } from "./array";


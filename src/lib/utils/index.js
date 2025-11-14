/**
 * Utility Functions
 * Export all utilities from a single entry point
 */

export * from "./date";
export * from "./string";
export * from "./array";
export * from "./sitemap";

// Re-export for backward compatibility
export { slugify, formatDate as dateFormate, sortByDate as SortingByDate, removeDuplicates } from "./string";
export { formatDate, sortByDate } from "./date";
export { removeDuplicates as removeDuplicatesArray } from "./array";


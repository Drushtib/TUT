/**
 * String utility functions
 */

/**
 * Convert text to URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} Slugified string
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add if truncated (default: "...")
 * @returns {string} Truncated string
 */
export function truncate(str, length, suffix = "...") {
  if (!str || str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
}


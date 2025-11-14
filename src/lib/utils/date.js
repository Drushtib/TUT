/**
 * Date utility functions
 */

import { DateTime } from "luxon";
import { DATE_FORMATS } from "../../config/constants";

/**
 * Format date to display format
 * @param {Date|string|null} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date = null) {
  const targetDate = date ? new Date(date) : new Date();
  
  const day = targetDate.getDate();
  const month = targetDate.toLocaleString("en-US", { month: "long" });
  const year = targetDate.getFullYear();

  return `${day} ${month}, ${year}`;
}

/**
 * Sort posts by date
 * @param {Array} posts - Array of posts with date property
 * @returns {Array} Sorted posts array
 */
export function sortByDate(posts) {
  return posts.sort((post1, post2) => {
    const beforeDate = DateTime.fromFormat(post1.date, DATE_FORMATS.DISPLAY);
    const afterDate = DateTime.fromFormat(post2.date, DATE_FORMATS.DISPLAY);
    return afterDate - beforeDate;
  });
}

/**
 * Format date to ISO format
 * @param {Date|string} date - Date to format
 * @returns {string} ISO formatted date string
 */
export function formatDateISO(date) {
  return DateTime.fromJSDate(new Date(date)).toFormat(DATE_FORMATS.ISO);
}


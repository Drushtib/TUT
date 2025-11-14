/**
 * Array utility functions
 */

/**
 * Remove duplicate objects from array by property
 * @param {Array} originalArray - Array to deduplicate
 * @param {string} prop - Property to check for duplicates
 * @returns {Array} Array without duplicates
 */
export function removeDuplicates(originalArray, prop) {
  const newArray = [];
  const lookupObject = {};

  for (const item of originalArray) {
    lookupObject[item[prop]] = item;
  }

  for (const key in lookupObject) {
    newArray.push(lookupObject[key]);
  }

  return newArray;
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Chunk array into smaller arrays
 * @param {Array} array - Array to chunk
 * @param {number} size - Size of each chunk
 * @returns {Array} Array of chunks
 */
export function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}


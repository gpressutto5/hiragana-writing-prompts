/**
 * Set utility functions for consistent Set operations across the application
 */

/**
 * Toggles an item in a Set (adds if not present, removes if present)
 * Returns a new Set to maintain immutability
 * @param set - The original Set
 * @param item - The item to toggle
 * @returns A new Set with the item toggled
 */
export const toggleSetItem = <T>(set: Set<T>, item: T): Set<T> => {
  const newSet = new Set(set);
  if (newSet.has(item)) {
    newSet.delete(item);
  } else {
    newSet.add(item);
  }
  return newSet;
};

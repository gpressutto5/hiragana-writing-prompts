/**
 * Math utility functions for consistent calculations across the application
 */

/**
 * Calculates success rate as a percentage with division-by-zero handling
 * @param correct - Number of correct attempts
 * @param attempts - Total number of attempts
 * @returns Success rate as a percentage (0-100), or 0 if no attempts
 */
export const calculateSuccessRate = (correct: number, attempts: number): number => {
  return attempts > 0 ? (correct / attempts) * 100 : 0;
};

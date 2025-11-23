/**
 * Date utility functions for consistent date handling across the application
 */

/**
 * Converts a Date object to a YYYY-MM-DD string format
 * @param date - The date to convert
 * @returns The date string in YYYY-MM-DD format
 */
export const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0] ?? '';
};

/**
 * Color utility functions for consistent color mapping across the application
 */

/**
 * Gets the color intensity class based on practice count
 * Used for calendar heat map visualization
 * @param count - Number of practice sessions
 * @returns Tailwind CSS class name for background color
 */
export const getPracticeCountColor = (count: number): string => {
  if (count === 0) return 'bg-gray-100';
  if (count < 5) return 'bg-green-200';
  if (count < 10) return 'bg-green-400';
  if (count < 20) return 'bg-green-600';
  return 'bg-green-800';
};

/**
 * Gets the color class based on success rate percentage
 * Used for progress bars and performance indicators
 * @param successRate - Success rate as a percentage (0-100)
 * @returns Tailwind CSS class name for background color
 */
export const getSuccessRateColor = (successRate: number): string => {
  if (successRate >= 80) return 'bg-green-500';
  if (successRate >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

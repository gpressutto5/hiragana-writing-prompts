/**
 * Button styling utility functions for consistent button appearance across the application
 */

/**
 * Gets the className for a toggle button based on its active state
 * @param isActive - Whether the button is in active state
 * @returns Tailwind CSS classes for the button
 */
export const getToggleButtonClass = (isActive: boolean): string => {
  return `px-3 py-1 rounded-lg text-sm font-medium transition-all ${
    isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  }`;
};

/**
 * Base classes for large action buttons (difficulty ratings, answer buttons, etc.)
 */
export const largeActionButtonBase =
  'flex-1 max-w-xs px-8 py-4 rounded-lg font-semibold transition-colors text-xl';

/**
 * Gets the className for a difficulty/answer button
 * @param variant - Color variant ('red', 'yellow', 'green')
 * @returns Tailwind CSS classes for the button
 */
export const getDifficultyButtonClass = (variant: 'red' | 'yellow' | 'green'): string => {
  const colorClasses = {
    red: 'bg-red-500 text-white hover:bg-red-600',
    yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
  };

  return `${largeActionButtonBase} ${colorClasses[variant]}`;
};

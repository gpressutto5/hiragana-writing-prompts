import { useState } from 'react';

/**
 * Custom hook to track recently used items (characters, words, etc.)
 * Maintains a list of recent item IDs to prevent immediate repetition
 *
 * @param maxRecent - Maximum number of recent items to track (default: 3)
 * @returns Tuple of [recentItems, addRecentItem, resetRecentItems] where:
 *   - recentItems: Array of recent item IDs
 *   - addRecentItem: Function to add a new item ID to the recent list
 *   - resetRecentItems: Function to clear the recent items list
 */
export const useRecentItems = (
  maxRecent: number = 3
): [string[], (itemId: string, totalItems: number) => void, () => void] => {
  const [recentItems, setRecentItems] = useState<string[]>([]);

  const addRecentItem = (itemId: string, totalItems: number) => {
    setRecentItems(prev => {
      const updated = [itemId, ...prev];
      // Don't track more recent items than totalItems - 1 to ensure at least one item is always available
      return updated.slice(0, Math.min(maxRecent, totalItems - 1));
    });
  };

  const resetRecentItems = () => {
    setRecentItems([]);
  };

  return [recentItems, addRecentItem, resetRecentItems];
};

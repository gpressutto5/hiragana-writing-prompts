import { useEffect } from 'react';

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  /** The key to listen for (case-insensitive) */
  key: string;
  /** The handler function to call when the key is pressed */
  handler: () => void;
  /** Whether to prevent default behavior (default: true) */
  preventDefault?: boolean;
}

/**
 * Custom hook for handling keyboard shortcuts
 * Automatically ignores shortcuts when user is typing in input/textarea fields
 *
 * @param shortcuts - Array of keyboard shortcut configurations
 * @param deps - Dependency array for the effect (handlers should be memoized or stable)
 */
export const useKeyboardShortcuts = (
  shortcuts: KeyboardShortcut[],
  deps: React.DependencyList = []
): void => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // Find matching shortcut
      const shortcut = shortcuts.find(s => s.key.toLowerCase() === key);

      if (shortcut) {
        if (shortcut.preventDefault !== false) {
          e.preventDefault();
        }
        shortcut.handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

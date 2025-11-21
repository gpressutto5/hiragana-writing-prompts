import type { WordData, HiraganaCharacter } from '../types';

/**
 * Minimum number of characters required to enable word practice modes
 */
export const MIN_CHARACTERS_FOR_WORD_MODE = 10;

/**
 * Filters words to only include those where ALL characters are in the selected set
 * @param words - Array of all available words
 * @param selectedCharacters - Array of hiragana characters the user has selected
 * @returns Filtered array of words that can be practiced with the selected characters
 */
export const filterAvailableWords = (
  words: WordData[],
  selectedCharacters: HiraganaCharacter[]
): WordData[] => {
  // Create a Set of selected character IDs for O(1) lookup
  const selectedCharIds = new Set(selectedCharacters.map(char => char.id));

  // Filter words where every character ID is in the selected set
  return words.filter(word => word.characters.every(charId => selectedCharIds.has(charId)));
};

/**
 * Checks if word practice modes should be enabled based on character selection
 * @param selectedCharacterCount - Number of characters currently selected
 * @returns True if word modes should be enabled
 */
export const canEnableWordMode = (selectedCharacterCount: number): boolean => {
  return selectedCharacterCount >= MIN_CHARACTERS_FOR_WORD_MODE;
};

/**
 * Gets a count of available words for the current character selection
 * @param words - Array of all available words
 * @param selectedCharacters - Array of hiragana characters the user has selected
 * @returns Number of words available to practice
 */
export const getAvailableWordCount = (
  words: WordData[],
  selectedCharacters: HiraganaCharacter[]
): number => {
  return filterAvailableWords(words, selectedCharacters).length;
};

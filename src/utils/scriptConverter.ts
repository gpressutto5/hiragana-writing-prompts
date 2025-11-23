/**
 * Converts hiragana text to katakana
 * @param text - Hiragana text to convert
 * @returns Katakana version of the text
 */
export const hiraganaToKatakana = (text: string): string => {
  return text.replace(/[\u3041-\u3096]/g, char => {
    // Convert hiragana unicode range to katakana unicode range
    return String.fromCharCode(char.charCodeAt(0) + 0x60);
  });
};

/**
 * Maps character IDs to script-specific IDs
 * @param charIds - Array of base character IDs (e.g., ['su', 'shi'])
 * @param script - Target script ('hiragana' or 'katakana')
 * @returns Array of script-specific character IDs
 */
export const mapCharIdsToScript = (
  charIds: string[],
  script: 'hiragana' | 'katakana'
): string[] => {
  if (script === 'hiragana') {
    return charIds;
  }
  return charIds.map(id => `katakana_${id}`);
};

/**
 * Normalizes a character ID by removing script prefix
 * @param charId - Character ID to normalize
 * @returns Normalized character ID without script prefix
 */
export const normalizeCharId = (charId: string): string => {
  return charId.replace(/^katakana_/, '');
};

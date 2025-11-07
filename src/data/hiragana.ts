import type { HiraganaCharacter, HiraganaGroup, HiraganaGroupId } from '../types';

export const hiraganaData: HiraganaCharacter[] = [
  // Vowels (あ行 - a row)
  { id: 'a', hiragana: 'あ', romaji: 'a', group: 'vowels', row: 'a' },
  { id: 'i', hiragana: 'い', romaji: 'i', group: 'vowels', row: 'a' },
  { id: 'u', hiragana: 'う', romaji: 'u', group: 'vowels', row: 'a' },
  { id: 'e', hiragana: 'え', romaji: 'e', group: 'vowels', row: 'a' },
  { id: 'o', hiragana: 'お', romaji: 'o', group: 'vowels', row: 'a' },

  // K row (か行)
  { id: 'ka', hiragana: 'か', romaji: 'ka', group: 'k-row', row: 'ka' },
  { id: 'ki', hiragana: 'き', romaji: 'ki', group: 'k-row', row: 'ka' },
  { id: 'ku', hiragana: 'く', romaji: 'ku', group: 'k-row', row: 'ka' },
  { id: 'ke', hiragana: 'け', romaji: 'ke', group: 'k-row', row: 'ka' },
  { id: 'ko', hiragana: 'こ', romaji: 'ko', group: 'k-row', row: 'ka' },

  // S row (さ行)
  { id: 'sa', hiragana: 'さ', romaji: 'sa', group: 's-row', row: 'sa' },
  { id: 'shi', hiragana: 'し', romaji: 'shi', group: 's-row', row: 'sa' },
  { id: 'su', hiragana: 'す', romaji: 'su', group: 's-row', row: 'sa' },
  { id: 'se', hiragana: 'せ', romaji: 'se', group: 's-row', row: 'sa' },
  { id: 'so', hiragana: 'そ', romaji: 'so', group: 's-row', row: 'sa' },

  // T row (た行)
  { id: 'ta', hiragana: 'た', romaji: 'ta', group: 't-row', row: 'ta' },
  { id: 'chi', hiragana: 'ち', romaji: 'chi', group: 't-row', row: 'ta' },
  { id: 'tsu', hiragana: 'つ', romaji: 'tsu', group: 't-row', row: 'ta' },
  { id: 'te', hiragana: 'て', romaji: 'te', group: 't-row', row: 'ta' },
  { id: 'to', hiragana: 'と', romaji: 'to', group: 't-row', row: 'ta' },

  // N row (な行)
  { id: 'na', hiragana: 'な', romaji: 'na', group: 'n-row', row: 'na' },
  { id: 'ni', hiragana: 'に', romaji: 'ni', group: 'n-row', row: 'na' },
  { id: 'nu', hiragana: 'ぬ', romaji: 'nu', group: 'n-row', row: 'na' },
  { id: 'ne', hiragana: 'ね', romaji: 'ne', group: 'n-row', row: 'na' },
  { id: 'no', hiragana: 'の', romaji: 'no', group: 'n-row', row: 'na' },

  // H row (は行)
  { id: 'ha', hiragana: 'は', romaji: 'ha', group: 'h-row', row: 'ha' },
  { id: 'hi', hiragana: 'ひ', romaji: 'hi', group: 'h-row', row: 'ha' },
  { id: 'fu', hiragana: 'ふ', romaji: 'fu', group: 'h-row', row: 'ha' },
  { id: 'he', hiragana: 'へ', romaji: 'he', group: 'h-row', row: 'ha' },
  { id: 'ho', hiragana: 'ほ', romaji: 'ho', group: 'h-row', row: 'ha' },

  // M row (ま行)
  { id: 'ma', hiragana: 'ま', romaji: 'ma', group: 'm-row', row: 'ma' },
  { id: 'mi', hiragana: 'み', romaji: 'mi', group: 'm-row', row: 'ma' },
  { id: 'mu', hiragana: 'む', romaji: 'mu', group: 'm-row', row: 'ma' },
  { id: 'me', hiragana: 'め', romaji: 'me', group: 'm-row', row: 'ma' },
  { id: 'mo', hiragana: 'も', romaji: 'mo', group: 'm-row', row: 'ma' },

  // Y row (や行)
  { id: 'ya', hiragana: 'や', romaji: 'ya', group: 'y-row', row: 'ya' },
  { id: 'yu', hiragana: 'ゆ', romaji: 'yu', group: 'y-row', row: 'ya' },
  { id: 'yo', hiragana: 'よ', romaji: 'yo', group: 'y-row', row: 'ya' },

  // R row (ら行)
  { id: 'ra', hiragana: 'ら', romaji: 'ra', group: 'r-row', row: 'ra' },
  { id: 'ri', hiragana: 'り', romaji: 'ri', group: 'r-row', row: 'ra' },
  { id: 'ru', hiragana: 'る', romaji: 'ru', group: 'r-row', row: 'ra' },
  { id: 're', hiragana: 'れ', romaji: 're', group: 'r-row', row: 'ra' },
  { id: 'ro', hiragana: 'ろ', romaji: 'ro', group: 'r-row', row: 'ra' },

  // W row (わ行)
  { id: 'wa', hiragana: 'わ', romaji: 'wa', group: 'w-row', row: 'wa' },
  { id: 'wo', hiragana: 'を', romaji: 'wo', group: 'w-row', row: 'wa' },
  { id: 'n', hiragana: 'ん', romaji: 'n', group: 'w-row', row: 'wa' },

  // Dakuten - G row (が行)
  { id: 'ga', hiragana: 'が', romaji: 'ga', group: 'g-row', row: 'ga' },
  { id: 'gi', hiragana: 'ぎ', romaji: 'gi', group: 'g-row', row: 'ga' },
  { id: 'gu', hiragana: 'ぐ', romaji: 'gu', group: 'g-row', row: 'ga' },
  { id: 'ge', hiragana: 'げ', romaji: 'ge', group: 'g-row', row: 'ga' },
  { id: 'go', hiragana: 'ご', romaji: 'go', group: 'g-row', row: 'ga' },

  // Dakuten - Z row (ざ行)
  { id: 'za', hiragana: 'ざ', romaji: 'za', group: 'z-row', row: 'za' },
  { id: 'ji', hiragana: 'じ', romaji: 'ji', group: 'z-row', row: 'za' },
  { id: 'zu', hiragana: 'ず', romaji: 'zu', group: 'z-row', row: 'za' },
  { id: 'ze', hiragana: 'ぜ', romaji: 'ze', group: 'z-row', row: 'za' },
  { id: 'zo', hiragana: 'ぞ', romaji: 'zo', group: 'z-row', row: 'za' },

  // Dakuten - D row (だ行)
  { id: 'da', hiragana: 'だ', romaji: 'da', group: 'd-row', row: 'da' },
  { id: 'dji', hiragana: 'ぢ', romaji: 'dji', group: 'd-row', row: 'da' },
  { id: 'dzu', hiragana: 'づ', romaji: 'dzu', group: 'd-row', row: 'da' },
  { id: 'de', hiragana: 'で', romaji: 'de', group: 'd-row', row: 'da' },
  { id: 'do', hiragana: 'ど', romaji: 'do', group: 'd-row', row: 'da' },

  // Dakuten - B row (ば行)
  { id: 'ba', hiragana: 'ば', romaji: 'ba', group: 'b-row', row: 'ba' },
  { id: 'bi', hiragana: 'び', romaji: 'bi', group: 'b-row', row: 'ba' },
  { id: 'bu', hiragana: 'ぶ', romaji: 'bu', group: 'b-row', row: 'ba' },
  { id: 'be', hiragana: 'べ', romaji: 'be', group: 'b-row', row: 'ba' },
  { id: 'bo', hiragana: 'ぼ', romaji: 'bo', group: 'b-row', row: 'ba' },

  // Handakuten - P row (ぱ行)
  { id: 'pa', hiragana: 'ぱ', romaji: 'pa', group: 'p-row', row: 'pa' },
  { id: 'pi', hiragana: 'ぴ', romaji: 'pi', group: 'p-row', row: 'pa' },
  { id: 'pu', hiragana: 'ぷ', romaji: 'pu', group: 'p-row', row: 'pa' },
  { id: 'pe', hiragana: 'ぺ', romaji: 'pe', group: 'p-row', row: 'pa' },
  { id: 'po', hiragana: 'ぽ', romaji: 'po', group: 'p-row', row: 'pa' },
];

// Group definitions for UI organization
export const groups: HiraganaGroup[] = [
  { id: 'vowels', name: 'Vowels (あ行)', label: 'a i u e o' },
  { id: 'k-row', name: 'K Row (か行)', label: 'ka ki ku ke ko' },
  { id: 's-row', name: 'S Row (さ行)', label: 'sa shi su se so' },
  { id: 't-row', name: 'T Row (た行)', label: 'ta chi tsu te to' },
  { id: 'n-row', name: 'N Row (な行)', label: 'na ni nu ne no' },
  { id: 'h-row', name: 'H Row (は行)', label: 'ha hi fu he ho' },
  { id: 'm-row', name: 'M Row (ま行)', label: 'ma mi mu me mo' },
  { id: 'y-row', name: 'Y Row (や行)', label: 'ya yu yo' },
  { id: 'r-row', name: 'R Row (ら行)', label: 'ra ri ru re ro' },
  { id: 'w-row', name: 'W Row (わ行)', label: 'wa wo n' },
  { id: 'g-row', name: 'G Row (が行)', label: 'ga gi gu ge go' },
  { id: 'z-row', name: 'Z Row (ざ行)', label: 'za ji zu ze zo' },
  { id: 'd-row', name: 'D Row (だ行)', label: 'da dji dzu de do' },
  { id: 'b-row', name: 'B Row (ば行)', label: 'ba bi bu be bo' },
  { id: 'p-row', name: 'P Row (ぱ行)', label: 'pa pi pu pe po' },
];

// Helper function to get characters by group
export const getCharactersByGroup = (groupId: HiraganaGroupId): HiraganaCharacter[] => {
  return hiraganaData.filter(char => char.group === groupId);
};

// Helper function to get random character from a list
export const getRandomCharacter = (characters: HiraganaCharacter[]): HiraganaCharacter | null => {
  if (!characters || characters.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * characters.length);
  const character = characters[randomIndex];
  return character ?? null;
};

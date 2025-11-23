import type { HiraganaCharacter, HiraganaGroup, HiraganaGroupId } from '../types';

export const katakanaData: HiraganaCharacter[] = [
  // Vowels (ア行 - a row)
  { id: 'katakana_a', hiragana: 'ア', romaji: 'a', group: 'vowels', row: 'a' },
  { id: 'katakana_i', hiragana: 'イ', romaji: 'i', group: 'vowels', row: 'a' },
  { id: 'katakana_u', hiragana: 'ウ', romaji: 'u', group: 'vowels', row: 'a' },
  { id: 'katakana_e', hiragana: 'エ', romaji: 'e', group: 'vowels', row: 'a' },
  { id: 'katakana_o', hiragana: 'オ', romaji: 'o', group: 'vowels', row: 'a' },

  // K row (カ行)
  { id: 'katakana_ka', hiragana: 'カ', romaji: 'ka', group: 'k-row', row: 'ka' },
  { id: 'katakana_ki', hiragana: 'キ', romaji: 'ki', group: 'k-row', row: 'ka' },
  { id: 'katakana_ku', hiragana: 'ク', romaji: 'ku', group: 'k-row', row: 'ka' },
  { id: 'katakana_ke', hiragana: 'ケ', romaji: 'ke', group: 'k-row', row: 'ka' },
  { id: 'katakana_ko', hiragana: 'コ', romaji: 'ko', group: 'k-row', row: 'ka' },

  // S row (サ行)
  { id: 'katakana_sa', hiragana: 'サ', romaji: 'sa', group: 's-row', row: 'sa' },
  { id: 'katakana_shi', hiragana: 'シ', romaji: 'shi', group: 's-row', row: 'sa' },
  { id: 'katakana_su', hiragana: 'ス', romaji: 'su', group: 's-row', row: 'sa' },
  { id: 'katakana_se', hiragana: 'セ', romaji: 'se', group: 's-row', row: 'sa' },
  { id: 'katakana_so', hiragana: 'ソ', romaji: 'so', group: 's-row', row: 'sa' },

  // T row (タ行)
  { id: 'katakana_ta', hiragana: 'タ', romaji: 'ta', group: 't-row', row: 'ta' },
  { id: 'katakana_chi', hiragana: 'チ', romaji: 'chi', group: 't-row', row: 'ta' },
  { id: 'katakana_tsu', hiragana: 'ツ', romaji: 'tsu', group: 't-row', row: 'ta' },
  { id: 'katakana_te', hiragana: 'テ', romaji: 'te', group: 't-row', row: 'ta' },
  { id: 'katakana_to', hiragana: 'ト', romaji: 'to', group: 't-row', row: 'ta' },

  // N row (ナ行)
  { id: 'katakana_na', hiragana: 'ナ', romaji: 'na', group: 'n-row', row: 'na' },
  { id: 'katakana_ni', hiragana: 'ニ', romaji: 'ni', group: 'n-row', row: 'na' },
  { id: 'katakana_nu', hiragana: 'ヌ', romaji: 'nu', group: 'n-row', row: 'na' },
  { id: 'katakana_ne', hiragana: 'ネ', romaji: 'ne', group: 'n-row', row: 'na' },
  { id: 'katakana_no', hiragana: 'ノ', romaji: 'no', group: 'n-row', row: 'na' },

  // H row (ハ行)
  { id: 'katakana_ha', hiragana: 'ハ', romaji: 'ha', group: 'h-row', row: 'ha' },
  { id: 'katakana_hi', hiragana: 'ヒ', romaji: 'hi', group: 'h-row', row: 'ha' },
  { id: 'katakana_fu', hiragana: 'フ', romaji: 'fu', group: 'h-row', row: 'ha' },
  { id: 'katakana_he', hiragana: 'ヘ', romaji: 'he', group: 'h-row', row: 'ha' },
  { id: 'katakana_ho', hiragana: 'ホ', romaji: 'ho', group: 'h-row', row: 'ha' },

  // M row (マ行)
  { id: 'katakana_ma', hiragana: 'マ', romaji: 'ma', group: 'm-row', row: 'ma' },
  { id: 'katakana_mi', hiragana: 'ミ', romaji: 'mi', group: 'm-row', row: 'ma' },
  { id: 'katakana_mu', hiragana: 'ム', romaji: 'mu', group: 'm-row', row: 'ma' },
  { id: 'katakana_me', hiragana: 'メ', romaji: 'me', group: 'm-row', row: 'ma' },
  { id: 'katakana_mo', hiragana: 'モ', romaji: 'mo', group: 'm-row', row: 'ma' },

  // Y row (ヤ行)
  { id: 'katakana_ya', hiragana: 'ヤ', romaji: 'ya', group: 'y-row', row: 'ya' },
  { id: 'katakana_yu', hiragana: 'ユ', romaji: 'yu', group: 'y-row', row: 'ya' },
  { id: 'katakana_yo', hiragana: 'ヨ', romaji: 'yo', group: 'y-row', row: 'ya' },

  // R row (ラ行)
  { id: 'katakana_ra', hiragana: 'ラ', romaji: 'ra', group: 'r-row', row: 'ra' },
  { id: 'katakana_ri', hiragana: 'リ', romaji: 'ri', group: 'r-row', row: 'ra' },
  { id: 'katakana_ru', hiragana: 'ル', romaji: 'ru', group: 'r-row', row: 'ra' },
  { id: 'katakana_re', hiragana: 'レ', romaji: 're', group: 'r-row', row: 'ra' },
  { id: 'katakana_ro', hiragana: 'ロ', romaji: 'ro', group: 'r-row', row: 'ra' },

  // W row (ワ行)
  { id: 'katakana_wa', hiragana: 'ワ', romaji: 'wa', group: 'w-row', row: 'wa' },
  { id: 'katakana_wo', hiragana: 'ヲ', romaji: 'wo', group: 'w-row', row: 'wa' },
  { id: 'katakana_n', hiragana: 'ン', romaji: 'n', group: 'w-row', row: 'wa' },

  // Dakuten - G row (ガ行)
  { id: 'katakana_ga', hiragana: 'ガ', romaji: 'ga', group: 'g-row', row: 'ga' },
  { id: 'katakana_gi', hiragana: 'ギ', romaji: 'gi', group: 'g-row', row: 'ga' },
  { id: 'katakana_gu', hiragana: 'グ', romaji: 'gu', group: 'g-row', row: 'ga' },
  { id: 'katakana_ge', hiragana: 'ゲ', romaji: 'ge', group: 'g-row', row: 'ga' },
  { id: 'katakana_go', hiragana: 'ゴ', romaji: 'go', group: 'g-row', row: 'ga' },

  // Dakuten - Z row (ザ行)
  { id: 'katakana_za', hiragana: 'ザ', romaji: 'za', group: 'z-row', row: 'za' },
  { id: 'katakana_ji', hiragana: 'ジ', romaji: 'ji', group: 'z-row', row: 'za' },
  { id: 'katakana_zu', hiragana: 'ズ', romaji: 'zu', group: 'z-row', row: 'za' },
  { id: 'katakana_ze', hiragana: 'ゼ', romaji: 'ze', group: 'z-row', row: 'za' },
  { id: 'katakana_zo', hiragana: 'ゾ', romaji: 'zo', group: 'z-row', row: 'za' },

  // Dakuten - D row (ダ行)
  { id: 'katakana_da', hiragana: 'ダ', romaji: 'da', group: 'd-row', row: 'da' },
  { id: 'katakana_dji', hiragana: 'ヂ', romaji: 'dji', group: 'd-row', row: 'da' },
  { id: 'katakana_dzu', hiragana: 'ヅ', romaji: 'dzu', group: 'd-row', row: 'da' },
  { id: 'katakana_de', hiragana: 'デ', romaji: 'de', group: 'd-row', row: 'da' },
  { id: 'katakana_do', hiragana: 'ド', romaji: 'do', group: 'd-row', row: 'da' },

  // Dakuten - B row (バ行)
  { id: 'katakana_ba', hiragana: 'バ', romaji: 'ba', group: 'b-row', row: 'ba' },
  { id: 'katakana_bi', hiragana: 'ビ', romaji: 'bi', group: 'b-row', row: 'ba' },
  { id: 'katakana_bu', hiragana: 'ブ', romaji: 'bu', group: 'b-row', row: 'ba' },
  { id: 'katakana_be', hiragana: 'ベ', romaji: 'be', group: 'b-row', row: 'ba' },
  { id: 'katakana_bo', hiragana: 'ボ', romaji: 'bo', group: 'b-row', row: 'ba' },

  // Handakuten - P row (パ行)
  { id: 'katakana_pa', hiragana: 'パ', romaji: 'pa', group: 'p-row', row: 'pa' },
  { id: 'katakana_pi', hiragana: 'ピ', romaji: 'pi', group: 'p-row', row: 'pa' },
  { id: 'katakana_pu', hiragana: 'プ', romaji: 'pu', group: 'p-row', row: 'pa' },
  { id: 'katakana_pe', hiragana: 'ペ', romaji: 'pe', group: 'p-row', row: 'pa' },
  { id: 'katakana_po', hiragana: 'ポ', romaji: 'po', group: 'p-row', row: 'pa' },

  // Yōon - Combination characters (拗音)
  // K-row combinations
  { id: 'katakana_kya', hiragana: 'キャ', romaji: 'kya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_kyu', hiragana: 'キュ', romaji: 'kyu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_kyo', hiragana: 'キョ', romaji: 'kyo', group: 'yoon', row: 'yoon' },

  // S-row combinations
  { id: 'katakana_sha', hiragana: 'シャ', romaji: 'sha', group: 'yoon', row: 'yoon' },
  { id: 'katakana_shu', hiragana: 'シュ', romaji: 'shu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_sho', hiragana: 'ショ', romaji: 'sho', group: 'yoon', row: 'yoon' },

  // T-row combinations
  { id: 'katakana_cha', hiragana: 'チャ', romaji: 'cha', group: 'yoon', row: 'yoon' },
  { id: 'katakana_chu', hiragana: 'チュ', romaji: 'chu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_cho', hiragana: 'チョ', romaji: 'cho', group: 'yoon', row: 'yoon' },

  // N-row combinations
  { id: 'katakana_nya', hiragana: 'ニャ', romaji: 'nya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_nyu', hiragana: 'ニュ', romaji: 'nyu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_nyo', hiragana: 'ニョ', romaji: 'nyo', group: 'yoon', row: 'yoon' },

  // H-row combinations
  { id: 'katakana_hya', hiragana: 'ヒャ', romaji: 'hya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_hyu', hiragana: 'ヒュ', romaji: 'hyu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_hyo', hiragana: 'ヒョ', romaji: 'hyo', group: 'yoon', row: 'yoon' },

  // M-row combinations
  { id: 'katakana_mya', hiragana: 'ミャ', romaji: 'mya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_myu', hiragana: 'ミュ', romaji: 'myu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_myo', hiragana: 'ミョ', romaji: 'myo', group: 'yoon', row: 'yoon' },

  // R-row combinations
  { id: 'katakana_rya', hiragana: 'リャ', romaji: 'rya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_ryu', hiragana: 'リュ', romaji: 'ryu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_ryo', hiragana: 'リョ', romaji: 'ryo', group: 'yoon', row: 'yoon' },

  // G-row combinations (dakuten)
  { id: 'katakana_gya', hiragana: 'ギャ', romaji: 'gya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_gyu', hiragana: 'ギュ', romaji: 'gyu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_gyo', hiragana: 'ギョ', romaji: 'gyo', group: 'yoon', row: 'yoon' },

  // Z-row combinations (dakuten)
  { id: 'katakana_ja', hiragana: 'ジャ', romaji: 'ja', group: 'yoon', row: 'yoon' },
  { id: 'katakana_ju', hiragana: 'ジュ', romaji: 'ju', group: 'yoon', row: 'yoon' },
  { id: 'katakana_jo', hiragana: 'ジョ', romaji: 'jo', group: 'yoon', row: 'yoon' },

  // B-row combinations (dakuten)
  { id: 'katakana_bya', hiragana: 'ビャ', romaji: 'bya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_byu', hiragana: 'ビュ', romaji: 'byu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_byo', hiragana: 'ビョ', romaji: 'byo', group: 'yoon', row: 'yoon' },

  // P-row combinations (handakuten)
  { id: 'katakana_pya', hiragana: 'ピャ', romaji: 'pya', group: 'yoon', row: 'yoon' },
  { id: 'katakana_pyu', hiragana: 'ピュ', romaji: 'pyu', group: 'yoon', row: 'yoon' },
  { id: 'katakana_pyo', hiragana: 'ピョ', romaji: 'pyo', group: 'yoon', row: 'yoon' },
];

// Group definitions for UI organization (same as hiragana)
export const katakanaGroups: HiraganaGroup[] = [
  { id: 'vowels', name: 'Vowels (ア行)', label: 'a i u e o' },
  { id: 'k-row', name: 'K Row (カ行)', label: 'ka ki ku ke ko' },
  { id: 's-row', name: 'S Row (サ行)', label: 'sa shi su se so' },
  { id: 't-row', name: 'T Row (タ行)', label: 'ta chi tsu te to' },
  { id: 'n-row', name: 'N Row (ナ行)', label: 'na ni nu ne no' },
  { id: 'h-row', name: 'H Row (ハ行)', label: 'ha hi fu he ho' },
  { id: 'm-row', name: 'M Row (マ行)', label: 'ma mi mu me mo' },
  { id: 'y-row', name: 'Y Row (ヤ行)', label: 'ya yu yo' },
  { id: 'r-row', name: 'R Row (ラ行)', label: 'ra ri ru re ro' },
  { id: 'w-row', name: 'W Row (ワ行)', label: 'wa wo n' },
  { id: 'g-row', name: 'G Row (ガ行)', label: 'ga gi gu ge go' },
  { id: 'z-row', name: 'Z Row (ザ行)', label: 'za ji zu ze zo' },
  { id: 'd-row', name: 'D Row (ダ行)', label: 'da dji dzu de do' },
  { id: 'b-row', name: 'B Row (バ行)', label: 'ba bi bu be bo' },
  { id: 'p-row', name: 'P Row (パ行)', label: 'pa pi pu pe po' },
  { id: 'yoon', name: 'Yōon (拗音)', label: 'kya sha cha nya hya mya rya gya ja bya pya' },
];

// Helper function to get characters by group
export const getKatakanaCharactersByGroup = (groupId: HiraganaGroupId): HiraganaCharacter[] => {
  return katakanaData.filter(char => char.group === groupId);
};

// Helper function to get random character from a list
export const getRandomKatakanaCharacter = (
  characters: HiraganaCharacter[]
): HiraganaCharacter | null => {
  if (!characters || characters.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * characters.length);
  const character = characters[randomIndex];
  return character ?? null;
};

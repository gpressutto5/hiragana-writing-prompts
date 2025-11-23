// Script types
export type Script = 'hiragana' | 'katakana';

// Core hiragana character types
export type HiraganaGroupId =
  | 'vowels'
  | 'k-row'
  | 's-row'
  | 't-row'
  | 'n-row'
  | 'h-row'
  | 'm-row'
  | 'y-row'
  | 'r-row'
  | 'w-row'
  | 'g-row'
  | 'z-row'
  | 'd-row'
  | 'b-row'
  | 'p-row'
  | 'yoon';

export type HiraganaRowId =
  | 'a'
  | 'ka'
  | 'sa'
  | 'ta'
  | 'na'
  | 'ha'
  | 'ma'
  | 'ya'
  | 'ra'
  | 'wa'
  | 'ga'
  | 'za'
  | 'da'
  | 'ba'
  | 'pa'
  | 'yoon';

export interface HiraganaCharacter {
  id: string;
  hiragana: string;
  romaji: string;
  group: HiraganaGroupId;
  row: HiraganaRowId;
}

export interface HiraganaGroup {
  id: HiraganaGroupId;
  name: string;
  label: string;
}

// Word practice types
export type WordCategory = 'food' | 'greetings' | 'numbers' | 'animals' | 'common' | 'adjectives';

export interface WordData {
  id: string;
  word: string;
  romaji: string;
  meaning: string;
  characters: string[];
  category: WordCategory;
}

export type PracticeMode = 'characters' | 'words' | 'both';

// Progress tracking types
export interface AttemptHistory {
  timestamp: string;
  correct: boolean;
  difficulty?: number; // 0 = again, 2 = hard, 3 = good, 4 = easy
  source: 'character' | 'word';
  wordId?: string;
}

export interface SRSData {
  easinessFactor: number; // SM-2 easiness factor (1.3 - 2.5+)
  interval: number; // Days until next review
  repetitions: number; // Consecutive successful reviews
  nextReview: string | null; // ISO timestamp of next review
}

export interface CharacterProgress {
  attempts: number;
  correct: number;
  lastAttempt: string | null;
  history: AttemptHistory[];
  srs: SRSData;
}

export interface ProgressData {
  [characterId: string]: CharacterProgress;
}

export interface CharacterStats {
  attempts: number;
  correct: number;
  successRate: number;
  lastAttempt: string | null;
}

export interface OverallStats {
  totalAttempts: number;
  totalCorrect: number;
  overallSuccessRate: number;
  charactersStudied: number;
}

export interface RecentAttempt extends AttemptHistory {
  characterId: string;
}

// Calendar and streak types
export interface DailyPracticeData {
  date: string; // ISO date string (YYYY-MM-DD)
  attemptCount: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

// App state types
export type ViewType = 'selector' | 'practice' | 'stats';

// Component prop types
export interface CharacterSelectorProps {
  onStart: (characters: HiraganaCharacter[]) => void;
  allCharacters: HiraganaCharacter[];
  practiceMode: PracticeMode;
  setPracticeMode: (mode: PracticeMode) => void;
  script: Script;
  setScript: (script: Script) => void;
}

// Discriminated union for PromptCard props
export type PromptCardProps =
  | {
      type: 'character';
      character: HiraganaCharacter;
      script: Script;
      onAnswer: (difficulty: number) => void; // 0 = again, 2 = hard, 3 = good, 4 = easy
      onBack: () => void;
    }
  | {
      type: 'word';
      word: WordData;
      script: Script;
      onAnswer: (incorrectCharacterIds: string[]) => void; // Empty array if all correct
      onBack: () => void;
    };

export interface StatisticsProps {
  // Statistics component has no props, reads directly from progressTracker
}

// Word progress tracking types
export interface WordProgress {
  attempts: number;
  correct: number;
  lastAttempt: string | null;
  characterBreakdown: {
    [characterId: string]: {
      correct: number;
      incorrect: number;
    };
  };
}

export interface WordStats extends WordProgress {
  successRate: number;
}

export interface WordOverallStats {
  totalWords: number;
  attempted: number;
  averageSuccess: number;
}

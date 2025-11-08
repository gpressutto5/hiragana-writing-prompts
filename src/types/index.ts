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
  | 'p-row';

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
  | 'pa';

export interface HiraganaCharacter {
  id: string;
  hiragana: string;
  romaji: string;
  group: HiraganaGroupId;
  row: HiraganaRowId;
}

// Stroke order types
export interface Stroke {
  path: string; // SVG path data
  number: number; // Stroke order number
}

export interface StrokeOrderData {
  [characterId: string]: Stroke[]; // Character ID to array of strokes
}

export interface HiraganaGroup {
  id: HiraganaGroupId;
  name: string;
  label: string;
}

// Progress tracking types
export interface AttemptHistory {
  timestamp: string;
  correct: boolean;
}

export interface CharacterProgress {
  attempts: number;
  correct: number;
  lastAttempt: string | null;
  history: AttemptHistory[];
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
}

export interface PromptCardProps {
  character: HiraganaCharacter;
  onAnswer: (isCorrect: boolean) => void;
  onBack: () => void;
}

export interface StatisticsProps {
  // Statistics component has no props, reads directly from progressTracker
}

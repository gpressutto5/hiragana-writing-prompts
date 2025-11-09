import type {
  ProgressData,
  CharacterStats,
  OverallStats,
  RecentAttempt,
  DailyPracticeData,
  StreakData,
  SRSData,
  HiraganaCharacter,
} from '../types';

const STORAGE_KEY = 'hiragana_progress';
const DAILY_PRACTICE_KEY = 'hiragana_daily_practice';

// SRS Algorithm Constants (SM-2 based)
const MIN_EASINESS_FACTOR = 1.3;
const INITIAL_EASINESS_FACTOR = 2.5;
const INITIAL_INTERVAL = 1; // days

// Create default SRS data for new characters
const createDefaultSRS = (): SRSData => ({
  easinessFactor: INITIAL_EASINESS_FACTOR,
  interval: INITIAL_INTERVAL,
  repetitions: 0,
  nextReview: null,
});

// Get all progress data from localStorage
export const getProgress = (): ProgressData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};

    const progress = JSON.parse(data) as ProgressData;

    // Migrate old data without SRS to include SRS data
    Object.keys(progress).forEach(charId => {
      const charProgress = progress[charId];
      if (charProgress && !charProgress.srs) {
        charProgress.srs = createDefaultSRS();
      }
    });

    return progress;
  } catch (error) {
    console.error('Error reading progress:', error);
    return {};
  }
};

// Calculate next SRS values based on difficulty rating
// difficulty: 0 = again, 2 = hard, 3 = good, 4 = easy
const calculateSRS = (currentSRS: SRSData, difficulty: number): SRSData => {
  const { easinessFactor, interval, repetitions } = currentSRS;

  // Calculate new easiness factor using SM-2 formula
  // EF' = EF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  const quality = difficulty;
  let newEF = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEF = Math.max(MIN_EASINESS_FACTOR, newEF);

  let newInterval: number;
  let newRepetitions: number;

  if (difficulty < 3) {
    // Failed - reset repetitions and interval
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Passed - increase interval
    newRepetitions = repetitions + 1;

    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEF);
    }

    // Adjust interval based on difficulty
    if (difficulty === 2) {
      // Hard: multiply by 1.2
      newInterval = Math.round(newInterval * 1.2);
    } else if (difficulty === 4) {
      // Easy: multiply by easiness factor again
      newInterval = Math.round(newInterval * newEF);
    }
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    easinessFactor: newEF,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReview: nextReview.toISOString(),
  };
};

// Save progress for a specific character with difficulty rating
// difficulty: 0 = again, 2 = hard, 3 = good, 4 = easy
export const saveAttempt = (characterId: string, difficulty: number): ProgressData => {
  try {
    const progress = getProgress();

    if (!progress[characterId]) {
      progress[characterId] = {
        attempts: 0,
        correct: 0,
        lastAttempt: null,
        history: [],
        srs: createDefaultSRS(),
      };
    }

    const charProgress = progress[characterId];
    if (!charProgress) {
      throw new Error(`Failed to initialize progress for character: ${characterId}`);
    }

    const isCorrect = difficulty >= 3; // Good or Easy considered correct

    charProgress.attempts += 1;
    if (isCorrect) {
      charProgress.correct += 1;
    }
    charProgress.lastAttempt = new Date().toISOString();
    charProgress.history.push({
      timestamp: new Date().toISOString(),
      correct: isCorrect,
      difficulty,
    });

    // Update SRS data
    charProgress.srs = calculateSRS(charProgress.srs, difficulty);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

    // Update daily practice tracking
    updateDailyPractice();

    return progress;
  } catch (error) {
    console.error('Error saving progress:', error);
    return getProgress();
  }
};

// Get statistics for a specific character
export const getCharacterStats = (characterId: string): CharacterStats => {
  const progress = getProgress();
  const charProgress = progress[characterId];

  if (!charProgress || charProgress.attempts === 0) {
    return {
      attempts: 0,
      correct: 0,
      successRate: 0,
      lastAttempt: null,
    };
  }

  return {
    attempts: charProgress.attempts,
    correct: charProgress.correct,
    successRate: (charProgress.correct / charProgress.attempts) * 100,
    lastAttempt: charProgress.lastAttempt,
  };
};

// Get overall statistics
export const getOverallStats = (): OverallStats => {
  const progress = getProgress();
  const characterIds = Object.keys(progress);

  if (characterIds.length === 0) {
    return {
      totalAttempts: 0,
      totalCorrect: 0,
      overallSuccessRate: 0,
      charactersStudied: 0,
    };
  }

  let totalAttempts = 0;
  let totalCorrect = 0;

  characterIds.forEach(id => {
    const charProgress = progress[id];
    if (charProgress) {
      totalAttempts += charProgress.attempts;
      totalCorrect += charProgress.correct;
    }
  });

  return {
    totalAttempts,
    totalCorrect,
    overallSuccessRate: totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0,
    charactersStudied: characterIds.length,
  };
};

// Reset all progress
export const resetProgress = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting progress:', error);
    return false;
  }
};

// Get recent attempts (last N)
export const getRecentAttempts = (limit = 10): RecentAttempt[] => {
  const progress = getProgress();
  const allAttempts: RecentAttempt[] = [];

  Object.entries(progress).forEach(([characterId, data]) => {
    data.history.forEach(attempt => {
      allAttempts.push({
        characterId,
        ...attempt,
      });
    });
  });

  // Sort by timestamp descending
  allAttempts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return allAttempts.slice(0, limit);
};

// Helper function to get date string in YYYY-MM-DD format
const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0] ?? '';
};

// Get daily practice data from localStorage
const getDailyPracticeData = (): Record<string, number> => {
  try {
    const data = localStorage.getItem(DAILY_PRACTICE_KEY);
    return data ? (JSON.parse(data) as Record<string, number>) : {};
  } catch (error) {
    console.error('Error reading daily practice data:', error);
    return {};
  }
};

// Save daily practice data to localStorage
const saveDailyPracticeData = (data: Record<string, number>): void => {
  try {
    localStorage.setItem(DAILY_PRACTICE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving daily practice data:', error);
  }
};

// Update daily practice count (called when an attempt is made)
export const updateDailyPractice = (): void => {
  const today = getDateString(new Date());
  const dailyData = getDailyPracticeData();

  dailyData[today] = (dailyData[today] ?? 0) + 1;
  saveDailyPracticeData(dailyData);
};

// Get daily practice data for calendar display
export const getDailyPracticeHistory = (): DailyPracticeData[] => {
  const dailyData = getDailyPracticeData();

  return Object.entries(dailyData).map(([date, attemptCount]) => ({
    date,
    attemptCount,
  }));
};

// Calculate streak data
export const getStreakData = (): StreakData => {
  const dailyData = getDailyPracticeData();
  const dates = Object.keys(dailyData).sort();

  if (dates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
    };
  }

  const lastPracticeDate = dates[dates.length - 1] ?? null;
  const today = getDateString(new Date());
  const yesterday = getDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate streaks by checking consecutive days
  for (let i = dates.length - 1; i >= 0; i--) {
    const currentDate = dates[i];
    if (!currentDate) continue;

    if (i === dates.length - 1) {
      // Start with the most recent date
      if (currentDate === today || currentDate === yesterday) {
        tempStreak = 1;
        currentStreak = 1;
      }
    } else {
      const nextDate = dates[i + 1];
      if (!nextDate) continue;

      const current = new Date(currentDate);
      const next = new Date(nextDate);
      const diffDays = Math.floor((next.getTime() - current.getTime()) / (24 * 60 * 60 * 1000));

      if (diffDays === 1) {
        // Consecutive days
        tempStreak++;
        if (i === dates.length - 2 && (nextDate === today || nextDate === yesterday)) {
          currentStreak = tempStreak;
        }
      } else {
        // Streak broken
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    currentStreak,
    longestStreak,
    lastPracticeDate,
  };
};

// Get characters due for review based on SRS
export const getCharactersDueForReview = (
  allCharacters: HiraganaCharacter[]
): HiraganaCharacter[] => {
  const progress = getProgress();
  const now = new Date();

  const charactersByPriority: Array<{ char: HiraganaCharacter; priority: number }> = [];

  allCharacters.forEach(char => {
    const charProgress = progress[char.id];

    if (!charProgress || !charProgress.srs.nextReview) {
      // Never studied - high priority
      charactersByPriority.push({ char, priority: 1 });
    } else {
      const nextReview = new Date(charProgress.srs.nextReview);
      const dueIn = nextReview.getTime() - now.getTime();

      if (dueIn <= 0) {
        // Overdue - priority based on how overdue (more overdue = higher priority)
        const daysOverdue = Math.abs(dueIn) / (1000 * 60 * 60 * 24);
        charactersByPriority.push({ char, priority: 2 + daysOverdue });
      }
      // Not due yet - don't include
    }
  });

  // Sort by priority (descending - higher priority first)
  charactersByPriority.sort((a, b) => b.priority - a.priority);

  return charactersByPriority.map(item => item.char);
};

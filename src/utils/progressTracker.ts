import type {
  ProgressData,
  CharacterStats,
  OverallStats,
  RecentAttempt,
  DailyPracticeData,
  StreakData,
} from '../types';

const STORAGE_KEY = 'hiragana_progress';
const DAILY_PRACTICE_KEY = 'hiragana_daily_practice';

// Get all progress data from localStorage
export const getProgress = (): ProgressData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as ProgressData) : {};
  } catch (error) {
    console.error('Error reading progress:', error);
    return {};
  }
};

// Save progress for a specific character
export const saveAttempt = (characterId: string, isCorrect: boolean): ProgressData => {
  try {
    const progress = getProgress();

    if (!progress[characterId]) {
      progress[characterId] = {
        attempts: 0,
        correct: 0,
        lastAttempt: null,
        history: [],
      };
    }

    const charProgress = progress[characterId];
    if (!charProgress) {
      throw new Error(`Failed to initialize progress for character: ${characterId}`);
    }

    charProgress.attempts += 1;
    if (isCorrect) {
      charProgress.correct += 1;
    }
    charProgress.lastAttempt = new Date().toISOString();
    charProgress.history.push({
      timestamp: new Date().toISOString(),
      correct: isCorrect,
    });

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

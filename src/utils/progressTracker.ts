import type { ProgressData, CharacterStats, OverallStats, RecentAttempt } from '../types';

const STORAGE_KEY = 'hiragana_progress';

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

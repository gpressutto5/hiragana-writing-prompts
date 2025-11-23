import { useState } from 'react';
import {
  getOverallStats,
  getOverallStatsByScript,
  getProgress,
  getCharacterStats,
  resetProgress,
} from '../utils/progressTracker';
import { hiraganaData } from '../data/hiragana';
import { katakanaData } from '../data/katakana';
import Calendar from './Calendar';
import type { HiraganaCharacter, CharacterStats, Script } from '../types';
import { getSuccessRateColor } from '../utils/colorUtils';

interface CharacterWithStats extends HiraganaCharacter {
  stats: CharacterStats;
  sourceBreakdown: {
    character: number;
    word: number;
  };
}

function Statistics() {
  const [scriptFilter, setScriptFilter] = useState<Script | 'all'>('all');

  const overallStats = getOverallStats();
  const progress = getProgress();

  // Get script-specific stats
  const hiraganaStats = getOverallStatsByScript('hiragana');
  const katakanaStats = getOverallStatsByScript('katakana');

  // Determine which data to show based on filter
  const displayedStats =
    scriptFilter === 'all'
      ? overallStats
      : scriptFilter === 'hiragana'
        ? hiraganaStats
        : katakanaStats;

  const allCharacters =
    scriptFilter === 'all'
      ? [...hiraganaData, ...katakanaData]
      : scriptFilter === 'hiragana'
        ? hiraganaData
        : katakanaData;

  // Helper to calculate source breakdown for a character
  const getSourceBreakdown = (characterId: string) => {
    const charProgress = progress[characterId];
    if (!charProgress) return { character: 0, word: 0 };

    const breakdown = { character: 0, word: 0 };
    charProgress.history.forEach(attempt => {
      if (attempt.source === 'character') {
        breakdown.character++;
      } else if (attempt.source === 'word') {
        breakdown.word++;
      }
    });
    return breakdown;
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  };

  // Get characters with attempts, sorted by success rate (lowest first)
  const charactersWithStats: CharacterWithStats[] = allCharacters
    .map(char => ({
      ...char,
      stats: getCharacterStats(char.id),
      sourceBreakdown: getSourceBreakdown(char.id),
    }))
    .filter(char => char.stats.attempts > 0)
    .sort((a, b) => a.stats.successRate - b.stats.successRate);

  const hasAnyProgress = Object.keys(progress).length > 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
        {hasAnyProgress && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Reset Progress
          </button>
        )}
      </div>

      {/* Calendar */}
      <div className="mb-8">
        <Calendar />
      </div>

      {/* Script Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setScriptFilter('all')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            scriptFilter === 'all'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Scripts
        </button>
        <button
          onClick={() => setScriptFilter('hiragana')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            scriptFilter === 'hiragana'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ひらがな Hiragana
        </button>
        <button
          onClick={() => setScriptFilter('katakana')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            scriptFilter === 'katakana'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          カタカナ Katakana
        </button>
      </div>

      {/* Overall Character Statistics */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {scriptFilter === 'all'
          ? 'All Character Practice'
          : scriptFilter === 'hiragana'
            ? 'Hiragana Practice'
            : 'Katakana Practice'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-900">{displayedStats.totalAttempts}</div>
          <div className="text-sm text-blue-700 mt-1">Total Attempts</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-900">{displayedStats.totalCorrect}</div>
          <div className="text-sm text-green-700 mt-1">Correct</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-900">
            {displayedStats.overallSuccessRate.toFixed(0)}%
          </div>
          <div className="text-sm text-purple-700 mt-1">Success Rate</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-indigo-900">
            {displayedStats.charactersStudied}
          </div>
          <div className="text-sm text-indigo-700 mt-1">Characters Studied</div>
        </div>
      </div>

      {/* Per-character statistics */}
      {charactersWithStats.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Character Performance</h3>
          <div className="space-y-2">
            {charactersWithStats.map(char => (
              <div
                key={char.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-gray-800">{char.hiragana}</div>
                  <div>
                    <div className="font-medium text-gray-800">{char.romaji}</div>
                    <div className="text-sm text-gray-500">
                      {char.stats.correct} / {char.stats.attempts} attempts
                    </div>
                    {(char.sourceBreakdown.character > 0 || char.sourceBreakdown.word > 0) && (
                      <div className="text-xs text-gray-400 mt-1">
                        {char.sourceBreakdown.character > 0 && (
                          <span className="mr-2">📝 {char.sourceBreakdown.character} char</span>
                        )}
                        {char.sourceBreakdown.word > 0 && (
                          <span>📚 {char.sourceBreakdown.word} word</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Progress bar */}
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${getSuccessRateColor(char.stats.successRate)}`}
                      style={{ width: `${char.stats.successRate}%` }}
                    ></div>
                  </div>
                  {/* Success rate */}
                  <div
                    className={`font-bold text-lg ${
                      char.stats.successRate >= 80
                        ? 'text-green-600'
                        : char.stats.successRate >= 50
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {char.stats.successRate.toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No practice data yet</h3>
          <p className="text-gray-600">Start practicing to see your progress here!</p>
        </div>
      )}
    </div>
  );
}

export default Statistics;

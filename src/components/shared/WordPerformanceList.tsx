import type { WordStats } from '../../types';

interface WordWithStats {
  id: string;
  word: string;
  romaji: string;
  meaning: string;
  stats: WordStats;
}

interface WordPerformanceListProps {
  /** Title to display above the list */
  title: string;
  /** Array of words with their statistics */
  words: WordWithStats[];
  /** Visual variant for styling */
  variant: 'top' | 'needs-practice';
}

/**
 * Shared word performance list component
 * Displays a list of words with their performance statistics
 */
export const WordPerformanceList = ({ title, words, variant }: WordPerformanceListProps) => {
  if (words.length === 0) return null;

  const bgGradient = variant === 'top' ? 'from-green-50 to-emerald-50' : 'from-red-50 to-orange-50';

  const rateColor = variant === 'top' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-2">
        {words.map(word => (
          <div
            key={word.id}
            className={`flex items-center justify-between p-4 bg-gradient-to-r ${bgGradient} rounded-lg`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-gray-800">{word.word}</div>
              <div>
                <div className="font-medium text-gray-800">{word.romaji}</div>
                <div className="text-sm text-gray-600">{word.meaning}</div>
                <div className="text-xs text-gray-500">
                  {word.stats.correct} / {word.stats.attempts} attempts
                </div>
              </div>
            </div>
            <div className={`text-2xl font-bold ${rateColor}`}>
              {word.stats.successRate.toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { getOverallStats, getProgress, getCharacterStats, resetProgress } from '../utils/progressTracker';
import { hiraganaData } from '../data/hiragana';

function Statistics() {
  const overallStats = getOverallStats();
  const progress = getProgress();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  };

  // Get characters with attempts, sorted by success rate (lowest first)
  const charactersWithStats = hiraganaData
    .map(char => ({
      ...char,
      stats: getCharacterStats(char.id)
    }))
    .filter(char => char.stats.attempts > 0)
    .sort((a, b) => a.stats.successRate - b.stats.successRate);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
        {Object.keys(progress).length > 0 && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Reset Progress
          </button>
        )}
      </div>

      {/* Overall statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-900">
            {overallStats.totalAttempts}
          </div>
          <div className="text-sm text-blue-700 mt-1">Total Attempts</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-900">
            {overallStats.totalCorrect}
          </div>
          <div className="text-sm text-green-700 mt-1">Correct</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-900">
            {overallStats.overallSuccessRate.toFixed(0)}%
          </div>
          <div className="text-sm text-purple-700 mt-1">Success Rate</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-indigo-900">
            {overallStats.charactersStudied}
          </div>
          <div className="text-sm text-indigo-700 mt-1">Characters Studied</div>
        </div>
      </div>

      {/* Per-character statistics */}
      {charactersWithStats.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Character Performance
          </h3>
          <div className="space-y-2">
            {charactersWithStats.map(char => (
              <div
                key={char.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-gray-800">
                    {char.hiragana}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {char.romaji}
                    </div>
                    <div className="text-sm text-gray-500">
                      {char.stats.correct} / {char.stats.attempts} attempts
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Progress bar */}
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        char.stats.successRate >= 80
                          ? 'bg-green-500'
                          : char.stats.successRate >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${char.stats.successRate}%` }}
                    ></div>
                  </div>
                  {/* Success rate */}
                  <div className={`font-bold text-lg ${
                    char.stats.successRate >= 80
                      ? 'text-green-600'
                      : char.stats.successRate >= 50
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No practice data yet
          </h3>
          <p className="text-gray-600">
            Start practicing to see your progress here!
          </p>
        </div>
      )}
    </div>
  );
}

export default Statistics;

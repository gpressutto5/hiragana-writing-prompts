import { useState } from 'react';
import type { PromptCardProps } from '../types';

function PromptCard({ character, onAnswer, onBack }: PromptCardProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    setRevealed(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBack}
        className="self-start mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Selection
      </button>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Write this character:</h2>

        {/* Romaji prompt */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-12 mb-8 text-center shadow-lg">
          <div className="text-6xl font-bold text-indigo-900">{character.romaji}</div>
        </div>

        {/* Instructions */}
        {!revealed && (
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              Write the hiragana character in your notebook, then click reveal to check your answer.
            </p>
            <button
              onClick={handleReveal}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-lg"
            >
              Reveal Answer
            </button>
          </div>
        )}

        {/* Revealed answer */}
        {revealed && (
          <div className="space-y-6">
            {/* Hiragana character */}
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-12 text-center shadow-lg">
              <div className="text-8xl font-bold text-green-900">{character.hiragana}</div>
              <div className="text-lg text-gray-600 mt-4">{character.romaji}</div>
            </div>

            {/* Self-assessment buttons */}
            <div className="text-center">
              <p className="text-gray-600 mb-4 font-medium">Did you write it correctly?</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  ✗ Incorrect
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  ✓ Correct
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromptCard;

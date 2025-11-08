import { useState, useEffect } from 'react';
import type { PromptCardProps } from '../types';

function PromptCard({ character, onAnswer, onBack }: PromptCardProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleAnswer = (difficulty: number) => {
    onAnswer(difficulty);
    setRevealed(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // Space or Enter: Reveal answer (only when not revealed)
      if (!revealed && (key === ' ' || key === 'enter')) {
        e.preventDefault();
        handleReveal();
        return;
      }

      // When revealed, handle answer shortcuts
      if (revealed) {
        // Again: 1 or X
        if (key === '1' || key === 'x') {
          e.preventDefault();
          handleAnswer(0);
          return;
        }

        // Hard: 2 or H
        if (key === '2' || key === 'h') {
          e.preventDefault();
          handleAnswer(2);
          return;
        }

        // Good: 3, Space, or Enter
        if (key === '3' || key === ' ' || key === 'enter') {
          e.preventDefault();
          handleAnswer(3);
          return;
        }

        // Easy: 4 or E
        if (key === '4' || key === 'e') {
          e.preventDefault();
          handleAnswer(4);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealed, handleReveal, handleAnswer]);

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
        {!revealed && (
          <>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-18 mb-8 text-center shadow-lg h-64 flex items-center justify-center">
              <div className="text-6xl font-bold text-indigo-900">{character.romaji}</div>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4 h-12 flex items-center justify-center">
                Write the hiragana character in your notebook, then click reveal to check your
                answer.
              </p>
              <button
                onClick={handleReveal}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Reveal Answer
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Keyboard: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> or{' '}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd>
              </p>
            </div>
          </>
        )}

        {/* Revealed answer */}
        {revealed && (
          <>
            {/* Hiragana character */}
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-12 mb-8 text-center shadow-lg h-64 flex flex-col items-center justify-center">
              <div className="text-8xl font-bold text-green-900">{character.hiragana}</div>
              <div className="text-lg text-gray-600 mt-4">{character.romaji}</div>
            </div>

            {/* Self-assessment buttons with difficulty rating */}
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4 font-medium h-12 flex items-center justify-center">
                How well did you remember it?
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                <button
                  onClick={() => handleAnswer(0)}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Again
                  <div className="text-xs opacity-90">Completely forgot</div>
                </button>
                <button
                  onClick={() => handleAnswer(2)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Hard
                  <div className="text-xs opacity-90">Difficult recall</div>
                </button>
                <button
                  onClick={() => handleAnswer(3)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Good
                  <div className="text-xs opacity-90">Correct with effort</div>
                </button>
                <button
                  onClick={() => handleAnswer(4)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Easy
                  <div className="text-xs opacity-90">Perfect recall</div>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Keyboard: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">1/X</kbd> Again,{' '}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">2/H</kbd> Hard,{' '}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">3/Space</kbd> Good,{' '}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">4/E</kbd> Easy
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PromptCard;

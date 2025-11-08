import { useState, useEffect } from 'react';
import CharacterSelector from './components/CharacterSelector';
import PromptCard from './components/PromptCard';
import Statistics from './components/Statistics';
import Calendar from './components/Calendar';
import { hiraganaData, getRandomCharacter } from './data/hiragana';
import { saveAttempt } from './utils/progressTracker';
import type { HiraganaCharacter, ViewType } from './types';
import './App.css';

function App() {
  const [view, setView] = useState<ViewType>('selector');
  const [selectedCharacters, setSelectedCharacters] = useState<HiraganaCharacter[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<HiraganaCharacter | null>(null);
  const [recentCharacters, setRecentCharacters] = useState<string[]>([]);

  const startPractice = (characters: HiraganaCharacter[]) => {
    if (characters.length === 0) {
      alert('Please select at least one character to practice!');
      return;
    }
    setSelectedCharacters(characters);
    setView('practice');
    nextCharacter(characters);
  };

  const nextCharacter = (chars: HiraganaCharacter[] = selectedCharacters) => {
    // Filter out recently shown characters to avoid repetition
    const availableChars = chars.filter(char => !recentCharacters.includes(char.id));

    const charsToUse = availableChars.length > 0 ? availableChars : chars;
    const randomChar = getRandomCharacter(charsToUse);

    if (!randomChar) return;

    setCurrentCharacter(randomChar);

    // Keep track of recent characters (last 3)
    setRecentCharacters(prev => {
      const updated = [randomChar.id, ...prev];
      return updated.slice(0, Math.min(3, chars.length - 1));
    });
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentCharacter) return;

    // Save the attempt
    saveAttempt(currentCharacter.id, isCorrect);

    // Move to next character
    nextCharacter();
  };

  const backToSelector = () => {
    setView('selector');
    setCurrentCharacter(null);
    setSelectedCharacters([]);
    setRecentCharacters([]);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // Tab: Switch between views (only when not in practice mode or practice mode is available)
      if (key === 'tab') {
        e.preventDefault();
        if (view === 'selector') {
          if (selectedCharacters.length > 0) {
            setView('practice');
          } else {
            setView('stats');
          }
        } else if (view === 'practice') {
          setView('stats');
        } else if (view === 'stats') {
          setView('calendar');
        } else if (view === 'calendar') {
          setView('selector');
        }
        return;
      }

      // R: Reset/restart practice (only in practice mode)
      if (key === 'r' && view === 'practice' && selectedCharacters.length > 0) {
        e.preventDefault();
        nextCharacter(selectedCharacters);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, selectedCharacters, nextCharacter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">ひらがな Practice</h1>
          <p className="text-gray-600">Master hiragana through random practice</p>
        </header>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView('selector')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              view === 'selector'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Select Characters
          </button>
          <button
            onClick={() => setView('practice')}
            disabled={selectedCharacters.length === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              view === 'practice' && selectedCharacters.length > 0
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => setView('stats')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              view === 'stats'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              view === 'calendar'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Calendar
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {view === 'selector' && (
            <CharacterSelector onStart={startPractice} allCharacters={hiraganaData} />
          )}

          {view === 'practice' && currentCharacter && (
            <PromptCard
              character={currentCharacter}
              onAnswer={handleAnswer}
              onBack={backToSelector}
            />
          )}

          {view === 'stats' && <Statistics />}

          {view === 'calendar' && <Calendar />}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Practice daily for best results! がんばって!</p>
          <div className="mt-4 text-xs">
            <p className="font-semibold mb-2">Keyboard Shortcuts:</p>
            <p>
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">Tab</kbd> Switch views •{' '}
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">R</kbd> Next character (in
              practice)
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

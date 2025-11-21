import { useState, useEffect, useMemo } from 'react';
import CharacterSelector from './components/CharacterSelector';
import PromptCard from './components/PromptCard';
import Statistics from './components/Statistics';
import { hiraganaData, getRandomCharacter } from './data/hiragana';
import { wordsData } from './data/words';
import {
  saveAttempt,
  getCharactersDueForReview,
  saveWordAttemptWithCharacters,
} from './utils/progressTracker';
import { filterAvailableWords } from './utils/wordFilter';
import type { HiraganaCharacter, ViewType, PracticeMode, WordData } from './types';
import './App.css';

function App() {
  const [view, setView] = useState<ViewType>('selector');
  const [selectedCharacters, setSelectedCharacters] = useState<HiraganaCharacter[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<HiraganaCharacter | null>(null);
  const [recentCharacters, setRecentCharacters] = useState<string[]>([]);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('characters');

  // Word practice state
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);
  const [recentWords, setRecentWords] = useState<string[]>([]);

  // Calculate available words based on selected characters
  const availableWords = useMemo(
    () => filterAvailableWords(wordsData, selectedCharacters),
    [selectedCharacters]
  );

  const startPractice = (characters: HiraganaCharacter[]) => {
    if (characters.length === 0) {
      alert('Please select at least one character to practice!');
      return;
    }
    setSelectedCharacters(characters);
    setView('practice');

    // Start with appropriate content based on practice mode
    if (practiceMode === 'characters') {
      nextCharacter(characters);
    } else if (practiceMode === 'words') {
      nextWord(filterAvailableWords(wordsData, characters));
    } else {
      // 'both' mode - 50/50 random
      if (Math.random() < 0.5) {
        nextCharacter(characters);
      } else {
        nextWord(filterAvailableWords(wordsData, characters));
      }
    }
  };

  const nextCharacter = (chars: HiraganaCharacter[] = selectedCharacters) => {
    // Get characters due for review based on SRS
    const dueChars = getCharactersDueForReview(chars);

    // If we have due characters, prioritize them
    let charsToPickFrom: HiraganaCharacter[];
    if (dueChars.length > 0) {
      // Filter out recently shown from due characters
      const availableDueChars = dueChars.filter(char => !recentCharacters.includes(char.id));
      charsToPickFrom = availableDueChars.length > 0 ? availableDueChars : dueChars;
    } else {
      // No due characters, fall back to all selected characters
      const availableChars = chars.filter(char => !recentCharacters.includes(char.id));
      charsToPickFrom = availableChars.length > 0 ? availableChars : chars;
    }

    const randomChar = getRandomCharacter(charsToPickFrom);

    if (!randomChar) return;

    setCurrentCharacter(randomChar);
    setCurrentWord(null); // Clear word when showing character

    // Keep track of recent characters (last 3)
    setRecentCharacters(prev => {
      const updated = [randomChar.id, ...prev];
      return updated.slice(0, Math.min(3, chars.length - 1));
    });
  };

  const nextWord = (words: WordData[] = availableWords) => {
    // Filter out recently shown words
    const availableWordsFiltered = words.filter(word => !recentWords.includes(word.id));
    const wordsToUse = availableWordsFiltered.length > 0 ? availableWordsFiltered : words;

    if (wordsToUse.length === 0) return;

    // Pick random word
    const randomIndex = Math.floor(Math.random() * wordsToUse.length);
    const randomWord = wordsToUse[randomIndex];

    if (!randomWord) return;

    setCurrentWord(randomWord);
    setCurrentCharacter(null); // Clear character when showing word

    // Keep track of recent words (last 3)
    setRecentWords(prev => {
      const updated = [randomWord.id, ...prev];
      return updated.slice(0, Math.min(3, words.length - 1));
    });
  };

  const handleAnswer = (difficulty: number) => {
    if (!currentCharacter) return;

    // Save the attempt with difficulty rating
    saveAttempt(currentCharacter.id, difficulty);

    // Move to next item based on practice mode
    moveToNext();
  };

  const handleWordAnswer = (incorrectCharacterIds: string[]) => {
    if (!currentWord) return;

    // Save word attempt with character breakdown
    saveWordAttemptWithCharacters(currentWord.id, currentWord.characters, incorrectCharacterIds);

    // Move to next item based on practice mode
    moveToNext();
  };

  const moveToNext = () => {
    if (practiceMode === 'characters') {
      nextCharacter();
    } else if (practiceMode === 'words') {
      nextWord();
    } else {
      // 'both' mode - 50/50 random
      if (Math.random() < 0.5) {
        nextCharacter();
      } else {
        nextWord();
      }
    }
  };

  const backToSelector = () => {
    setView('selector');
    setCurrentCharacter(null);
    setCurrentWord(null);
    setSelectedCharacters([]);
    setRecentCharacters([]);
    setRecentWords([]);
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
          setView('selector');
        }
        return;
      }

      // R: Reset/restart practice (only in practice mode)
      if (key === 'r' && view === 'practice' && selectedCharacters.length > 0) {
        e.preventDefault();
        moveToNext();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, selectedCharacters, moveToNext]);

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
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {view === 'selector' && (
            <CharacterSelector
              onStart={startPractice}
              allCharacters={hiraganaData}
              practiceMode={practiceMode}
              setPracticeMode={setPracticeMode}
            />
          )}

          {view === 'practice' && currentCharacter && (
            <PromptCard
              type="character"
              character={currentCharacter}
              onAnswer={handleAnswer}
              onBack={backToSelector}
            />
          )}

          {view === 'practice' && currentWord && (
            <PromptCard
              type="word"
              word={currentWord}
              onAnswer={handleWordAnswer}
              onBack={backToSelector}
            />
          )}

          {view === 'stats' && <Statistics />}
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

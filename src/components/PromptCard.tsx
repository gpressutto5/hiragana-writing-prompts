import { useState, useEffect, useRef } from 'react';
import type { PromptCardProps } from '../types';
import {
  playPronunciation,
  getAudioSettings,
  saveAudioSettings,
  preloadAudio,
} from '../utils/audioService';
import { AudioControlsPanel } from './shared/AudioControlsPanel';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { toggleSetItem } from '../utils/setUtils';
import { getDifficultyButtonClass } from '../utils/buttonStyles';
import { hiraganaToKatakana } from '../utils/scriptConverter';

function PromptCard(props: PromptCardProps) {
  const { type, onBack, script } = props;
  const [revealed, setRevealed] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentPlayingPromise = useRef<Promise<void> | null>(null);
  const shouldAutoplayNextCharacter = useRef(false);

  // Word-specific state: track which characters are marked incorrect
  const [incorrectCharIds, setIncorrectCharIds] = useState<Set<string>>(new Set());

  // Get the appropriate data based on type
  const character = type === 'character' ? props.character : null;
  const word = type === 'word' ? props.word : null;

  // Convert word text to katakana if needed
  const wordText = word?.word || '';
  const displayText =
    character?.hiragana || (script === 'katakana' ? hiraganaToKatakana(wordText) : wordText);

  const romaji = character?.romaji || word?.romaji || '';
  const meaning = word?.meaning;

  // Load audio settings on mount
  useEffect(() => {
    const settings = getAudioSettings();
    setAutoPlay(settings.autoPlay);
  }, []);

  // Reset incorrectCharIds when new word appears
  useEffect(() => {
    setIncorrectCharIds(new Set());
  }, [word?.id]);

  // Preload audio for current character (character mode only)
  useEffect(() => {
    if (character) {
      preloadAudio();
    }
  }, [character?.hiragana]);

  // Auto-play audio when new character appears (prompt stage only)
  // This runs after handleAnswer sets the flag and parent updates character
  // Browser allows it because it's triggered by user interaction chain
  useEffect(() => {
    if (!revealed && autoPlay && shouldAutoplayNextCharacter.current) {
      shouldAutoplayNextCharacter.current = false;
      // Use setTimeout to ensure it runs after render completes
      // This keeps it within the user interaction gesture window
      setTimeout(() => {
        void handlePlayAudio();
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character?.hiragana, revealed, autoPlay]);

  const handleReveal = () => {
    setRevealed(true);
    // Auto-play audio when revealed if enabled
    // Must be called directly in user interaction handler to avoid browser blocking
    if (autoPlay) {
      void handlePlayAudio();
    }
  };

  const handleAnswer = (difficulty?: number) => {
    // Mark that we should autoplay when the next character loads
    if (autoPlay) {
      shouldAutoplayNextCharacter.current = true;
    }

    if (type === 'character' && difficulty !== undefined) {
      props.onAnswer(difficulty);
    } else if (type === 'word' && word) {
      // Convert incorrect IDs to script-specific format
      const scriptSpecificIncorrectIds = Array.from(incorrectCharIds).map(id =>
        script === 'katakana' ? `katakana_${id}` : id
      );

      props.onAnswer(scriptSpecificIncorrectIds);
    }

    setRevealed(false);
    setIncorrectCharIds(new Set()); // Reset for next word
  };

  const handlePlayAudio = async () => {
    setIsPlaying(true);

    // Create and track the current playing promise
    const playPromise = playPronunciation(displayText);
    currentPlayingPromise.current = playPromise;

    try {
      await playPromise;
    } catch (error) {
      console.error('Failed to play audio:', error);
    } finally {
      // Only set isPlaying to false if this is still the current playing promise
      if (currentPlayingPromise.current === playPromise) {
        setIsPlaying(false);
        currentPlayingPromise.current = null;
      }
    }
  };

  // Toggle character selection for word mode
  const toggleCharacterIncorrect = (charId: string) => {
    setIncorrectCharIds(prev => toggleSetItem(prev, charId));
  };

  const toggleAutoPlay = () => {
    const newAutoPlay = !autoPlay;
    setAutoPlay(newAutoPlay);
    saveAudioSettings({ autoPlay: newAutoPlay });
  };

  // Keyboard shortcuts
  useKeyboardShortcuts(
    [
      { key: 'p', handler: () => void handlePlayAudio() },
      ...(revealed
        ? [
            { key: 'x', handler: () => handleAnswer(0) },
            { key: ' ', handler: () => handleAnswer(3) },
            { key: 'enter', handler: () => handleAnswer(3) },
          ]
        : [
            { key: ' ', handler: handleReveal },
            { key: 'enter', handler: handleReveal },
          ]),
    ],
    [revealed, handleAnswer]
  );

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
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {type === 'character' ? 'Write this character:' : 'Write this word:'}
        </h2>

        {/* Romaji prompt */}
        {!revealed && (
          <>
            <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-18 mb-8 text-center shadow-lg h-64 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold text-indigo-900">{romaji}</div>
              {meaning && <div className="text-lg text-gray-600 mt-4">({meaning})</div>}

              {/* Floating audio controls */}
              <AudioControlsPanel
                onPlayAudio={handlePlayAudio}
                isPlaying={isPlaying}
                onToggleAutoPlay={toggleAutoPlay}
                autoPlay={autoPlay}
              />
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4 h-12 flex items-center justify-center">
                {type === 'character'
                  ? 'Write the character in your notebook, then click reveal to check your answer.'
                  : 'Write the word in your notebook, then click reveal to check your answer.'}
              </p>
              <button
                onClick={handleReveal}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Reveal Answer
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Keyboard: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">P</kbd> play audio
                • <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> or{' '}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd> reveal
              </p>
            </div>
          </>
        )}

        {/* Revealed answer */}
        {revealed && (
          <>
            {/* Hiragana display */}
            <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-12 mb-8 text-center shadow-lg min-h-64 flex flex-col items-center justify-center">
              <div className="text-8xl font-bold text-green-900">{displayText}</div>
              <div className="text-lg text-gray-600 mt-4">
                {romaji}
                {meaning && ` (${meaning})`}
              </div>

              {/* Floating audio controls */}
              <AudioControlsPanel
                onPlayAudio={handlePlayAudio}
                isPlaying={isPlaying}
                onToggleAutoPlay={toggleAutoPlay}
                autoPlay={autoPlay}
              />
            </div>

            {/* Self-assessment */}
            <div className="text-center mb-8">
              {/* Character mode: Simple correct/incorrect */}
              {type === 'character' && (
                <>
                  <p className="text-gray-600 mb-4 font-medium h-12 flex items-center justify-center">
                    Did you write it correctly?
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleAnswer(0)}
                      className={getDifficultyButtonClass('red')}
                    >
                      ✕ Incorrect
                    </button>
                    <button
                      onClick={() => handleAnswer(3)}
                      className={getDifficultyButtonClass('green')}
                    >
                      ○ Correct
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Keyboard: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">P</kbd> play
                    audio • <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">X</kbd> Incorrect
                    • <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space/Enter</kbd>{' '}
                    Correct
                  </p>
                </>
              )}

              {/* Word mode: Correct or select incorrect characters */}
              {type === 'word' && word && (
                <>
                  <p className="text-gray-600 mb-4 font-medium h-12 flex items-center justify-center">
                    Did you write it correctly?
                  </p>
                  <div className="flex gap-4 justify-center mb-6">
                    <button
                      onClick={() => handleAnswer()}
                      className={getDifficultyButtonClass('green')}
                    >
                      ○ Correct
                    </button>
                  </div>

                  {/* Character selection for incorrect words */}
                  <div className="mb-6">
                    <p className="text-gray-700 font-medium mb-3">
                      Or select which characters you got wrong:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {word.word.split('').map((char, idx) => {
                        const charId = word.characters[idx];
                        if (!charId) return null;
                        const isIncorrect = incorrectCharIds.has(charId);
                        return (
                          <button
                            key={`${charId}-${idx}`}
                            onClick={() => toggleCharacterIncorrect(charId)}
                            className={`px-4 py-3 text-2xl font-bold rounded-lg transition-all ${
                              isIncorrect
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                          >
                            {char}
                          </button>
                        );
                      })}
                    </div>
                    {incorrectCharIds.size > 0 && (
                      <button
                        onClick={() => handleAnswer()}
                        className="mt-4 px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        Submit ({incorrectCharIds.size} incorrect)
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PromptCard;

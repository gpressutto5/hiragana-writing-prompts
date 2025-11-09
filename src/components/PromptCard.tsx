import { useState, useEffect, useRef } from 'react';
import type { PromptCardProps } from '../types';
import {
  playPronunciation,
  getAudioSettings,
  saveAudioSettings,
  preloadAudio,
} from '../utils/audioService';

function PromptCard({ character, onAnswer, onBack }: PromptCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentPlayingPromise = useRef<Promise<void> | null>(null);
  const shouldAutoplayNextCharacter = useRef(false);

  // Load audio settings on mount
  useEffect(() => {
    const settings = getAudioSettings();
    setAutoPlay(settings.autoPlay);
  }, []);

  // Preload audio for current character
  useEffect(() => {
    preloadAudio();
  }, [character.hiragana]);

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
  }, [character.hiragana, revealed, autoPlay]);

  const handleReveal = () => {
    setRevealed(true);
    // Auto-play audio when revealed if enabled
    // Must be called directly in user interaction handler to avoid browser blocking
    if (autoPlay) {
      void handlePlayAudio();
    }
  };

  const handleAnswer = (difficulty: number) => {
    // Mark that we should autoplay when the next character loads
    if (autoPlay) {
      shouldAutoplayNextCharacter.current = true;
    }
    onAnswer(difficulty);
    setRevealed(false);
  };

  const handlePlayAudio = async () => {
    setIsPlaying(true);

    // Create and track the current playing promise
    const playPromise = playPronunciation(character.hiragana);
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

  const toggleAutoPlay = () => {
    const newAutoPlay = !autoPlay;
    setAutoPlay(newAutoPlay);
    saveAudioSettings({ autoPlay: newAutoPlay });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // P: Play audio (works on both stages)
      if (key === 'p') {
        e.preventDefault();
        void handlePlayAudio();
        return;
      }

      // Space or Enter: Reveal answer (only when not revealed)
      if (!revealed && (key === ' ' || key === 'enter')) {
        e.preventDefault();
        handleReveal();
        return;
      }

      // When revealed, handle answer shortcuts
      if (revealed) {
        // Incorrect: X
        if (key === 'x') {
          e.preventDefault();
          handleAnswer(0);
          return;
        }

        // Correct: Space, Enter
        if (key === ' ' || key === 'enter') {
          e.preventDefault();
          handleAnswer(3);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealed, handleAnswer]);

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
            <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-18 mb-8 text-center shadow-lg h-64 flex items-center justify-center">
              <div className="text-6xl font-bold text-indigo-900">{character.romaji}</div>

              {/* Floating audio controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handlePlayAudio}
                  disabled={isPlaying}
                  className="p-2 bg-white/90 hover:bg-white text-indigo-600 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Play pronunciation"
                  title="Play pronunciation (P or A)"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
                  </svg>
                </button>
                <button
                  onClick={toggleAutoPlay}
                  className={`px-3 py-2 rounded-lg shadow-md transition-all text-xs font-semibold ${
                    autoPlay
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-white/90 hover:bg-white text-gray-600'
                  }`}
                  aria-label={autoPlay ? 'Disable auto-play' : 'Enable auto-play'}
                  title={autoPlay ? 'Auto-play enabled' : 'Auto-play disabled'}
                >
                  {autoPlay ? 'Auto ON' : 'Auto OFF'}
                </button>
              </div>
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
            {/* Hiragana character */}
            <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-12 mb-8 text-center shadow-lg h-64 flex flex-col items-center justify-center">
              <div className="text-8xl font-bold text-green-900">{character.hiragana}</div>
              <div className="text-lg text-gray-600 mt-4">{character.romaji}</div>

              {/* Floating audio controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handlePlayAudio}
                  disabled={isPlaying}
                  className="p-2 bg-white/90 hover:bg-white text-green-600 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Play pronunciation"
                  title="Play pronunciation (P or A)"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
                  </svg>
                </button>
                <button
                  onClick={toggleAutoPlay}
                  className={`px-3 py-2 rounded-lg shadow-md transition-all text-xs font-semibold ${
                    autoPlay
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-white/90 hover:bg-white text-gray-600'
                  }`}
                  aria-label={autoPlay ? 'Disable auto-play' : 'Enable auto-play'}
                  title={autoPlay ? 'Auto-play enabled' : 'Auto-play disabled'}
                >
                  {autoPlay ? 'Auto ON' : 'Auto OFF'}
                </button>
              </div>
            </div>

            {/* Self-assessment buttons */}
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4 font-medium h-12 flex items-center justify-center">
                Did you write it correctly?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleAnswer(0)}
                  className="flex-1 max-w-xs px-8 py-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors text-xl"
                >
                  ✕ Incorrect
                </button>
                <button
                  onClick={() => handleAnswer(3)}
                  className="flex-1 max-w-xs px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-xl"
                >
                  ○ Correct
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Keyboard: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">P</kbd> play audio
                • <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">X</kbd> Incorrect •{' '}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space/Enter</kbd> Correct
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PromptCard;

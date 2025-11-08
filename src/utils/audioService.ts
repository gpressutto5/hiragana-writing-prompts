/**
 * Audio service for playing hiragana pronunciation
 * Uses HTML5 Audio API with Google Translate TTS for Japanese pronunciation
 */

const AUDIO_CACHE_KEY = 'hiragana_audio_cache';
const AUDIO_SETTINGS_KEY = 'hiragana_audio_settings';

export interface AudioSettings {
  autoPlay: boolean;
}

/**
 * Get audio settings from localStorage
 */
export const getAudioSettings = (): AudioSettings => {
  try {
    const stored = localStorage.getItem(AUDIO_SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored) as AudioSettings;
    }
  } catch (error) {
    console.error('Error reading audio settings:', error);
  }
  return { autoPlay: false };
};

/**
 * Save audio settings to localStorage
 */
export const saveAudioSettings = (settings: AudioSettings): void => {
  try {
    localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving audio settings:', error);
  }
};

/**
 * Generate audio URL for a hiragana character
 * Uses Google Translate TTS API for Japanese pronunciation
 */
const getAudioUrl = (hiragana: string): string => {
  const encodedText = encodeURIComponent(hiragana);
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodedText}`;
};

/**
 * Play pronunciation audio for a hiragana character
 * Returns a promise that resolves when audio finishes playing or rejects on error
 */
export const playPronunciation = (hiragana: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const audio = new Audio(getAudioUrl(hiragana));

      audio.addEventListener('ended', () => resolve());
      audio.addEventListener('error', error => {
        console.error('Error playing audio:', error);
        reject(new Error('Failed to play audio'));
      });

      audio.play().catch(error => {
        console.error('Error starting playback:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error creating audio:', error);
      reject(error);
    }
  });
};

/**
 * Preload audio for a character (for better performance)
 * Returns true if preload was successful, false otherwise
 */
export const preloadAudio = (hiragana: string): boolean => {
  try {
    const audio = new Audio(getAudioUrl(hiragana));
    audio.preload = 'auto';
    return true;
  } catch (error) {
    console.error('Error preloading audio:', error);
    return false;
  }
};

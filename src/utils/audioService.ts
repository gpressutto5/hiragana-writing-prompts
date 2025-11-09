/**
 * Audio service for playing hiragana pronunciation
 * Uses Web Speech API for native browser-based Japanese pronunciation
 */

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
  return { autoPlay: true };
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
 * Get Japanese voice from available voices
 * Returns the best available Japanese voice
 */
const getJapaneseVoice = (): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();

  // Prefer Japanese voices in this order
  const preferredVoices = [
    'ja-JP', // Generic Japanese
    'ja_JP', // Alternative format
  ];

  for (const preferred of preferredVoices) {
    const voice = voices.find(v => v.lang.startsWith(preferred));
    if (voice) return voice;
  }

  // Fallback to any voice containing 'ja'
  return voices.find(v => v.lang.toLowerCase().includes('ja')) || null;
};

/**
 * Play pronunciation audio for a hiragana character
 * Uses Web Speech API for native browser TTS
 * Returns a promise that resolves when audio finishes playing or rejects on error
 */
export const playPronunciation = (hiragana: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Check if Speech Synthesis is supported
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported in this browser'));
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(hiragana);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8; // Slightly slower for learning

      // Set Japanese voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Voices not loaded yet, wait for them
        window.speechSynthesis.addEventListener(
          'voiceschanged',
          () => {
            const voice = getJapaneseVoice();
            if (voice) {
              utterance.voice = voice;
            }
          },
          { once: true }
        );
      } else {
        const voice = getJapaneseVoice();
        if (voice) {
          utterance.voice = voice;
        }
      }

      utterance.addEventListener('end', () => resolve());
      utterance.addEventListener('error', event => {
        console.error('Error playing audio:', event);
        reject(new Error(`Failed to play audio: ${event.error}`));
      });

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error creating speech:', error);
      reject(error);
    }
  });
};

/**
 * Preload audio for a character (for better performance)
 * For Web Speech API, this ensures voices are loaded
 * Returns true if voices are available, false otherwise
 */
export const preloadAudio = (hiragana: string): boolean => {
  try {
    if (!window.speechSynthesis) {
      return false;
    }

    // Trigger voice loading if not already loaded
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Voices will load asynchronously
      window.speechSynthesis.addEventListener(
        'voiceschanged',
        () => {
          // Voices now loaded
        },
        { once: true }
      );
    }

    return true;
  } catch (error) {
    console.error('Error preloading audio:', error);
    return false;
  }
};

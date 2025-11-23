interface AudioControlsPanelProps {
  /** Handler for play audio button */
  onPlayAudio: () => void;
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Handler for auto-play toggle */
  onToggleAutoPlay: () => void;
  /** Whether auto-play is enabled */
  autoPlay: boolean;
}

/**
 * Shared audio controls panel component
 * Displays play button and auto-play toggle in a floating panel
 */
export const AudioControlsPanel = ({
  onPlayAudio,
  isPlaying,
  onToggleAutoPlay,
  autoPlay,
}: AudioControlsPanelProps) => {
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={onPlayAudio}
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
        onClick={onToggleAutoPlay}
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
  );
};

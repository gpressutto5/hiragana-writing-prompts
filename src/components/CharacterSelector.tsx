import { useState, useMemo } from 'react';
import { groups } from '../data/hiragana';
import { wordsData } from '../data/words';
import { canEnableWordMode, getAvailableWordCount } from '../utils/wordFilter';
import type { CharacterSelectorProps, HiraganaGroupId } from '../types';

function CharacterSelector({
  onStart,
  allCharacters,
  practiceMode,
  setPracticeMode,
}: CharacterSelectorProps) {
  const [selectedGroups, setSelectedGroups] = useState<Set<HiraganaGroupId>>(new Set());
  const [selectedCharIds, setSelectedCharIds] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: HiraganaGroupId) => {
    const newSelectedGroups = new Set(selectedGroups);
    const groupChars = allCharacters.filter(char => char.group === groupId);

    if (newSelectedGroups.has(groupId)) {
      // Deselect group
      newSelectedGroups.delete(groupId);
      const newSelectedCharIds = new Set(selectedCharIds);
      groupChars.forEach(char => newSelectedCharIds.delete(char.id));
      setSelectedCharIds(newSelectedCharIds);
    } else {
      // Select group
      newSelectedGroups.add(groupId);
      const newSelectedCharIds = new Set(selectedCharIds);
      groupChars.forEach(char => newSelectedCharIds.add(char.id));
      setSelectedCharIds(newSelectedCharIds);
    }

    setSelectedGroups(newSelectedGroups);
  };

  const selectAll = () => {
    setSelectedGroups(new Set(groups.map(g => g.id)));
    setSelectedCharIds(new Set(allCharacters.map(c => c.id)));
  };

  const deselectAll = () => {
    setSelectedGroups(new Set());
    setSelectedCharIds(new Set());
  };

  // Compute word-related values
  const wordModeEnabled = useMemo(
    () => canEnableWordMode(selectedCharIds.size),
    [selectedCharIds.size]
  );

  const availableWordCount = useMemo(() => {
    const selectedChars = allCharacters.filter(char => selectedCharIds.has(char.id));
    return getAvailableWordCount(wordsData, selectedChars);
  }, [selectedCharIds, allCharacters]);

  // Automatically switch to characters mode if word modes become unavailable
  const handleModeChange = (mode: typeof practiceMode) => {
    if (!wordModeEnabled && (mode === 'words' || mode === 'both')) {
      return; // Don't allow switching to word modes when disabled
    }
    setPracticeMode(mode);
  };

  const handleStart = () => {
    const selectedChars = allCharacters.filter(char => selectedCharIds.has(char.id));
    onStart(selectedChars);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Characters to Practice</h2>
      <p className="text-gray-600 mb-6">
        Choose the hiragana characters you want to practice. You can select entire groups or
        individual characters.
      </p>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={selectAll}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Select All
        </button>
        <button
          onClick={deselectAll}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Deselect All
        </button>
      </div>

      {/* Group selection */}
      <div className="space-y-3 mb-8">
        {groups.map(group => (
          <div
            key={group.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedGroups.has(group.id)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => toggleGroup(group.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{group.name}</h3>
                <p className="text-sm text-gray-500">{group.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {allCharacters.filter(c => c.group === group.id).length} characters
                </span>
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selectedGroups.has(group.id)
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedGroups.has(group.id) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Practice Mode Selection */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Practice Mode:</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded hover:bg-gray-100 transition-colors">
            <input
              type="radio"
              name="practiceMode"
              checked={practiceMode === 'characters'}
              onChange={() => handleModeChange('characters')}
              className="w-4 h-4 text-indigo-600"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-800">Characters Only</span>
              <p className="text-sm text-gray-500">Practice individual hiragana characters</p>
            </div>
          </label>

          <label
            className={`flex items-center gap-3 p-3 rounded transition-colors ${
              wordModeEnabled ? 'cursor-pointer hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <input
              type="radio"
              name="practiceMode"
              checked={practiceMode === 'words'}
              onChange={() => handleModeChange('words')}
              disabled={!wordModeEnabled}
              className="w-4 h-4 text-indigo-600"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-800">Words Only</span>
              <p className="text-sm text-gray-500">
                Practice complete words ({availableWordCount} available)
              </p>
              {!wordModeEnabled && (
                <p className="text-xs text-amber-600 mt-1">Select at least 10 characters</p>
              )}
            </div>
          </label>

          <label
            className={`flex items-center gap-3 p-3 rounded transition-colors ${
              wordModeEnabled ? 'cursor-pointer hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <input
              type="radio"
              name="practiceMode"
              checked={practiceMode === 'both'}
              onChange={() => handleModeChange('both')}
              disabled={!wordModeEnabled}
              className="w-4 h-4 text-indigo-600"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-800">Both</span>
              <p className="text-sm text-gray-500">
                Alternate between characters and words (50/50)
              </p>
              {!wordModeEnabled && (
                <p className="text-xs text-amber-600 mt-1">Select at least 10 characters</p>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Selected count and start button */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          <span className="font-semibold text-indigo-600">{selectedCharIds.size}</span> characters
          selected
        </div>
        <button
          onClick={handleStart}
          disabled={selectedCharIds.size === 0}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Practice →
        </button>
      </div>
    </div>
  );
}

export default CharacterSelector;

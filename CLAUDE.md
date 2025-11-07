# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting Development
```bash
npm run dev          # Start Vite dev server at http://localhost:5173
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on all files
```

### Linting
- ESLint is configured with React Hooks and React Refresh plugins
- Unused vars starting with uppercase or underscore are allowed
- Fix linting issues before committing

## Architecture Overview

### Application Structure

This is a React single-page application for practicing hiragana writing with three main views:

1. **Character Selector** (`CharacterSelector.jsx`): UI for selecting hiragana groups to practice
2. **Practice Mode** (`PromptCard.jsx`): Random prompt display with reveal/answer workflow
3. **Statistics View** (`Statistics.jsx`): Progress tracking and performance analytics

### State Management Pattern

**App.jsx** is the central state controller:
- `view`: Controls which screen is displayed ('selector', 'practice', 'stats')
- `selectedCharacters`: Array of character objects user wants to practice
- `currentCharacter`: The character currently being shown
- `recentCharacters`: Last 3 shown characters (prevents immediate repetition)

**Smart randomization**: Characters are selected from `selectedCharacters` while excluding those in `recentCharacters` to avoid showing the same character consecutively.

### Data Layer

**hiraganaData** (`src/data/hiragana.js`):
- Master array of 92 hiragana character objects
- Each object: `{ id, hiragana, romaji, group, row }`
- Groups organized by Japanese row system (vowels, k-row, s-row, etc.)
- Includes basic characters, dakuten (゛), and handakuten (゜)

### Progress Tracking System

**progressTracker.js** uses localStorage with key `'hiragana_progress'`:

```javascript
// Storage structure
{
  "characterId": {
    attempts: number,
    correct: number,
    lastAttempt: ISO timestamp,
    history: [{ timestamp, correct }, ...]
  }
}
```

**Key functions**:
- `saveAttempt(characterId, isCorrect)`: Records each practice attempt
- `getCharacterStats(characterId)`: Returns stats for specific character
- `getOverallStats()`: Aggregates all progress data
- `resetProgress()`: Clears all stored data

All progress is client-side only—no backend or authentication.

### Component Communication Flow

```
App.jsx
  ├─> CharacterSelector: receives hiraganaData, calls startPractice(characters)
  ├─> PromptCard: receives currentCharacter, calls handleAnswer(isCorrect), nextCharacter()
  └─> Statistics: independently reads from progressTracker
```

**Navigation** is tab-based with conditional rendering based on `view` state.

## Styling Approach

- **Tailwind CSS**: All styling uses utility classes
- **Design system**: Indigo color scheme with gradient backgrounds
- **Responsive**: Mobile-first approach with responsive utilities
- **No custom CSS modules**: Component-specific styles in `App.css` are minimal

## Development Patterns

### When Adding Features

1. **New characters/groups**: Add to `hiraganaData` array following existing structure
2. **New statistics**: Create new aggregation functions in `progressTracker.js`
3. **New views**: Add new view state to App.jsx and conditional rendering
4. **UI components**: Follow existing pattern of Tailwind utility classes

### State Updates

- All character selection flows through `startPractice()`
- Practice navigation uses `nextCharacter()` with anti-repetition logic
- Progress is saved immediately on answer via `handleAnswer()`

### localStorage Considerations

- All reads/writes wrapped in try-catch
- Functions return sensible defaults on error
- No user accounts—progress tied to browser/device
- `resetProgress()` is available for clearing data

## Testing Approach

Currently no automated tests. Manual testing workflow:

1. Select various character groups
2. Verify randomization doesn't repeat immediately
3. Check statistics update correctly after attempts
4. Test localStorage persistence across sessions
5. Verify mobile responsiveness

## Known Patterns

### Anti-Repetition Logic
```javascript
// In nextCharacter()
const availableChars = chars.filter(
  char => !recentCharacters.includes(char.id)
);
// Falls back to full set if all filtered out
```

### Success Rate Calculation
Always check for division by zero:
```javascript
successRate = attempts > 0 ? (correct / attempts) * 100 : 0
```

### Group-Based Selection
Characters can be filtered by `group` property to get all characters in a row:
```javascript
hiraganaData.filter(char => char.group === 'k-row')
```

## Future Considerations

The README lists potential enhancements:
- Stroke order diagrams
- Spaced repetition algorithm
- Katakana support
- Audio pronunciation
- Combination characters (きゃ, etc.)
- Dark mode

When implementing these, maintain the existing architecture patterns and localStorage-based persistence approach.

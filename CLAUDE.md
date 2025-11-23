# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting Development

```bash
npm run dev           # Start Vite dev server at http://localhost:5173
npm run build         # Build for production (outputs to dist/)
npm run preview       # Preview production build locally
npm run lint          # Run ESLint on all files
npm run type-check    # Run TypeScript type checking
npm run format        # Format all files with Prettier
npm run format:check  # Check if files are formatted
```

### TypeScript Configuration

- Project uses strict TypeScript with `noImplicitAny` and `strictNullChecks` enabled
- All types defined in `src/types/index.ts`
- tsconfig.json configured with strict mode and additional checks
- No `any` types allowed - use proper typing

### Code Formatting

- **Prettier** is configured for consistent code formatting
- Configuration in `.prettierrc.json`:
  - Single quotes for strings
  - Semicolons required
  - 100 character line width
  - 2 spaces for indentation
  - ES5 trailing commas
- Files automatically formatted on save via hooks

### Linting and Quality Checks

- **ESLint** is configured with React Hooks and React Refresh plugins
- Unused vars starting with uppercase or underscore are allowed
- **Automated hooks** run after every file edit:
  1. Prettier formats the file
  2. ESLint fixes any remaining issues
  3. TypeScript checks types across project
- Fix all linting, formatting, and type errors before committing

## Architecture Overview

### Application Structure

This is a React + TypeScript single-page application for practicing **hiragana and katakana** writing with three main views:

1. **Character Selector** (`CharacterSelector.tsx`): UI for selecting script (hiragana/katakana) and character groups to practice
2. **Practice Mode** (`PromptCard.tsx`): Displays romaji prompts for users to write characters on paper, then reveals correct character for self-assessment
3. **Statistics View** (`Statistics.tsx`): Progress tracking and performance analytics with script filtering

### Practice Workflow

The app prompts users to practice **writing** hiragana or katakana characters:

1. User selects **script** (hiragana or katakana) in Character Selector
2. App displays **romaji** (e.g., "ka")
3. User **writes the character** (か or カ) on paper/notebook
4. User clicks **"Reveal"**
5. App shows the **correct character**
6. User **self-assesses** if they wrote it correctly (clicks ✓ or ✗)
7. Progress is tracked in localStorage with script-specific IDs

This is a writing practice tool, not a reading/recognition quiz. The app shows romaji prompts so users can practice drawing the correct characters.

### State Management Pattern

**App.tsx** is the central state controller:

- `view`: Controls which screen is displayed ('selector', 'practice', 'stats')
- `script`: Current script selection ('hiragana' or 'katakana')
- `selectedCharacters`: Array of character objects user wants to practice
- `currentCharacter`: The character currently being shown
- `recentCharacters`: Last 3 shown characters (prevents immediate repetition)
- `allCharacters`: Computed from script selection (hiraganaData or katakanaData)

**Smart randomization**: Characters are selected from `selectedCharacters` while excluding those in `recentCharacters` to avoid showing the same character consecutively.

### Data Layer

**Character Data**:

- **hiraganaData** (`src/data/hiragana.ts`): 92 hiragana character objects
- **katakanaData** (`src/data/katakana.ts`): 92 katakana character objects
- Each object typed as `HiraganaCharacter`: `{ id: string, hiragana: string, romaji: string, group: HiraganaGroupId, row: HiraganaRowId }`
- Character IDs are script-prefixed: hiragana uses simple IDs (e.g., 'a', 'ka'), katakana uses 'katakana\_' prefix (e.g., 'katakana_a', 'katakana_ka')
- Groups organized by Japanese row system (vowels, k-row, s-row, etc.)
- Includes basic characters, dakuten (゛), handakuten (゜), and yōon combinations

### Type System

**All types defined in** (`src/types/index.ts`):

- `Script`: Union type 'hiragana' | 'katakana' for script selection
- `HiraganaCharacter`: Individual character with id, hiragana, romaji, group, row (used for both scripts)
- `HiraganaGroupId`: Union type of all valid group IDs
- `HiraganaRowId`: Union type of all valid row IDs
- `ProgressData`: Dictionary mapping character IDs to progress
- `CharacterProgress`: Attempts, correct count, last attempt, history
- `CharacterStats`: Aggregated stats with success rate
- `OverallStats`: App-wide statistics
- `ViewType`: Union of 'selector' | 'practice' | 'stats'

### Progress Tracking System

**progressTracker.ts** uses localStorage with key `'hiragana_progress'`:

```typescript
// Storage structure - ProgressData type
{
  "characterId": {  // e.g., 'a' for hiragana, 'katakana_a' for katakana
    attempts: number,
    correct: number,
    lastAttempt: string | null,
    history: AttemptHistory[]
  }
}
```

**Key functions**:

- `saveAttempt(characterId, isCorrect)`: Records each practice attempt
- `getCharacterStats(characterId)`: Returns stats for specific character
- `getOverallStats()`: Aggregates all progress data (both scripts)
- `getOverallStatsByScript(script)`: Aggregates progress for specific script
- `getRecentAttemptsByScript(script, limit)`: Gets recent attempts filtered by script
- `resetProgress()`: Clears all stored data

**Script Separation**: Character IDs are naturally separated by prefix, so both scripts share the same localStorage key but maintain separate progress tracking. The Statistics view can filter by script to show hiragana-only, katakana-only, or combined statistics.

All progress is client-side only—no backend or authentication.

### Component Communication Flow

```
App.tsx
  ├─> CharacterSelector: receives allCharacters, script, setScript, calls onStart(characters)
  ├─> PromptCard: receives currentCharacter: HiraganaCharacter, calls onAnswer(isCorrect), onBack()
  └─> Statistics: independently reads from progressTracker, filters by script
```

All component props are strictly typed via interfaces defined in `src/types/index.ts`.

**Navigation** is tab-based with conditional rendering based on `view` state.

## Styling Approach

- **Tailwind CSS**: All styling uses utility classes
- **Design system**: Indigo color scheme with gradient backgrounds
- **Responsive**: Mobile-first approach with responsive utilities
- **No custom CSS modules**: Component-specific styles in `App.css` are minimal

## Development Patterns

### When Adding Features

1. **New characters/groups**: Add to `hiraganaData` array following existing structure, update types if needed
2. **New statistics**: Create new aggregation functions in `progressTracker.ts` with proper return types
3. **New views**: Add new view to `ViewType` union in types, update App.tsx conditional rendering
4. **UI components**: Follow existing pattern of Tailwind utility classes, create prop interface in types
5. **Type changes**: Update `src/types/index.ts` first, then implementation files

### TypeScript Patterns

- **Import types**: Use `import type` for type-only imports
- **Strict null checks**: Always handle `null` and `undefined` cases
- **No `any`**: Use proper types, union types, or `unknown` if truly dynamic
- **Props typing**: Create interfaces in `src/types/index.ts` for all component props
- **Function typing**: Always specify parameter and return types
- **Array access**: Handle potential `undefined` from array indexing due to `noUncheckedIndexedAccess`

### State Updates

- All character selection flows through `startPractice(characters: HiraganaCharacter[])`
- Practice navigation uses `nextCharacter(chars: HiraganaCharacter[] = selectedCharacters)` with anti-repetition logic
- Progress is saved immediately on answer via `handleAnswer(isCorrect: boolean)`

### localStorage Considerations

- All reads/writes wrapped in try-catch
- Functions return sensible defaults on error
- No user accounts—progress tied to browser/device
- `resetProgress()` is available for clearing data

## Testing Approach

Currently no automated tests. Manual testing workflow:

1. Select various character groups
2. Verify romaji prompts are displayed correctly
3. Verify reveal shows correct hiragana characters
4. Check that randomization doesn't repeat immediately
5. Test both ✓ and ✗ buttons update statistics correctly
6. Test localStorage persistence across sessions
7. Verify mobile responsiveness

## Continuous Integration

### GitHub Actions Workflow

The project includes an automated CI workflow (`.github/workflows/ci.yml`) that runs on:

- Push to `main` branch
- Pull requests to `main` branch

### CI Checks

The workflow runs the following quality checks in order:

1. **Prettier Format Check** (`npm run format:check`)
   - Verifies all files follow formatting rules
   - Fails if any files need formatting

2. **ESLint** (`npm run lint`)
   - Checks for code quality issues
   - Enforces React best practices

3. **TypeScript Type Check** (`npm run type-check`)
   - Validates all types across the project
   - Ensures strict type safety

4. **Build** (`npm run build`)
   - Verifies the project builds successfully
   - Catches any build-time errors

5. **Artifact Upload**
   - Uploads build output (`dist/`) as workflow artifact
   - Retained for 7 days for review

All checks must pass for the workflow to succeed. The CI badge in the README shows the current status.

## Continuous Deployment

### Deployment Target

The project is deployed to **Vercel** with automatic deployments on every push to `main` and preview deployments for every PR.

**Production URL:** https://kana-writing-prompts.vercel.app

### Vercel Deployment

**Setup via Vercel Dashboard:**

1. Connected to GitHub repository at [vercel.com](https://vercel.com)
2. Auto-detects Vite configuration
3. Deploys `main` branch to production
4. Creates preview deployments for every PR

**Build Settings:**

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**PR Preview Workflow:**

- Every PR gets a unique preview URL (e.g., `https://kana-writing-prompts-git-feature-*.vercel.app`)
- Vercel bot comments on PRs with preview links
- Previews update automatically on new commits
- Previews are deleted when PR is closed/merged

### Vite Configuration

The `vite.config.js` uses the default root path (`/`) for all deployments:

- **Vercel**: Uses root path for production and preview deployments
- **Local Dev**: Uses root path for development server
- Automatically handles asset loading for all environments

## Known Patterns

### Anti-Repetition Logic

```typescript
// In nextCharacter()
const availableChars: HiraganaCharacter[] = chars.filter(
  char => !recentCharacters.includes(char.id)
);
// Falls back to full set if all filtered out
```

### Success Rate Calculation

Always check for division by zero:

```typescript
successRate = attempts > 0 ? (correct / attempts) * 100 : 0;
```

### Group-Based Selection

Characters can be filtered by `group` property to get all characters in a row:

```typescript
hiraganaData.filter(char => char.group === 'k-row');
```

### Null Safety Pattern

Due to strict null checks, always handle potential null/undefined:

```typescript
const randomChar = getRandomCharacter(charsToUse);
if (!randomChar) return; // Guard clause
setCurrentCharacter(randomChar);
```

## Future Considerations

The README lists potential enhancements:

- Stroke order diagrams
- Practice sessions with time limits
- Export/import progress data
- Dark mode

When implementing these, maintain the existing architecture patterns and localStorage-based persistence approach.

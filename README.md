# Kana Writing Practice App

[![CI](https://github.com/gpressutto5/kana-writing-prompts/actions/workflows/ci.yml/badge.svg)](https://github.com/gpressutto5/kana-writing-prompts/actions/workflows/ci.yml)

A simple, focused web app for practicing hiragana and katakana writing through random prompts and self-assessment.

**🚀 [Try it live on Vercel](https://kana-writing-prompts.vercel.app)**

## Features

### Core Features

- ✅ **Script Selection**: Choose between hiragana or katakana practice
- ✅ **Character Selection**: Choose which characters you want to practice
- ✅ **Group Selection**: Select entire rows (vowels, ka-row, sa-row, etc.) at once
- ✅ **Random Prompts**: Displays random romaji from your selected characters
- ✅ **Smart Randomization**: Avoids showing the same character repeatedly
- ✅ **Reveal & Check**: Click to reveal the correct character, then self-assess
- ✅ **Progress Tracking**: Automatically saves your practice history to localStorage
- ✅ **Statistics Dashboard**: View your overall performance and per-character stats
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

### Character Coverage

- Complete hiragana and katakana charts (92 characters each)
- Basic characters (a, i, u, e, o, ka, ki, ku, ke, ko, etc.)
- Dakuten characters (ga, gi, gu, ge, go, etc.)
- Handakuten characters (pa, pi, pu, pe, po)
- Yōon combinations (kya, kyu, kyo, etc.)

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (or compatible version)
- npm (comes with Node.js)

### Installation

1. Clone the repository or navigate to the project directory:

   ```bash
   cd kana-writing-prompts
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

### Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

### Deployment

This project is automatically deployed to Vercel on every push to the `main` branch. The live version is available at:
https://kana-writing-prompts.vercel.app

Vercel also creates preview deployments for every pull request, allowing you to test changes before merging.

## How to Use

### Step 1: Select Characters

1. Click on "Select Characters" tab
2. Choose your script (hiragana or katakana)
3. Choose the character groups you want to practice
4. Click "Start Practice" when ready

### Step 2: Practice

1. A random romaji will be displayed (e.g., "ka")
2. Write the corresponding character in your notebook
3. Click "Reveal Answer" to see the correct character
4. Mark whether you got it correct or incorrect
5. Continue with the next character

### Step 3: Track Progress

1. Click on "Statistics" tab to view your performance
2. See overall success rate and total attempts
3. View per-character statistics to identify characters needing more practice
4. Characters with lower success rates appear first in the list

## Project Structure

```
kana-writing-prompts/
├── src/
│   ├── components/          # React components (TypeScript)
│   │   ├── CharacterSelector.tsx
│   │   ├── PromptCard.tsx
│   │   └── Statistics.tsx
│   ├── data/                # Character data
│   │   ├── hiragana.ts
│   │   └── katakana.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── progressTracker.ts
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles (Tailwind)
│   └── main.tsx             # Application entry point
├── .github/
│   └── workflows/           # GitHub Actions CI/CD
│       ├── ci.yml           # Continuous integration checks
│       └── claude.yml       # Claude Code automation
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.js           # Vite configuration
├── .prettierrc.json         # Prettier configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Technology Stack

- **React 19**: UI framework
- **TypeScript**: Strict type safety and better developer experience
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **localStorage**: Client-side progress persistence

## Features in Detail

### Progress Tracking

- All practice sessions are automatically saved to browser localStorage
- Tracks attempts, correct answers, and success rate per character
- Maintains history of all attempts with timestamps
- Data persists across sessions (doesn't require login)

### Statistics

- **Overall Stats**: Total attempts, correct answers, success rate, characters studied
- **Per-Character Stats**: Individual success rates with visual progress bars
- **Color-coded Performance**: Green (80%+), Yellow (50-79%), Red (<50%)
- **Reset Progress**: Option to clear all data and start fresh

### Smart Randomization

- Avoids showing the same character multiple times in a row
- Maintains a history of recently shown characters
- Ensures variety in practice sessions

## Tips for Effective Practice

1. **Start Small**: Begin with 1-2 character groups and expand as you improve
2. **Practice Daily**: Short, consistent practice sessions are more effective
3. **Focus on Weak Characters**: Use the statistics to identify characters needing more practice
4. **Write by Hand**: Actually writing the characters (not just thinking about them) reinforces memory
5. **Review Regularly**: Practice characters you've already learned to maintain proficiency

## Future Enhancement Ideas

- [x] Keyboard shortcuts for faster interaction
- [x] Add calendar view for tracking daily practice streaks
- [ ] Stroke order diagrams for visual reference
- [x] Spaced repetition algorithm for optimal practice scheduling
- [ ] Practice sessions with time limits
- [x] Support for katakana characters
- [x] Audio pronunciation for each character
- [x] Combination characters (yōon: きゃ, きゅ, きょ, etc.)
- [ ] Export/import progress data
- [ ] Dark mode toggle

## Contributing

This is a personal learning project, but suggestions and improvements are welcome!

## License

MIT License - feel free to use this for your own learning or projects.

## Acknowledgments

Built for Japanese language learners who want to master hiragana and katakana through consistent, focused practice. がんばって! (Ganbatte! / Good luck!)

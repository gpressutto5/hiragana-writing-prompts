# Hiragana Writing Practice App

A simple, focused web app for practicing hiragana writing through random prompts and self-assessment.

## Features

### Core Features
- ✅ **Character Selection**: Choose which hiragana characters you want to practice
- ✅ **Group Selection**: Select entire rows (vowels, ka-row, sa-row, etc.) at once
- ✅ **Random Prompts**: Displays random romaji from your selected characters
- ✅ **Smart Randomization**: Avoids showing the same character repeatedly
- ✅ **Reveal & Check**: Click to reveal the correct hiragana, then self-assess
- ✅ **Progress Tracking**: Automatically saves your practice history to localStorage
- ✅ **Statistics Dashboard**: View your overall performance and per-character stats
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

### Character Coverage
- Complete hiragana chart (all 92 characters)
- Basic characters (a, i, u, e, o, ka, ki, ku, ke, ko, etc.)
- Dakuten characters (ga, gi, gu, ge, go, etc.)
- Handakuten characters (pa, pi, pu, pe, po)

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (or compatible version)
- npm (comes with Node.js)

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd hiragana-writing-prompts
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

## How to Use

### Step 1: Select Characters
1. Click on "Select Characters" tab
2. Choose the hiragana groups you want to practice
3. Click "Start Practice" when ready

### Step 2: Practice
1. A random romaji will be displayed (e.g., "ka")
2. Write the corresponding hiragana in your notebook
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
hiragana-writing-prompts/
├── src/
│   ├── components/          # React components
│   │   ├── CharacterSelector.jsx
│   │   ├── PromptCard.jsx
│   │   └── Statistics.jsx
│   ├── data/                # Hiragana character data
│   │   └── hiragana.js
│   ├── utils/               # Utility functions
│   │   └── progressTracker.js
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles (Tailwind)
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Technology Stack

- **React 19**: UI framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
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

- [ ] Keyboard shortcuts for faster interaction
- [ ] Stroke order diagrams for visual reference
- [ ] Spaced repetition algorithm for optimal practice scheduling
- [ ] Practice sessions with time limits
- [ ] Support for katakana characters
- [ ] Audio pronunciation for each character
- [ ] Combination characters (きゃ, きゅ, きょ, etc.)
- [ ] Export/import progress data
- [ ] Dark mode toggle

## Contributing

This is a personal learning project, but suggestions and improvements are welcome!

## License

MIT License - feel free to use this for your own learning or projects.

## Acknowledgments

Built for Japanese language learners who want to master hiragana through consistent, focused practice. がんばって! (Ganbatte! / Good luck!)

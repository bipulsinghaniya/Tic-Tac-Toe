# 🎮 Tic-Tac-Toe

A beautifully designed Tic-Tac-Toe game built with **React 19 + Vite + Tailwind CSS**. Play against a friend on the same device, or challenge an **unbeatable Minimax AI**.

---

## ✨ Features

- **Two Game Modes**
  - 👥 **Player vs Player** — Two humans on the same device
  - 🤖 **Player vs Computer** — Face a perfectly-playing Minimax AI
- **Minimax AI** — The AI evaluates every possible game state and always picks the optimal move (truly unbeatable)
- **Score Tracking** — X wins, O wins, and Draws are tracked across rounds without resetting
- **Animated Winning Line** — The winning cells are highlighted with a glowing violet accent
- **Result Banner** — Instant feedback on win or draw with Play Again / Change Mode buttons
- **AI Thinking Delay** — A brief 420 ms pause simulates the computer "thinking"
- **Dark Glassmorphic UI** — Deep dark background with glowing neon cyan and violet accents
- **Fully Responsive** — Works great on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI & state management |
| Vite 8 | Lightning-fast dev server & bundler |
| Tailwind CSS 4 | Utility-first styling |
| JavaScript (ES6+) | Minimax algorithm & game logic |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation & Development

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd TicTacToe

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview the production build locally
```

---

## 📁 Project Structure

```
TicTacToe/
├── public/              ← Static assets
├── src/
│   ├── App.jsx          ← Full game: Minimax AI, Cell, ScoreCard, game logic
│   ├── App.css          ← Custom animations (fade-up, cell-pop, cell-win)
│   ├── index.css        ← Tailwind base imports
│   └── main.jsx         ← React entry point
├── index.html           ← HTML template
├── vite.config.js       ← Vite + Tailwind plugin config
└── package.json
```

---

## 🧠 How the Minimax AI Works

The AI uses the classic **Minimax algorithm** — a recursive decision-making algorithm that:

1. Simulates all possible future moves from the current board state
2. Assigns a score to each terminal state (+10 for AI win, -10 for player win, 0 for draw)
3. Picks the move with the **highest score** for the AI and assumes the human always plays **optimally** too
4. Includes a **depth penalty** so it prefers winning sooner and losing later

> The AI cannot be beaten — the best outcome for the human player is a draw.

---

## 🎮 How to Play

1. **Choose a mode** on the home screen (PvP or vs AI)
2. **Click an empty cell** to place your mark
3. **First to get 3 in a row** (row, column, or diagonal) wins
4. Use **Play Again** to start a new round (scores persist)
5. Use **Change Mode** to return to the home screen

---

## 🌐 Live Demo

> 🔗 **[Add your deployment link here]**

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">Built with 🎮 React · Vite · Tailwind CSS · © 2026</p>

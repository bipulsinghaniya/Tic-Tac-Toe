# Tic-Tac-Toe

A stylish React + Vite browser game featuring classic Tic-Tac-Toe gameplay with two modes:

- Player vs Player (same device)
- Player vs Computer (unbeatable AI using the Minimax algorithm)

The app includes a score tracker, replay flow, responsive layout, and modern neon interface.

## Features

- Two game modes: local multiplayer and single-player vs AI
- Unbeatable computer opponent powered by Minimax
- Scoreboard with wins and draws
- Move highlight for winning combinations
- Reset board and change mode interactions
- Responsive UI for desktop and mobile screens
- Built with React and Vite for a fast development experience

## Tech Stack

- React 19
- Vite
- JavaScript
- CSS for styling

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18 or later
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TicTacToe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Run the app

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```
Runs the app in development mode.

```bash
npm run build
```
Builds the app for production.

```bash
npm run preview
```
Serves the production build locally for preview.

```bash
npm run lint
```
Runs the project linter.

## Game Rules

- Player X goes first in both modes.
- In Player vs Computer mode, the computer plays as O.
- A player wins by placing three matching marks in a row, column, or diagonal.
- If the board fills up without a winner, the round ends in a draw.

## Project Structure

```bash
.
├── index.html
├── package.json
├── vite.config.js
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── README.md
```

## Notes

The AI uses a minimax-based decision strategy to ensure it always chooses the optimal move, making it difficult to beat.

## License

This project is available for educational and personal use.

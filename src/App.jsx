import { useState, useEffect, useCallback } from 'react'

// ── WINNING LINES ──────────────────────────────────────────────────────────
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],         // diagonals
]

function checkWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return { winner: squares[a], line: [a, b, c] }
  }
  return null
}

// ── MINIMAX AI ─────────────────────────────────────────────────────────────
function minimax(squares, isMax, depth = 0) {
  const res = checkWinner(squares)
  if (res) return res.winner === 'O' ? 10 - depth : depth - 10
  if (squares.every(Boolean)) return 0

  const scores = []
  for (let i = 0; i < 9; i++) {
    if (squares[i]) continue
    const next = [...squares]
    next[i] = isMax ? 'O' : 'X'
    scores.push(minimax(next, !isMax, depth + 1))
  }
  return isMax ? Math.max(...scores) : Math.min(...scores)
}

function bestMove(squares) {
  let best = -Infinity, move = -1
  for (let i = 0; i < 9; i++) {
    if (squares[i]) continue
    const next = [...squares]
    next[i] = 'O'
    const score = minimax(next, false)
    if (score > best) { best = score; move = i }
  }
  return move
}

// ── CELL COMPONENT ─────────────────────────────────────────────────────────
function Cell({ value, onClick, isWin, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || !!value}
      className={`
        aspect-square rounded-2xl flex items-center justify-center
        text-5xl sm:text-6xl font-black
        border-2 transition-all duration-200 select-none
        ${isWin
          ? 'cell-win border-violet-500 bg-violet-900/40'
          : value
            ? 'border-white/10 bg-white/4 cursor-default'
            : 'border-white/8 bg-white/3 hover:border-violet-500/60 hover:bg-violet-900/20 cursor-pointer hover:scale-105'
        }
        ${value ? 'cell-pop' : ''}
      `}
    >
      {value === 'X' && <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">X</span>}
      {value === 'O' && <span className="text-violet-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.6)]">O</span>}
    </button>
  )
}

// ── SCORE CARD ─────────────────────────────────────────────────────────────
function ScoreCard({ label, color, score }) {
  return (
    <div className={`flex-1 rounded-2xl border ${color} bg-white/3 p-3 text-center`}>
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-black text-white">{score}</p>
    </div>
  )
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState(null)        // null | 'pvp' | 'ai'
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 })
  const [result, setResult] = useState(null)        // null | { winner, line } | 'draw'
  const [aiThink, setAiThink] = useState(false)

  // ── AI MOVE ──
  const doAiMove = useCallback((sq) => {
    setAiThink(true)
    setTimeout(() => {
      const move = bestMove(sq)
      if (move === -1) return
      const next = [...sq]
      next[move] = 'O'
      setSquares(next)

      const win = checkWinner(next)
      if (win) {
        setResult(win)
        setScores(s => ({ ...s, O: s.O + 1 }))
      } else if (next.every(Boolean)) {
        setResult('draw')
        setScores(s => ({ ...s, Draw: s.Draw + 1 }))
      } else {
        setXIsNext(true)
      }
      setAiThink(false)
    }, 420)
  }, [])

  // ── HANDLE CLICK ──
  function handleClick(i) {
    if (result || squares[i] || aiThink) return

    const next = [...squares]
    next[i] = xIsNext ? 'X' : 'O'
    setSquares(next)

    const win = checkWinner(next)
    if (win) {
      setResult(win)
      setScores(s => ({ ...s, [win.winner]: s[win.winner] + 1 }))
    } else if (next.every(Boolean)) {
      setResult('draw')
      setScores(s => ({ ...s, Draw: s.Draw + 1 }))
    } else {
      if (mode === 'ai' && xIsNext) {
        // X just moved → AI (O) goes
        setXIsNext(false)
        doAiMove(next)
      } else {
        setXIsNext(x => !x)
      }
    }
  }

  function resetBoard() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setResult(null)
    setAiThink(false)
  }

  function resetAll() {
    resetBoard()
    setScores({ X: 0, O: 0, Draw: 0 })
    setMode(null)
  }

  const winLine = result && result !== 'draw' ? result.line : []

  // ── STATUS TEXT ──
  let status = ''
  if (!result) {
    if (aiThink) status = '🤖 Computer is thinking…'
    else if (mode === 'ai') status = xIsNext ? '🎮 Your turn  (X)' : '💻 Computer\'s turn  (O)'
    else status = xIsNext ? '🟦 Player X\'s turn' : '🟪 Player O\'s turn'
  } else if (result === 'draw') {
    status = "🤝 It's a Draw!"
  } else {
    const who = mode === 'ai'
      ? (result.winner === 'X' ? '🎉 You Win!' : '🤖 Computer Wins!')
      : `🏆 Player ${result.winner} Wins!`
    status = who
  }

  // ── MODE SELECT SCREEN ──
  if (!mode) {
    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center p-4">
        <div className="w-full max-w-sm fade-up text-center">
          {/* Logo */}
          <div className="mb-2 text-6xl">🎮</div>
          <h1 className="font-['Outfit'] text-4xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Tic‑Tac‑Toe
          </h1>
          <p className="text-slate-500 text-sm mb-10">Choose your game mode to play</p>

          <div className="space-y-4">
            <button
              onClick={() => setMode('pvp')}
              className="w-full rounded-2xl border-2 border-cyan-500/40 bg-cyan-900/20 hover:bg-cyan-900/40 hover:border-cyan-400 p-5 text-left transition-all group"
            >
              <div className="text-2xl mb-1">👥</div>
              <p className="font-bold text-white text-lg group-hover:text-cyan-300">Player vs Player</p>
              <p className="text-slate-500 text-sm">Two players on the same device</p>
            </button>

            <button
              onClick={() => setMode('ai')}
              className="w-full rounded-2xl border-2 border-violet-500/40 bg-violet-900/20 hover:bg-violet-900/40 hover:border-violet-400 p-5 text-left transition-all group"
            >
              <div className="text-2xl mb-1">🤖</div>
              <p className="font-bold text-white text-lg group-hover:text-violet-300">Player vs Computer</p>
              <p className="text-slate-500 text-sm">Challenge the unbeatable Minimax AI</p>
            </button>
          </div>

          {/* Scoreboard hint if scores exist */}
          {(scores.X + scores.O + scores.Draw) > 0 && (
            <p className="text-slate-600 text-xs mt-6">Previous scores are saved — pick a mode to keep going!</p>
          )}
        </div>
      </div>
    )
  }

  // ── GAME SCREEN ──
  return (
    <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm fade-up">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={resetAll}
            className="text-slate-500 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            ← Menu
          </button>
          <h1 className="font-['Outfit'] text-xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Tic‑Tac‑Toe
          </h1>
          <span className="text-xs text-slate-600 border border-white/10 px-2 py-0.5 rounded-full">
            {mode === 'ai' ? 'vs AI' : 'PvP'}
          </span>
        </div>

        {/* Scoreboard */}
        <div className="flex gap-3 mb-6">
          <ScoreCard label={mode === 'ai' ? 'You (X)' : 'X'} color="border-cyan-500/30" score={scores.X} />
          <ScoreCard label="Draw" color="border-white/10" score={scores.Draw} />
          <ScoreCard label={mode === 'ai' ? 'CPU (O)' : 'O'} color="border-violet-500/30" score={scores.O} />
        </div>

        {/* Status */}
        <div className="text-center mb-4 h-7">
          <p className={`text-sm font-semibold transition-all ${result === 'draw' ? 'text-amber-400'
              : result ? 'text-violet-300'
                : aiThink ? 'text-slate-400 animate-pulse'
                  : 'text-slate-400'
            }`}>
            {status}
          </p>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {squares.map((val, i) => (
            <Cell
              key={i}
              value={val}
              onClick={() => handleClick(i)}
              isWin={winLine.includes(i)}
              disabled={!!result || aiThink || (!xIsNext && mode === 'ai')}
            />
          ))}
        </div>

        {/* Result banner */}
        {result && (
          <div className={`fade-up rounded-2xl p-4 mb-4 text-center border ${result === 'draw'
              ? 'bg-amber-900/20 border-amber-500/30'
              : 'bg-violet-900/20 border-violet-500/30'
            }`}>
            <p className="font-black text-xl text-white mb-3">{status}</p>
            <div className="flex gap-3">
              <button
                onClick={resetBoard}
                className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={resetAll}
                className="flex-1 py-2 rounded-xl border border-white/10 hover:border-white/30 text-slate-300 font-semibold text-sm transition-colors"
              >
                Change Mode
              </button>
            </div>
          </div>
        )}

        {/* Reset board button (mid-game) */}
        {!result && (
          <button
            onClick={resetBoard}
            className="w-full py-2.5 rounded-xl border border-white/8 text-slate-500 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
          >
            Reset Board
          </button>
        )}
      </div>
    </div>
  )
}

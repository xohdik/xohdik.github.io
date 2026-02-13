import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// =================== QUOTES ===================
const quotes = [
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
  { text: 'Programming isn\'t about what you know; it\'s about what you can figure out.', author: 'Chris Pine' },
  { text: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exupéry' },
  { text: 'Software is a great combination between artistry and engineering.', author: 'Bill Gates' },
  { text: 'The function of good software is to make the complex appear to be simple.', author: 'Grady Booch' },
]

function QuoteWidget() {
  const [idx, setIdx] = useState(Math.floor(Math.random() * quotes.length))
  const q = quotes[idx]
  return (
    <div className="text-center px-4 py-6">
      <i className="fa-solid fa-quote-left text-2xl mb-4 block" style={{ color: 'var(--color-primary)', opacity: 0.3 }}></i>
      <motion.p
        key={idx}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-sm leading-relaxed italic mb-3" style={{ color: 'var(--color-ink-muted)' }}
      >
        "{q.text}"
      </motion.p>
      <p className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>— {q.author}</p>
      <button
        onClick={() => setIdx((idx + 1) % quotes.length)}
        className="mt-4 px-4 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}
      >
        <i className="fa-solid fa-shuffle mr-2"></i>Next Quote
      </button>
    </div>
  )
}

// =================== MUSIC PLAYER ===================
const tracks = [
  { name: 'Chill Vibes', url: 'https://cdn.pixabay.com/audio/2024/11/29/audio_d3e552f463.mp3' },
  { name: 'Focus Mode', url: 'https://cdn.pixabay.com/audio/2024/09/10/audio_6e4e952399.mp3' },
  { name: 'Deep Work', url: 'https://cdn.pixabay.com/audio/2023/07/19/audio_e552c26582.mp3' },
]

function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(0)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause() }
    else { audioRef.current.play().catch(() => {}) }
    setPlaying(!playing)
  }

  const next = () => {
    const newTrack = (track + 1) % tracks.length
    setTrack(newTrack)
    setPlaying(false)
    if (audioRef.current) {
      audioRef.current.src = tracks[newTrack].url
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className="text-center px-4 py-6">
      <audio ref={audioRef} src={tracks[track].url} loop />
      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ background: playing ? 'var(--color-primary)' : 'var(--color-border-light)', transition: 'all 0.3s' }}>
        <motion.i
          className={`fa-solid ${playing ? 'fa-music' : 'fa-headphones'} text-2xl`}
          style={{ color: playing ? 'white' : 'var(--color-ink-muted)' }}
          animate={playing ? { rotate: [0, 5, -5, 0] } : {}}
          transition={playing ? { duration: 1, repeat: Infinity } : {}}
        />
      </div>
      <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-ink)' }}>{tracks[track].name}</p>
      <p className="text-xs mb-4" style={{ color: 'var(--color-ink-muted)' }}>Audio Mack</p>
      <div className="flex gap-3 justify-center">
        <button onClick={toggle}
          className="px-5 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
          style={{ background: playing ? 'var(--color-accent)' : 'var(--color-primary)' }}>
          <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'} mr-2`}></i>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={next}
          className="px-4 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  )
}

// =================== SNAKE GAME ===================
const GRID = 15, CELL = 16

function SnakeGame() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const stateRef = useRef({ snake: [[7,7]], dir: [1,0], food: [3,3], running: false })

  const resetGame = useCallback(() => {
    const s = stateRef.current
    s.snake = [[7,7]]
    s.dir = [1,0]
    s.food = [Math.floor(Math.random()*GRID), Math.floor(Math.random()*GRID)]
    s.running = true
    setScore(0)
    setGameOver(false)
    setStarted(true)
  }, [])

  useEffect(() => {
    if (!started) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const handleKey = (e) => {
      const s = stateRef.current
      const map = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0], w:[0,-1], s:[0,1], a:[-1,0], d:[1,0] }
      const d = map[e.key]
      if (d && (d[0] + s.dir[0] !== 0 || d[1] + s.dir[1] !== 0)) s.dir = d
    }
    window.addEventListener('keydown', handleKey)

    const interval = setInterval(() => {
      const s = stateRef.current
      if (!s.running) return
      const head = [s.snake[0][0]+s.dir[0], s.snake[0][1]+s.dir[1]]
      if (head[0]<0||head[0]>=GRID||head[1]<0||head[1]>=GRID||s.snake.some(p=>p[0]===head[0]&&p[1]===head[1])) {
        s.running = false; setGameOver(true); return
      }
      s.snake.unshift(head)
      if (head[0]===s.food[0]&&head[1]===s.food[1]) {
        setScore(sc => sc+1)
        s.food = [Math.floor(Math.random()*GRID), Math.floor(Math.random()*GRID)]
      } else s.snake.pop()

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface-raised').trim() || '#fff'
      ctx.fillRect(0,0,GRID*CELL,GRID*CELL)
      // Grid
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#e5e7eb'
      ctx.lineWidth = 0.5
      for (let i=0;i<=GRID;i++) { ctx.beginPath();ctx.moveTo(i*CELL,0);ctx.lineTo(i*CELL,GRID*CELL);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*CELL);ctx.lineTo(GRID*CELL,i*CELL);ctx.stroke() }
      // Food
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#dc2626'
      ctx.beginPath();ctx.arc(s.food[0]*CELL+CELL/2,s.food[1]*CELL+CELL/2,CELL/2.5,0,Math.PI*2);ctx.fill()
      // Snake
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#1e40af'
      s.snake.forEach(([x,y]) => { ctx.fillRect(x*CELL+1,y*CELL+1,CELL-2,CELL-2) })
    }, 120)

    return () => { clearInterval(interval); window.removeEventListener('keydown', handleKey) }
  }, [started])

  return (
    <div className="text-center px-4 py-4">
      <p className="text-sm font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
        🐍 Snake <span className="ml-2 text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--color-border-light)', color: 'var(--color-accent)' }}>Score: {score}</span>
      </p>
      <div className="flex justify-center mb-3">
        <canvas ref={canvasRef} width={GRID*CELL} height={GRID*CELL}
          className="rounded-xl border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-raised)' }} />
      </div>
      {!started && (
        <button onClick={resetGame}
          className="px-5 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
          style={{ background: 'var(--color-primary)' }}>
          <i className="fa-solid fa-play mr-2"></i>Start Game
        </button>
      )}
      {gameOver && (
        <div>
          <p className="text-sm font-bold mb-2" style={{ color: 'var(--color-accent)' }}>Game Over! Score: {score}</p>
          <button onClick={resetGame}
            className="px-5 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
            style={{ background: 'var(--color-primary)' }}>
            <i className="fa-solid fa-redo mr-2"></i>Play Again
          </button>
        </div>
      )}
      {started && !gameOver && (
        <p className="text-[10px] mt-1" style={{ color: 'var(--color-ink-muted)' }}>Arrow keys or WASD to move</p>
      )}
      {/* Mobile controls */}
      {started && !gameOver && (
        <div className="grid grid-cols-3 gap-1 w-28 mx-auto mt-2 lg:hidden">
          <div />
          <button onClick={() => { stateRef.current.dir = [0,-1] }} className="w-9 h-9 rounded border flex items-center justify-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-up text-xs"></i></button>
          <div />
          <button onClick={() => { stateRef.current.dir = [-1,0] }} className="w-9 h-9 rounded border flex items-center justify-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-left text-xs"></i></button>
          <button onClick={() => { stateRef.current.dir = [0,1] }} className="w-9 h-9 rounded border flex items-center justify-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-down text-xs"></i></button>
          <button onClick={() => { stateRef.current.dir = [1,0] }} className="w-9 h-9 rounded border flex items-center justify-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-right text-xs"></i></button>
        </div>
      )}
    </div>
  )
}

// =================== MAIN FLOATING WIDGET ===================
const tabs = [
  { id: 'quote', icon: 'fa-quote-left', label: 'Quote' },
  { id: 'music', icon: 'fa-headphones', label: 'Audio' },
  { id: 'game', icon: 'fa-gamepad', label: 'Game' },
]

export default function FunWidget() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('quote')

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-3 rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', width: '300px' }}
          >
            {/* Tab bar */}
            <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="flex-1 py-2.5 text-xs font-bold transition-all"
                  style={{
                    color: tab === t.id ? 'var(--color-primary)' : 'var(--color-ink-muted)',
                    borderBottom: tab === t.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                  }}
                >
                  <i className={`fa-solid ${t.icon} mr-1.5`}></i>{t.label}
                </button>
              ))}
            </div>
            {/* Content */}
            <div style={{ minHeight: '200px' }}>
              {tab === 'quote' && <QuoteWidget />}
              {tab === 'music' && <MusicPlayer />}
              {tab === 'game' && <SnakeGame />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white"
        style={{ background: open ? 'var(--color-accent)' : 'var(--color-primary)', boxShadow: '0 8px 25px -5px rgba(30,64,175,0.4)' }}
      >
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-wand-magic-sparkles'}`}></i>
      </motion.button>
    </div>
  )
}

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
  { text: 'It\'s not a bug — it\'s an undocumented feature.', author: 'Anonymous' },
  { text: 'Before software can be reusable it first has to be usable.', author: 'Ralph Johnson' },
]

function QuoteWidget() {
  const [idx, setIdx] = useState(Math.floor(Math.random() * quotes.length))
  const q = quotes[idx]
  return (
    <div className="text-center px-4 py-6">
      <i className="fa-solid fa-quote-left text-2xl mb-4 block" style={{ color: 'var(--color-primary)', opacity: 0.3 }}></i>
      <motion.p key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-sm leading-relaxed italic mb-3" style={{ color: 'var(--color-ink-muted)' }}>
        "{q.text}"
      </motion.p>
      <p className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>— {q.author}</p>
      <button onClick={() => setIdx((idx + 1) % quotes.length)}
        className="mt-4 px-4 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}>
        <i className="fa-solid fa-shuffle mr-2"></i>Next Quote
      </button>
    </div>
  )
}

// =================== BOOMPLAY MUSIC PLAYER ===================
const tracks = [
  { name: 'Chill Vibes', artist: 'BoomPlay', url: 'https://cdn.pixabay.com/audio/2024/11/29/audio_d3e552f463.mp3' },
  { name: 'Focus Mode', artist: 'BoomPlay', url: 'https://cdn.pixabay.com/audio/2024/09/10/audio_6e4e952399.mp3' },
  { name: 'Deep Work', artist: 'BoomPlay', url: 'https://cdn.pixabay.com/audio/2023/07/19/audio_e552c26582.mp3' },
  { name: 'Night Code', artist: 'BoomPlay', url: 'https://cdn.pixabay.com/audio/2024/02/14/audio_8e64b98d1a.mp3' },
]

function BoomPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const next = () => {
    const n = (track + 1) % tracks.length
    setTrack(n)
    setProgress(0)
    if (audioRef.current) {
      audioRef.current.src = tracks[n].url
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const prev = () => {
    const n = (track - 1 + tracks.length) % tracks.length
    setTrack(n)
    setProgress(0)
    if (audioRef.current) {
      audioRef.current.src = tracks[n].url
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => { setProgress(a.currentTime); setDuration(a.duration || 0) }
    const onEnd = () => next()
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('ended', onEnd)
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('ended', onEnd) }
  }, [track])

  const fmt = (s) => { const m = Math.floor(s/60); return `${m}:${String(Math.floor(s%60)).padStart(2,'0')}` }

  return (
    <div className="px-4 py-5">
      <audio ref={audioRef} src={tracks[track].url} preload="metadata" />

      {/* Album art placeholder */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
          className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', boxShadow: playing ? '0 0 20px rgba(30,64,175,0.3)' : 'none' }}
        >
          <i className="fa-solid fa-music text-white text-lg"></i>
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold truncate" style={{ color: 'var(--color-ink)' }}>{tracks[track].name}</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{tracks[track].artist}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full h-1.5 rounded-full overflow-hidden cursor-pointer" style={{ background: 'var(--color-border)' }}
          onClick={(e) => {
            if (!audioRef.current || !duration) return
            const rect = e.currentTarget.getBoundingClientRect()
            audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration
          }}>
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))', width: `${duration ? (progress/duration)*100 : 0}%` }} />
        </div>
        <div className="flex justify-between mt-1 text-[10px] font-mono" style={{ color: 'var(--color-ink-muted)' }}>
          <span>{fmt(progress)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={prev} className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ color: 'var(--color-ink-muted)' }}>
          <i className="fa-solid fa-backward-step"></i>
        </button>
        <button onClick={toggle}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
          <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'} ${playing ? '' : 'ml-0.5'}`}></i>
        </button>
        <button onClick={next} className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ color: 'var(--color-ink-muted)' }}>
          <i className="fa-solid fa-forward-step"></i>
        </button>
      </div>

      {/* Track list */}
      <div className="mt-4 space-y-1">
        {tracks.map((t, i) => (
          <button key={i}
            onClick={() => { setTrack(i); setProgress(0); if(audioRef.current){audioRef.current.src=t.url;audioRef.current.play().then(()=>setPlaying(true)).catch(()=>{})} }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all hover:scale-[1.02]"
            style={{
              background: i === track ? 'color-mix(in oklab, var(--color-primary) 10%, transparent)' : 'transparent',
              color: i === track ? 'var(--color-primary)' : 'var(--color-ink-muted)',
            }}>
            <i className={`fa-solid ${i === track && playing ? 'fa-volume-high' : 'fa-music'} text-[10px]`}></i>
            <span className="font-semibold truncate">{t.name}</span>
          </button>
        ))}
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
  const [highScore, setHighScore] = useState(0)
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
      if (d && (d[0] + s.dir[0] !== 0 || d[1] + s.dir[1] !== 0)) { s.dir = d; e.preventDefault() }
    }
    window.addEventListener('keydown', handleKey)

    const interval = setInterval(() => {
      const s = stateRef.current
      if (!s.running) return
      const head = [s.snake[0][0]+s.dir[0], s.snake[0][1]+s.dir[1]]
      if (head[0]<0||head[0]>=GRID||head[1]<0||head[1]>=GRID||s.snake.some(p=>p[0]===head[0]&&p[1]===head[1])) {
        s.running = false
        setGameOver(true)
        setHighScore(h => Math.max(h, s.snake.length - 1))
        return
      }
      s.snake.unshift(head)
      if (head[0]===s.food[0]&&head[1]===s.food[1]) {
        setScore(sc => sc+1)
        let newFood
        do { newFood = [Math.floor(Math.random()*GRID), Math.floor(Math.random()*GRID)] }
        while (s.snake.some(p => p[0]===newFood[0]&&p[1]===newFood[1]))
        s.food = newFood
      } else s.snake.pop()

      // Draw
      const cs = getComputedStyle(document.documentElement)
      ctx.fillStyle = cs.getPropertyValue('--color-surface-raised').trim() || '#fff'
      ctx.fillRect(0,0,GRID*CELL,GRID*CELL)
      ctx.strokeStyle = cs.getPropertyValue('--color-border').trim() || '#e5e7eb'
      ctx.lineWidth = 0.3
      for (let i=0;i<=GRID;i++) { ctx.beginPath();ctx.moveTo(i*CELL,0);ctx.lineTo(i*CELL,GRID*CELL);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*CELL);ctx.lineTo(GRID*CELL,i*CELL);ctx.stroke() }
      // Food — pulsing
      const pulse = 0.8 + Math.sin(Date.now()/200)*0.2
      ctx.fillStyle = cs.getPropertyValue('--color-accent').trim() || '#dc2626'
      ctx.beginPath();ctx.arc(s.food[0]*CELL+CELL/2,s.food[1]*CELL+CELL/2,CELL/2.5*pulse,0,Math.PI*2);ctx.fill()
      // Snake with gradient
      s.snake.forEach(([x,y], idx) => {
        const alpha = 1 - (idx / s.snake.length) * 0.5
        ctx.fillStyle = idx === 0
          ? (cs.getPropertyValue('--color-primary').trim() || '#1e40af')
          : `rgba(59,130,246,${alpha})`
        const r = idx === 0 ? 4 : 2
        ctx.beginPath()
        ctx.roundRect(x*CELL+1,y*CELL+1,CELL-2,CELL-2,r)
        ctx.fill()
      })
    }, 110)

    return () => { clearInterval(interval); window.removeEventListener('keydown', handleKey) }
  }, [started])

  return (
    <div className="text-center px-4 py-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>🐍 Snake</span>
        <div className="flex gap-3">
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--color-border-light)', color: 'var(--color-primary)' }}>Score: {score}</span>
          {highScore > 0 && <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--color-border-light)', color: 'var(--color-accent)' }}>Best: {highScore}</span>}
        </div>
      </div>
      <div className="flex justify-center mb-3">
        <canvas ref={canvasRef} width={GRID*CELL} height={GRID*CELL}
          className="rounded-xl border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-raised)' }} />
      </div>
      {!started && (
        <button onClick={resetGame}
          className="px-5 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
          <i className="fa-solid fa-play mr-2"></i>Start Game
        </button>
      )}
      {gameOver && (
        <div>
          <p className="text-sm font-bold mb-2" style={{ color: 'var(--color-accent)' }}>Game Over! Score: {score}</p>
          <button onClick={resetGame}
            className="px-5 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
            <i className="fa-solid fa-redo mr-2"></i>Play Again
          </button>
        </div>
      )}
      {started && !gameOver && (
        <>
          <p className="text-[10px] mt-1" style={{ color: 'var(--color-ink-muted)' }}>Arrow keys or WASD</p>
          <div className="grid grid-cols-3 gap-1 w-28 mx-auto mt-2 lg:hidden">
            <div />
            <button onClick={() => { stateRef.current.dir = [0,-1] }} className="w-9 h-9 rounded border flex items-center justify-center active:scale-90" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-up text-xs"></i></button>
            <div />
            <button onClick={() => { stateRef.current.dir = [-1,0] }} className="w-9 h-9 rounded border flex items-center justify-center active:scale-90" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-left text-xs"></i></button>
            <button onClick={() => { stateRef.current.dir = [0,1] }} className="w-9 h-9 rounded border flex items-center justify-center active:scale-90" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-down text-xs"></i></button>
            <button onClick={() => { stateRef.current.dir = [1,0] }} className="w-9 h-9 rounded border flex items-center justify-center active:scale-90" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}><i className="fa-solid fa-chevron-right text-xs"></i></button>
          </div>
        </>
      )}
    </div>
  )
}

// =================== MAIN WIDGET ===================
const tabs = [
  { id: 'quote', icon: 'fa-quote-left', label: 'Quote' },
  { id: 'music', icon: 'fa-headphones', label: 'BoomPlay' },
  { id: 'game', icon: 'fa-gamepad', label: 'Game' },
]

export default function FunWidget() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('quote')

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-3 rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', width: '310px', maxWidth: '90vw' }}
          >
            {/* Tab bar */}
            <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="flex-1 py-2.5 text-xs font-bold transition-all"
                  style={{
                    color: tab === t.id ? 'var(--color-primary)' : 'var(--color-ink-muted)',
                    borderBottom: tab === t.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                  }}>
                  <i className={`fa-solid ${t.icon} mr-1.5`}></i>{t.label}
                </button>
              ))}
            </div>
            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {tab === 'quote' && <QuoteWidget />}
              {tab === 'music' && <BoomPlayer />}
              {tab === 'game' && <SnakeGame />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white"
        style={{ background: open ? 'var(--color-accent)' : 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', boxShadow: '0 8px 25px -5px rgba(30,64,175,0.4)' }}>
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-wand-magic-sparkles'}`}></i>
      </motion.button>
    </div>
  )
}

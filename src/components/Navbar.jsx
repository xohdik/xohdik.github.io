import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'About' },
  { to: '/projects', label: 'Portfolio' },
  { to: '/experience', label: 'Experience' },
  { to: '/publications', label: 'Publications' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Me' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight" style={{ color: 'var(--color-primary)' }}>
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-black shadow-lg shadow-[var(--color-accent)]/20">
            T
          </span>
          <span>TundeCodes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all relative"
              style={{
                color: location.pathname === l.to ? 'var(--color-ink)' : 'var(--color-ink-muted)',
              }}
            >
              {l.label}
              {location.pathname === l.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ background: 'var(--color-primary)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
            style={{
              background: '#111827',
              boxShadow: '0 4px 15px -3px rgba(0,0,0,0.15)',
            }}
          >
            Download CV
            <i className="fa-solid fa-download text-xs"></i>
          </a>
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:scale-110"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-raised)', color: 'var(--color-ink-muted)' }}
            title="Toggle theme"
          >
            {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
          </button>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-raised)', color: 'var(--color-ink-muted)' }}
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="lg:hidden glass mx-4 mb-4 rounded-2xl p-4 flex flex-col gap-1 shadow-xl"
          >
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  color: location.pathname === l.to ? 'var(--color-primary)' : 'var(--color-ink)',
                  background: location.pathname === l.to ? 'color-mix(in oklab, var(--color-primary-light) 10%, transparent)' : 'transparent',
                }}
              >{l.label}</Link>
            ))}
            <a href="/resume.pdf" download
              className="mt-2 px-5 py-3 rounded-full text-sm font-bold text-white text-center"
              style={{ background: '#111827' }}
            >
              Download CV <i className="fa-solid fa-download ml-2"></i>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

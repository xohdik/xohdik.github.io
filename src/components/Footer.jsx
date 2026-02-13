import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative py-14" style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent)' }} />
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-white text-sm font-black">T</span>
              <h3 className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--color-ink)' }}>TundeCodes</h3>
            </div>
            <p className="text-sm leading-relaxed max-w-[350px]" style={{ color: 'var(--color-ink-muted)' }}>
              Software Engineer & Researcher. Building reliable, intelligent systems through neuro-symbolic software analysis.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)' }}>Pages</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/" className="hover:underline" style={{ color: 'var(--color-ink-muted)' }}>About</Link>
              <Link to="/projects" className="hover:underline" style={{ color: 'var(--color-ink-muted)' }}>Portfolio</Link>
              <Link to="/experience" className="hover:underline" style={{ color: 'var(--color-ink-muted)' }}>Experience</Link>
              <Link to="/publications" className="hover:underline" style={{ color: 'var(--color-ink-muted)' }}>Publications</Link>
              <Link to="/gallery" className="hover:underline" style={{ color: 'var(--color-ink-muted)' }}>Gallery</Link>
              <Link to="/contact" className="hover:underline" style={{ color: 'var(--color-ink-muted)' }}>Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)' }}>Connect</h4>
            <div className="space-y-3 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              <a href="tel:+8618583994003" className="flex items-center gap-3 hover:underline">
                <i className="fa-solid fa-phone" style={{ color: 'var(--color-primary)' }}></i>+86 18583994003
              </a>
              <a href="https://github.com/xohdik" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                <i className="fa-brands fa-github"></i>github.com/xohdik
              </a>
              <span className="flex items-center gap-3">
                <i className="fa-solid fa-map-pin" style={{ color: 'var(--color-accent)' }}></i>Chengdu, China · Open to Remote
              </span>
            </div>
          </div>
        </div>
        {/* Status ticker */}
        <div className="mt-8 py-3 px-5 rounded-xl flex items-center gap-3 text-sm"
          style={{ background: 'var(--color-border-light)', border: '1px solid var(--color-border)' }}>
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--color-mint)' }}></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--color-mint)' }}></span>
          </span>
          <span style={{ color: 'var(--color-ink-muted)' }}>
            Currently working on: <strong style={{ color: 'var(--color-ink)' }}>Spec-Aware Siamese GAT for Neuro-Symbolic Verification</strong>
          </span>
        </div>
        <div className="mt-10 pt-6 text-center text-xs" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-ink-muted)', opacity: 0.6 }}>
          © {new Date().getFullYear()} TundeCodes — Designed for reliability & a neuro-symbolic future.
        </div>
      </div>
    </footer>
  )
}

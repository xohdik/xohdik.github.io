import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const socialLinks = [
  { icon: 'fa-brands fa-github', href: 'https://github.com/xohdik', label: 'GitHub' },
  { icon: 'fa-solid fa-phone', href: 'tel:+8618583994003', label: 'Phone' },
  { icon: 'fa-solid fa-globe', href: 'https://www.friendra.com', label: 'Friendra' },
]

// Video — local file at /public/videos/hero-bg.mp4
const VIDEO_URL = '/videos/hero-bg.mp4'

// Typewriter hook — animates once, then stays
function useTypewriter(text, speed = 30, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(delayTimer)
  }, [startDelay])
  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed)
    return () => clearTimeout(timer)
  }, [displayed, started, text, speed])
  return { displayed, done: displayed.length >= text.length }
}

function TypewriterBlock({ text, speed = 45, delay = 0 }) {
  const { displayed, done } = useTypewriter(text, speed, delay)
  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse" style={{ background: 'var(--color-accent)' }} />
      )}
    </span>
  )
}

function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="video-overlay" />
    </div>
  )
}

export default function Home() {
  return (
    <motion.div {...pageTransition} className="page-wrapper" style={{ paddingTop: 0 }}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <VideoBackground />

        {/* Subtle blobs */}
        <div className="blob w-96 h-96 -top-[10%] -left-[10%] animate-blob" style={{ background: 'var(--color-primary)' }} />
        <div className="blob w-80 h-80 top-[20%] -right-[8%]" style={{ background: 'var(--color-accent)', animation: 'blob-move 10s ease-in-out infinite 2s' }} />

        {/* Social sidebar */}
        <div className="hidden lg:flex flex-col gap-5 fixed left-8 top-1/2 -translate-y-1/2 z-20">
          {socialLinks.map((s, i) => (
            <motion.a key={i} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-110 hover:bg-[#1e40af] hover:text-white hover:border-[#1e40af]"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)', background: 'var(--color-surface-raised)' }}
              title={s.label}
            >
              <i className={`${s.icon} text-sm`}></i>
            </motion.a>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 pt-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 lg:mb-10"
          >
            <svg className="absolute -inset-10 lg:-inset-14 w-[calc(100%+80px)] h-[calc(100%+80px)] lg:w-[calc(100%+112px)] lg:h-[calc(100%+112px)] pointer-events-none" viewBox="0 0 400 450" fill="none">
              <motion.ellipse cx="200" cy="220" rx="185" ry="170"
                stroke="var(--color-ink)" strokeWidth="1" opacity="0.15"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                transform="rotate(-12 200 220)"
              />
              <motion.ellipse cx="200" cy="220" rx="175" ry="160"
                stroke="var(--color-accent)" strokeWidth="1" opacity="0.12"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.9, ease: 'easeInOut' }}
                transform="rotate(18 200 220)"
              />
            </svg>

            <div className="relative w-52 h-60 sm:w-60 sm:h-68 lg:w-72 lg:h-[340px] overflow-hidden z-10"
              style={{ borderRadius: '999px 999px 40% 40%', background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.02))' }}
            >
              <img src="/images/passport.jpeg" alt="TundeCodes"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(80%) contrast(1.1)' }}
                onError={(e) => { e.currentTarget.src = '/images/avatar.svg' }}
              />
            </div>

            {/* Rotating badge */}
            <motion.a href="#bio"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
              className="absolute -top-1 -right-6 lg:top-4 lg:-right-12 w-24 h-24 lg:w-28 lg:h-28 cursor-pointer z-20"
              whileHover={{ scale: 1.12 }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <defs><path id="meetCircle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
                <text className="text-[10.5px] font-bold uppercase" fill="var(--color-ink-muted)" style={{ letterSpacing: '4.5px' }}>
                  <textPath href="#meetCircle">MEET ME · PhD · SOFTWARE ENG ·&nbsp;</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--color-ink-muted)' }}>
                  <i className="fa-solid fa-arrow-down text-xs" style={{ color: 'var(--color-ink-muted)' }}></i>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Name */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.05em] mb-5"
          >
            <span style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary), var(--color-cyan))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Tunde</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Codes</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-sm sm:text-base uppercase tracking-[0.3em] font-semibold mb-10"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            SOFTWARE ENGINEER
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/contact"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', boxShadow: '0 8px 30px -5px rgba(30,64,175,0.35)' }}
            >
              <i className="fa-solid fa-briefcase"></i>Hire Me
            </Link>
            <Link to="/projects"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold border transition-all hover:scale-105"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)', background: 'var(--color-surface-raised)' }}
            >
              <i className="fa-solid fa-folder-open"></i>View Portfolio
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: 'var(--color-ink-muted)' }}></div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== BIO WITH TYPEWRITER ===== */}
      <section id="bio" className="py-20 lg:py-28 relative">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
          >
            <h2 className="section-title mb-10">About Me</h2>
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
              <div>
                <p className="text-lg leading-relaxed mb-6 font-mono" style={{ color: 'var(--color-ink-muted)' }}>
                  <TypewriterBlock
                    text="Tunde is a dedicated Software Engineer who specializes in software verification and programming languages, with a focus on making AI-generated code correct, reliable, and explainable."
                    speed={45}
                    delay={600}
                  />
                </p>
                <p className="text-lg leading-relaxed mb-6 font-mono" style={{ color: 'var(--color-ink-muted)' }}>
                  <TypewriterBlock
                    text="He develops methods that combine formal analysis, program graphs, and neuro-symbolic reasoning to ensure AI code can be trusted before deployment."
                    speed={45}
                    delay={9000}
                  />
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--color-ink-muted)', opacity: 0.85 }}
                >
                  In the long run, I aim to contribute to the evolution of neuro-symbolic software
                  analysis: AI systems that do not merely mimic human intuition, but reason transparently
                  and ethically about software behavior. We build the next generation of reliable
                  computing systems.
                </motion.p>
              </div>
              <div className="space-y-5">
                {[
                  { label: 'Phone', value: '+86 18583994003', href: 'tel:+8618583994003', icon: 'fa-phone', color: 'var(--color-cyan)' },
                  { label: 'GitHub', value: 'github.com/xohdik', href: 'https://github.com/xohdik', icon: 'fa-brands fa-github', color: 'var(--color-ink)' },
                  { label: 'Location', value: 'Hybrid (Remote & Onsite)', icon: 'fa-location-dot', color: 'var(--color-accent)' },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `color-mix(in oklab, ${item.color} 10%, transparent)` }}>
                      <i className={`${item.icon.includes('fa-brands') ? '' : 'fa-solid '}${item.icon} text-sm`} style={{ color: item.color }}></i>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-ink-muted)' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                          className="text-sm font-bold hover:underline" style={{ color: 'var(--color-ink)' }}>{item.value}</a>
                      ) : (
                        <span className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                  className="flex gap-3 pt-2"
                >
                  <Link to="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', boxShadow: '0 4px 15px -3px rgba(30,64,175,0.3)' }}
                  >
                    View Projects <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>
                  <a href="/resume.pdf" download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105"
                    style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
                  >
                    Resume <i className="fa-solid fa-download text-xs"></i>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SKILLS RIBBON — always dark ===== */}
      <section className="py-14 relative overflow-hidden" style={{ background: '#111827' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {['Python', 'Ruby/Rails', 'Java', 'C++', 'React', 'MATLAB', 'PyTorch', 'PostgreSQL', 'Docker', 'Nginx', 'TensorFlow', 'GraphCodeBERT'].map(s => (
              <span key={s} className="px-4 py-2 rounded-full text-sm font-bold text-white/80 border border-white/15"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >{s}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile social */}
      <div className="lg:hidden flex justify-center gap-4 py-8">
        {socialLinks.map((s, i) => (
          <a key={i} href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)', background: 'var(--color-surface-raised)' }}
          >
            <i className={s.icon}></i>
          </a>
        ))}
      </div>
    </motion.div>
  )
}
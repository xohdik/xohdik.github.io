import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { AnimatedSection } from './AnimatedSection'

const EMAILJS_SERVICE_ID = 'service_51p88jg'
const EMAILJS_TEMPLATE_ID = 'template_omc7vby'
const EMAILJS_PUBLIC_KEY = 'wN1hd_l-mJDCjfgHj'

const floatingIcons = [
  { icon: 'fa-paper-plane', x: '5%', y: '12%', delay: 0, size: '1.4rem' },
  { icon: 'fa-envelope-open', x: '92%', y: '18%', delay: 1.2, size: '1.2rem' },
  { icon: 'fa-comments', x: '8%', y: '80%', delay: 2.4, size: '1rem' },
  { icon: 'fa-handshake', x: '90%', y: '75%', delay: 0.6, size: '1.3rem' },
  { icon: 'fa-rocket', x: '50%', y: '5%', delay: 1.8, size: '1.1rem' },
  { icon: 'fa-code', x: '30%', y: '90%', delay: 3, size: '1rem' },
  { icon: 'fa-bolt', x: '75%', y: '88%', delay: 0.3, size: '1.2rem' },
  { icon: 'fa-wand-magic-sparkles', x: '18%', y: '45%', delay: 2, size: '1rem' },
]

const fieldVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

function FloatingLabel({ label, name, type = 'text', required, isTextarea, icon }) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const Tag = isTextarea ? 'textarea' : 'input'
  return (
    <div className="relative group">
      {icon && (
        <i className={`fa-solid ${icon} absolute left-4 z-10 transition-all duration-300`}
          style={{
            top: isTextarea ? '18px' : '50%',
            transform: isTextarea ? 'none' : 'translateY(-50%)',
            color: focused ? 'var(--color-accent)' : 'var(--color-ink-muted)',
            opacity: focused ? 1 : 0.5, fontSize: '0.85rem',
          }}
        />
      )}
      <Tag name={name} type={isTextarea ? undefined : type} required={required}
        rows={isTextarea ? 5 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value) }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className="peer w-full rounded-2xl text-base font-medium outline-none transition-all duration-300 resize-none"
        style={{
          background: 'var(--color-surface)',
          color: 'var(--color-ink)',
          border: `2px solid ${focused ? 'var(--color-accent)' : 'var(--color-border)'}`,
          boxShadow: focused
            ? '0 0 0 4px color-mix(in oklab, var(--color-accent) 12%, transparent), 0 8px 25px -5px rgba(37,99,235,0.08)'
            : '0 2px 8px -2px rgba(0,0,0,0.04)',
          padding: icon
            ? (isTextarea ? '22px 20px 12px 40px' : '22px 20px 8px 40px')
            : (isTextarea ? '22px 20px 12px 20px' : '22px 20px 8px 20px'),
        }}
        placeholder=" "
      />
      <label className="absolute transition-all duration-300 pointer-events-none font-medium"
        style={{
          left: icon ? '40px' : '20px',
          top: focused || hasValue ? '6px' : isTextarea ? '18px' : '50%',
          transform: focused || hasValue ? 'none' : isTextarea ? 'none' : 'translateY(-50%)',
          fontSize: focused || hasValue ? '0.65rem' : '0.9rem',
          color: focused ? 'var(--color-accent)' : 'var(--color-ink-muted)',
          letterSpacing: focused || hasValue ? '0.08em' : '0',
          textTransform: focused || hasValue ? 'uppercase' : 'none',
          fontWeight: focused || hasValue ? 700 : 500,
        }}
      >{label}</label>
      <div className="absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-500"
        style={{
          width: focused ? '90%' : '0%', transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent))',
        }}
      />
    </div>
  )
}

function SuccessCheckmark() {
  return (
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="flex flex-col items-center gap-5 py-12"
    >
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.1 }}
        className="w-24 h-24 rounded-full flex items-center justify-center relative"
        style={{ background: 'color-mix(in oklab, var(--color-primary-light) 10%, transparent)' }}
      >
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 rounded-full"
          style={{ border: '3px solid var(--color-primary-light)' }}
        />
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
        <p className="text-2xl font-bold mb-2" style={{ color: 'var(--color-primary-light)' }}>Message Sent!</p>
        <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>Thanks for reaching out. I'll get back to you shortly.</p>
      </motion.div>
    </motion.div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorShake, setErrorShake] = useState(false)
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      setStatus('error')
      setErrorShake(true)
      setTimeout(() => setErrorShake(false), 600)
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <AnimatedSection id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Animated gradient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 5%, transparent), color-mix(in oklab, var(--color-accent) 3%, transparent), color-mix(in oklab, var(--color-primary-light) 5%, transparent), color-mix(in oklab, var(--color-gold) 3%, transparent))',
            backgroundSize: '400% 400%',
          }}
        />
        <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'color-mix(in oklab, var(--color-accent) 6%, transparent)', top: '-10%', left: '-5%' }}
        />
        <motion.div animate={{ x: [0, -25, 20, 0], y: [0, 25, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'color-mix(in oklab, var(--color-accent) 5%, transparent)', bottom: '-10%', right: '-5%' }}
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((fi, i) => (
          <motion.i key={i} className={`fa-solid ${fi.icon} absolute`}
            style={{ left: fi.x, top: fi.y, color: 'var(--color-primary)', opacity: 0.05, fontSize: fi.size }}
            animate={{ y: [0, -18, 0], rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6 + i * 0.5, repeat: Infinity, delay: fi.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="max-w-[680px] mx-auto px-6 relative">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12"
        >
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent))',
              boxShadow: '0 8px 30px -5px rgba(37,99,235,0.3)',
            }}
          >
            <i className="fa-solid fa-envelope-open-text text-2xl text-white"></i>
          </motion.div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.03em] leading-tight mb-4"
            style={{ color: 'var(--color-ink)' }}
          >
            Let's Build Something <span className="gradient-text">Together</span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
            Have a project in mind? Let's collaborate and create something extraordinary.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className={`portfolio-card relative overflow-hidden ${errorShake ? 'animate-shake' : ''}`}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.1), 0 0 0 1px var(--color-border)' }}
        >
          {/* Top gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-1 animate-gradient"
            style={{
              background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent), var(--color-primary-light), var(--color-accent))',
              backgroundSize: '300% 100%',
            }}
          />
          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div key={i} className="absolute rounded-full"
                style={{
                  width: 3 + i, height: 3 + i,
                  background: i % 3 === 0 ? 'var(--color-accent)' : i % 3 === 1 ? 'var(--color-accent)' : 'var(--color-primary-light)',
                  left: `${10 + i * 15}%`, bottom: '0', opacity: 0.2,
                }}
                animate={{ y: [0, -140 - i * 20], x: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 5)], opacity: [0.25, 0], scale: [1, 0.2] }}
                transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SuccessCheckmark />
              </motion.div>
            ) : (
              <motion.form key="form" ref={formRef} onSubmit={handleSubmit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-5 relative pt-2"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div custom={0} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FloatingLabel label="Your Name" name="name" required icon="fa-user" />
                  </motion.div>
                  <motion.div custom={1} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FloatingLabel label="Email Address" name="reply_to" type="email" required icon="fa-at" />
                  </motion.div>
                </div>
                <motion.div custom={2} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <FloatingLabel label="Subject" name="subject" icon="fa-tag" />
                </motion.div>
                <motion.div custom={3} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <FloatingLabel label="Tell me about your project…" name="message" isTextarea required icon="fa-pen-fancy" />
                </motion.div>
                <input type="hidden" name="time" value="" ref={(el) => { if (el) el.value = new Date().toLocaleString() }} />

                <motion.div custom={4} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.button type="submit" disabled={status === 'sending'}
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-2xl font-bold text-white text-base relative overflow-hidden group cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent), var(--color-accent))',
                      backgroundSize: '200% 200%', animation: 'gradient-shift 4s ease infinite',
                      opacity: status === 'sending' ? 0.8 : 1,
                      boxShadow: '0 8px 30px -5px rgba(37,99,235,0.35)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)' }}
                    />
                    <motion.div className="absolute inset-0 rounded-2xl"
                      animate={{ boxShadow: ['0 0 0 0 rgba(37,99,235,0.4)', '0 0 0 12px rgba(37,99,235,0)'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-3 relative">
                        <motion.i className="fa-solid fa-circle-notch" animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3 relative">
                        <i className="fa-solid fa-paper-plane"></i> Send Message
                        <i className="fa-solid fa-arrow-right text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"></i>
                      </span>
                    )}
                  </motion.button>
                </motion.div>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold"
                      style={{
                        background: 'color-mix(in oklab, var(--color-accent) 8%, transparent)',
                        border: '1px solid color-mix(in oklab, var(--color-accent) 20%, transparent)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      Something went wrong. Please try again or call me directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Alt contact — Phone + GitHub only */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center mt-10"
        >
          <motion.a href="tel:+8618583994003" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all"
            style={{
              background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
              color: 'var(--color-ink)', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.06)',
            }}
          >
            <span className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'color-mix(in oklab, var(--color-primary-light) 12%, transparent)' }}>
              <i className="fa-solid fa-phone text-xs" style={{ color: 'var(--color-primary-light)' }}></i>
            </span>
            Call Me
          </motion.a>
          <motion.a href="https://github.com/xohdik" target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all"
            style={{
              background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
              color: 'var(--color-ink)', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.06)',
            }}
          >
            <span className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'color-mix(in oklab, var(--color-ink) 8%, transparent)' }}>
              <i className="fa-brands fa-github text-xs"></i>
            </span>
            GitHub
          </motion.a>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

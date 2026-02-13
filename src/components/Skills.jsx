import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection'

const categories = [
  {
    icon: 'fa-shield-halved',
    title: 'Verification & AI4SE',
    skills: ['Formal Analysis', 'Program Graphs', 'Neuro-symbolic', 'GraphCodeBERT', 'PyTorch Geometric', 'TensorFlow'],
  },
  {
    icon: 'fa-laptop-code',
    title: 'Languages & Dev',
    skills: ['Python (Advanced)', 'Ruby / Rails', 'Java', 'C++', 'JavaScript / React', 'MATLAB'],
  },
  {
    icon: 'fa-cloud',
    title: 'Server / DevOps',
    skills: ['Ubuntu', 'Nginx', 'PostgreSQL', 'Docker', 'Cloudflare', 'Google Cloud (Vertex AI)'],
  },
]

const skillChipVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Black/white animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Moving diagonal lines */}
        <motion.div
          animate={{ x: [-200, 200] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 80px,
              var(--color-border) 80px,
              var(--color-border) 81px
            )`,
            opacity: 0.3,
          }}
        />
        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border"
            style={{
              width: 40 + i * 20,
              height: 40 + i * 20,
              borderColor: 'var(--color-ink)',
              opacity: 0.04 + i * 0.01,
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 3) * 25}%`,
              borderRadius: i % 2 === 0 ? '50%' : '8px',
              borderWidth: '1.5px',
            }}
            animate={{
              y: [0, -20 - i * 5, 0],
              rotate: [0, 90 * (i % 2 === 0 ? 1 : -1)],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative">
        <h2 className="section-title mb-12">Technical Toolkit</h2>
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <StaggerItem key={i}>
              <div className="portfolio-card h-full" style={{ background: i === 1 ? '#111827' : undefined, borderColor: i === 1 ? '#111827' : undefined }}>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: i === 1 ? 'rgba(255,255,255,0.1)' : 'var(--color-border-light)',
                        color: i === 1 ? 'white' : 'var(--color-primary)',
                      }}
                    >
                  <i className={`fa-solid ${cat.icon} text-xl`}></i>
                </div>
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{ color: i === 1 ? 'white' : 'var(--color-ink)' }}
                    >
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, j) => (
                    <motion.span
                      key={s}
                      custom={j}
                      variants={skillChipVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all"
                      style={{
                        background: i === 1 ? 'rgba(255,255,255,0.08)' : 'var(--color-surface)',
                        color: i === 1 ? 'rgba(255,255,255,0.85)' : 'var(--color-ink-muted)',
                        borderColor: i === 1 ? 'rgba(255,255,255,0.15)' : 'var(--color-border)',
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}

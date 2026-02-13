import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection'

const skillDescriptions = {
  'Formal Analysis': 'Mathematical methods to prove software correctness — ensuring code behaves exactly as specified.',
  'Program Graphs': 'Graph representations of code structure (AST, CFG, DFG) that capture semantic relationships between program elements.',
  'Neuro-symbolic': 'Hybrid AI combining neural networks with symbolic logic for interpretable and verifiable reasoning about code.',
  'GraphCodeBERT': 'Pre-trained model that understands code through data flow graphs, enabling semantic code search and analysis.',
  'PyTorch Geometric': 'Graph neural network library for learning on graph-structured data like program dependency graphs.',
  'TensorFlow': 'Google\'s deep learning framework used for building and deploying machine learning models at scale.',
  'Python (Advanced)': 'Primary language for research, data pipelines, ML/DL models, and automation scripts.',
  'Ruby / Rails': 'Full-stack web framework used for rapid application development and API backends.',
  'Java': 'Enterprise-grade language used for system design, Android development, and concurrent programming.',
  'C++': 'High-performance systems programming for algorithms, data structures, and performance-critical applications.',
  'JavaScript / React': 'Frontend development with React for building interactive SPAs, dashboards, and component-based UIs.',
  'MATLAB': 'Scientific computing for signal processing, beamforming simulations, and numerical analysis.',
  'Ubuntu': 'Primary server OS — deployment, configuration, security hardening, and system administration.',
  'Nginx': 'High-performance reverse proxy and web server for load balancing, SSL termination, and static file serving.',
  'PostgreSQL': 'Advanced relational database — complex queries, stored procedures, performance tuning, and replication.',
  'Docker': 'Containerization for consistent development environments, microservices, and deployment pipelines.',
  'Cloudflare': 'CDN, DDoS protection, DNS management, and edge caching for web application security and performance.',
  'Google Cloud (Vertex AI)': 'Cloud ML platform for training, deploying, and managing machine learning models at scale.',
}

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

function SkillChip({ skill, isDark, index }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const desc = skillDescriptions[skill]

  return (
    <div className="relative">
      <motion.button
        custom={index}
        variants={skillChipVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all cursor-pointer hover:scale-105"
        style={{
          background: isDark ? 'rgba(255,255,255,0.08)' : 'var(--color-surface)',
          color: isDark ? 'rgba(255,255,255,0.85)' : 'var(--color-ink-muted)',
          borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'var(--color-border)',
        }}
      >
        {skill}
      </motion.button>
      <AnimatePresence>
        {showTooltip && desc && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 rounded-xl shadow-xl text-xs leading-relaxed max-w-[240px] w-max pointer-events-none"
            style={{
              background: '#111827',
              color: '#f1f5f9',
              border: '1px solid #253350',
            }}
          >
            <div className="font-bold mb-1 text-white">{skill}</div>
            {desc}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #111827' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [-200, 200] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, var(--color-border) 80px, var(--color-border) 81px)`,
            opacity: 0.3,
          }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border"
            style={{
              width: 40 + i * 20, height: 40 + i * 20,
              borderColor: 'var(--color-ink)', opacity: 0.04 + i * 0.01,
              left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%`,
              borderRadius: i % 2 === 0 ? '50%' : '8px', borderWidth: '1.5px',
            }}
            animate={{ y: [0, -20 - i * 5, 0], rotate: [0, 90 * (i % 2 === 0 ? 1 : -1)] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative">
        <h2 className="section-title mb-4">Technical Toolkit</h2>
        <p className="text-sm mb-10" style={{ color: 'var(--color-ink-muted)' }}>
          <i className="fa-solid fa-hand-pointer mr-2"></i>Click any skill to learn more
        </p>
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <StaggerItem key={i}>
              <div className="portfolio-card h-full" style={{ background: i === 1 ? '#111827' : undefined, borderColor: i === 1 ? '#111827' : undefined }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: i === 1 ? 'rgba(255,255,255,0.1)' : 'var(--color-border-light)', color: i === 1 ? 'white' : 'var(--color-primary)' }}>
                  <i className={`fa-solid ${cat.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold mb-4" style={{ color: i === 1 ? 'white' : 'var(--color-ink)' }}>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, j) => (
                    <SkillChip key={s} skill={s} isDark={i === 1} index={j} />
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

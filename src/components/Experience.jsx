import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'

const experiences = [
  {
    icon: 'fa-crown',
    color: 'var(--color-amber)',
    title: 'CTO & Server Administrator',
    org: 'FRIENDRA — Self-hosted Social Networking',
    orgLink: 'https://www.friendra.com',
    period: '2023 – Present',
    items: [
      'Ubuntu server infrastructure on Contabo VPS, Nginx, SSL, Cloudflare security integration',
      'PostgreSQL database ops: backups, performance tuning, data integrity',
      'DevOps: automated deployment, system monitoring, incident response',
      '99.9% availability for 2,000+ users; zero critical security breaches',
    ],
    story: 'Friendra started as a personal project to build a privacy-first social network. I chose Mastodon\'s open-source framework and customized it from the ground up — deploying on a Contabo VPS, configuring Nginx reverse proxy with SSL, and setting up Cloudflare for DDoS protection. Managing a live platform with 2,000+ users taught me real-world DevOps: automated backups, zero-downtime deploys, and incident response. This experience directly shaped my understanding of building reliable, production-grade software — the same reliability I now pursue in my PhD research on software verification.',
  },
  {
    icon: 'fa-graduation-cap',
    color: 'var(--color-primary)',
    title: 'Graduate Software Engineer',
    org: 'UESTC — 2024–2026',
    period: '2024 – 2026',
    items: [
      'Graph neural networks for neural code retrieval (GraphCodeBERT-GAT)',
      'Large-scale software analysis: technical debt, vulnerability detection',
      'Full-stack development: React, Node.js, microservices architecture',
    ],
    story: 'At UESTC, I dove deep into the intersection of AI and software engineering. My Master\'s thesis on Explainable Graph Attention Networks for Code Retrieval was accepted at ICCWAMTIP 2025, achieving a 3.07% MRR improvement with 52% faster convergence. Beyond research, I built full-stack systems and taught Network Computing as a TA. This role crystallized my mission: making AI-generated code not just functional, but provably correct through neuro-symbolic reasoning.',
  },
  {
    icon: 'fa-database',
    color: 'var(--color-accent)',
    title: 'Data Engineer',
    org: 'Fidelity Pension Managers',
    period: '2021 – 2023',
    items: [
      'RSA portfolio management, regulatory compliance reporting',
      'Python scripts for automated data cleaning & transformation',
      'SQL optimization, stored procedures, dashboard development',
    ],
    story: 'At Fidelity Pension Managers, I transitioned from manual reporting to building automated data pipelines. I wrote Python scripts to clean and transform RSA portfolio data, optimized SQL stored procedures that cut report generation from hours to minutes, and developed dashboards that gave management real-time visibility into compliance metrics. This role taught me that good engineering is about reliability — pension data affects real lives. That principle of building trustworthy systems carries directly into my current research.',
  },
  {
    icon: 'fa-headset',
    color: 'var(--color-cyan)',
    title: 'Technical Support',
    org: 'Tekniteed Nigeria Limited',
    period: '2020 – 2021',
    items: [
      'Provided end-to-end technical support for enterprise clients',
      'Troubleshot hardware, software, and network infrastructure issues',
      'Documented solutions and contributed to internal knowledge base',
    ],
    story: 'Tekniteed was my entry into the professional tech world. Supporting enterprise clients gave me a ground-level understanding of how systems fail in production — from network misconfigurations to software compatibility issues. I built a habit of documenting every solution, which later became the foundation of my systematic approach to debugging and software analysis. Understanding how things break is the first step to building things that don\'t.',
  },
]

export default function Experience() {
  const [expanded, setExpanded] = useState(null)

  return (
    <AnimatedSection id="experience" className="py-20 lg:py-28">
      <div className="max-w-[900px] mx-auto px-6">
        <h2 className="section-title mb-14">Key Experience</h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5" style={{ background: 'var(--color-border)' }} />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative pl-16 lg:pl-20 pb-10 last:pb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-3.5 lg:left-5.5 w-5 h-5 rounded-full border-[3px] z-10 cursor-pointer"
                  style={{
                    borderColor: exp.color,
                    background: expanded === i ? exp.color : 'var(--color-surface)',
                  }}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                />

                {/* Period badge */}
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                  {exp.period}
                </div>

                {/* Card */}
                <motion.div
                  className="portfolio-card cursor-pointer"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  whileHover={{ x: 4 }}
                  layout
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `color-mix(in oklab, ${exp.color} 12%, transparent)`, color: exp.color }}
                    >
                      <i className={`fa-solid ${exp.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--color-ink)' }}>{exp.title}</h3>
                      <p className="text-sm font-semibold" style={{ color: exp.color }}>
                        {exp.orgLink ? (
                          <a href={exp.orgLink} target="_blank" rel="noreferrer" className="hover:underline"
                            onClick={(e) => e.stopPropagation()}>{exp.org}</a>
                        ) : exp.org}
                      </p>
                    </div>
                    <motion.i
                      className="fa-solid fa-chevron-down text-sm mt-2 flex-shrink-0"
                      style={{ color: 'var(--color-ink-muted)' }}
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Bullet items */}
                  <ul className="mt-4 space-y-2">
                    {exp.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                        <i className="fa-solid fa-circle-check mt-0.5 flex-shrink-0" style={{ color: exp.color }}></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable story */}
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5" style={{ borderTop: '1px dashed var(--color-border)' }}>
                          <div className="flex items-center gap-2 mb-3">
                            <i className="fa-solid fa-book-open text-sm" style={{ color: exp.color }}></i>
                            <span className="text-sm font-bold" style={{ color: exp.color }}>The Story</span>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                            {exp.story}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-3 text-xs font-semibold" style={{ color: exp.color, opacity: 0.7 }}>
                    {expanded === i ? 'Click to collapse' : 'Click to read the story →'}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

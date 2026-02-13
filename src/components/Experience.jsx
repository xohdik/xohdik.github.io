import React from 'react'
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection'

const experiences = [
  {
    icon: 'fa-crown',
    color: 'var(--color-gold)',
    title: 'CTO & Server Administrator',
    org: 'FRIENDRA — Self-hosted Social Networking',
    orgLink: 'https://www.friendra.com',
    items: [
      'Ubuntu server infrastructure on Contabo VPS, Nginx, SSL, Cloudflare security integration',
      'PostgreSQL database ops: backups, performance tuning, data integrity',
      'DevOps: automated deployment, system monitoring, incident response',
      '99.9% availability for 2,000+ users; zero critical security breaches',
    ],
  },
  {
    icon: 'fa-graduation-cap',
    color: 'var(--color-primary)',
    title: 'Graduate Software Engineer',
    org: 'UESTC — 2024–2026',
    items: [
      'Graph neural networks for neural code retrieval (GraphCodeBERT-GAT)',
      'Large-scale software analysis: technical debt, vulnerability detection',
      'Full-stack development: React, Node.js, microservices architecture',
    ],
  },
  {
    icon: 'fa-building',
    color: 'var(--color-accent)',
    title: 'Data Analyst',
    org: 'Fidelity Pension Managers',
    items: [
      'RSA portfolio management, regulatory compliance reporting',
      'Python scripts for automated data cleaning & transformation',
      'SQL optimization, stored procedures, dashboard development',
    ],
  },
  {
    icon: 'fa-headset',
    color: 'var(--color-cyan)',
    title: 'Technical Support',
    org: 'Tekniteed Nigeria Limited',
    items: [
      'Provided end-to-end technical support for enterprise clients',
      'Troubleshot hardware, software, and network infrastructure issues',
      'Documented solutions and contributed to internal knowledge base',
    ],
  },
]

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="section-title mb-12">Key Experience</h2>
        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {experiences.map((exp, i) => (
            <StaggerItem key={i}>
              <div className="portfolio-card h-full">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in oklab, ${exp.color} 12%, transparent)`, color: exp.color }}
                >
                  <i className={`fa-solid ${exp.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-ink)' }}>{exp.title}</h3>
                <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
                  {exp.orgLink ? (
                    <a href={exp.orgLink} target="_blank" rel="noreferrer" className="hover:underline">{exp.org}</a>
                  ) : exp.org}
                </p>
                <ul className="space-y-3">
                  {exp.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                      <i className="fa-solid fa-circle-check mt-0.5 flex-shrink-0" style={{ color: exp.color }}></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}

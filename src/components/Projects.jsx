import React from 'react'
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection'

const projects = [
  {
    icon: 'fa-server',
    color: 'var(--color-primary)',
    title: 'Friendra',
    desc: 'Self-hosted social networking platform built with privacy-first design. Full deployment pipeline, server administration, and community management for 2,000+ users.',
    chips: ['Ruby on Rails', 'React', 'PostgreSQL', 'Nginx'],
    links: [
      { label: 'Visit', href: 'https://www.friendra.com', icon: 'fa-arrow-up-right-from-square' },
      { label: 'GitHub', href: 'https://github.com/xohdik?tab=repositories', icon: 'fa-github' },
    ],
    badge: 'Active since 2023',
  },
  {
    icon: 'fa-code-branch',
    color: 'var(--color-accent)',
    title: 'Explainable Code Retrieval',
    desc: 'GraphCodeBERT-GAT: hierarchical graph attention network for neural code retrieval with explainability layers. Accepted at ICCWAMTIP 2025.',
    chips: ['PyTorch Geometric', 'GNN', 'Transformers'],
    badge: 'Published',
  },
  {
    icon: 'fa-project-diagram',
    color: 'var(--color-cyan)',
    title: 'Neuro-Symbolic Program Verification',
    desc: 'Hybrid approach combining formal methods with graph neural representations to verify AI-generated program behaviors before deployment.',
    chips: ['Neuro-symbolic', 'Program Analysis', 'GNN', 'Siamese Networks'],
    badge: 'Ongoing',
  },
  {
    icon: 'fa-utensils',
    color: 'var(--color-gold)',
    title: 'Restaurant Ordering System',
    desc: 'Full-stack ordering & kitchen display system with real-time order management.',
    chips: ['C++', 'Qt5', 'Crow', 'MongoDB'],
    links: [
      { label: 'Code', href: 'https://github.com/xohdik/Restaurant-Ordering-system', icon: 'fa-github' },
    ],
  },
  {
    icon: 'fa-heart-pulse',
    color: 'var(--color-accent)',
    title: 'E-Health Management',
    desc: 'Appointment scheduling and medical records management with role-based access.',
    chips: ['Node.js', 'MongoDB', 'React.js'],
    links: [
      { label: 'Code', href: 'https://github.com/xohdik/E-Health-Management-System', icon: 'fa-github' },
    ],
  },
  {
    icon: 'fa-flask',
    color: 'var(--color-primary)',
    title: 'Delay Encryption / Blockchain',
    desc: 'VDF-based blockchain consensus mechanisms with delay encryption for enhanced security protocols.',
    chips: ['Blockchain', 'Cryptography', 'VDF'],
  },
  {
    icon: 'fa-dna',
    color: 'var(--color-cyan)',
    title: 'Protein Interaction (STRING)',
    desc: 'Deep learning on protein-protein interaction graphs using graph neural networks.',
    chips: ['PyTorch Geometric', 'Bioinformatics'],
  },
  {
    icon: 'fa-satellite-dish',
    color: 'var(--color-primary)',
    title: 'Dual-Function Radar-Communication Design',
    desc: 'Deep learning-based joint radar-communication system design for efficient spectrum sharing and simultaneous target detection with data transmission.',
    chips: ['Deep Learning', 'Signal Processing', 'MIMO'],
  },
  {
    icon: 'fa-industry',
    color: 'var(--color-gold)',
    title: 'Industrial Park Detection with YOLO',
    desc: 'Real-time object detection system for industrial park environments using YOLO-based architectures for safety monitoring and automated surveillance.',
    chips: ['YOLOv8', 'Computer Vision', 'Object Detection'],
  },
  {
    icon: 'fa-brain',
    color: 'var(--color-accent)',
    title: 'QAFF-Net: Quality-Aware Frequency Fusion Network',
    desc: 'Building upon HFF-Net with three novel modules — Modality Reliability Estimation, Uncertainty-Aware FDCA, and Adaptive Frequency Gating — for robust brain tumor segmentation under degraded modality conditions.',
    chips: ['Medical Imaging', 'BraTS 2020', 'Frequency Decomposition', 'PyTorch'],
    badge: 'Ongoing',
  },
]

export default function Projects() {
  return (
    <AnimatedSection id="projects" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="section-title mb-12">Applied Projects</h2>
        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <StaggerItem key={i}>
              <div className="portfolio-card h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `color-mix(in oklab, ${p.color} 12%, transparent)`, color: p.color }}
                  >
                    <i className={`fa-solid ${p.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--color-ink)' }}>{p.title}</h3>
                      {p.badge && (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: `color-mix(in oklab, ${p.color} 10%, transparent)`,
                            color: p.color,
                          }}
                        >
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-ink-muted)' }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.chips.map(c => (
                    <span key={c} className="chip">{c}</span>
                  ))}
                </div>
                {p.links ? (
                  <div className="flex gap-3 mt-auto">
                    {p.links.map(l => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        <i className={`fa-${l.icon.startsWith('fa-github') ? 'brands' : 'solid'} ${l.icon}`}></i>
                        {l.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-3 mt-auto">
                    <a
                      href="https://github.com/xohdik?tab=repositories"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <i className="fa-brands fa-github"></i>
                      View Repos
                    </a>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}

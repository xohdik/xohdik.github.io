import React from 'react'
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection'

const pubs = [
  {
    title: 'GraphCodeBERT-GAT: Hierarchical Graph Attention Networks for Explainable Neural Code Retrieval',
    authors: 'Ologun, S Babatunde, Bo Chen, Rajab Ssemwogerere, Akpanika R. Ukot, Ryvel T. Stamber, Saio A. Marrah',
    venue: 'ICCWAMTIP 2025 — Accepted',
    color: 'var(--color-primary)',
  },
  {
    title: 'Federated Deep Learning for Privacy-Preserving Disease Detection in IoT-Enabled Healthcare Systems',
    authors: 'Marrah, S.A., Jiahao, W., Bakarr, K.A., Kamara, G.D., Ologun S Babatunde., et al.',
    venue: 'Frontiers in Computer Science — Accepted',
    color: 'var(--color-cyan)',
  },
  {
    title: 'Towards Intelligent Question-Answering Systems for Discrete Mathematics: Evaluating an Agentic RAG Approach',
    authors: 'Stamber, R.T., Wang, Q.X., Wang, W., Chen, B., and Ologun S. Babatunde',
    venue: 'Computers & Education — Accepted',
    color: 'var(--color-gold)',
  },
  {
    title: 'Enhanced Region-Aware Fusion Network: Multi-Modal 3D Brain Tumor Segmentation',
    authors: 'Semwogerere, R., Zhen, Q., Alzahrani, A.A.E., Ologun S Babatunde et al.',
    venue: 'ICCWAMTIP 2025 — Accepted',
    color: 'var(--color-accent)',
  },
]


export default function Publications() {
  return (
    <AnimatedSection id="publications" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="section-title mb-12">Recent Publications</h2>
        <StaggerContainer className="space-y-4 mb-10">
          {pubs.map((pub, i) => (
            <StaggerItem key={i}>
              <div className="portfolio-card">
                <div className="flex gap-4">
                  <div
                    className="w-1 rounded-full flex-shrink-0 self-stretch"
                    style={{ background: pub.color }}
                  ></div>
                  <div>
                    <h3 className="font-bold text-base mb-1.5" style={{ color: 'var(--color-ink)' }}>{pub.title}</h3>
                    <p className="text-sm mb-1.5" style={{ color: 'var(--color-ink-muted)' }}>{pub.authors}</p>
                    <p className="text-sm font-semibold italic" style={{ color: pub.color }}>{pub.venue}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </AnimatedSection>
  )
}

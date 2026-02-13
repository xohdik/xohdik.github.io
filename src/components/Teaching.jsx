import React from 'react'
import { AnimatedSection } from './AnimatedSection'

export default function Teaching() {
  return (
    <AnimatedSection id="teaching" className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="section-title mb-12">Teaching & Service</h2>
        <div className="portfolio-card">
          <div className="flex items-start gap-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'color-mix(in oklab, var(--color-accent) 12%, transparent)', color: 'var(--color-primary)' }}
            >
              <i className="fa-solid fa-chalkboard-user text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
                Teaching & Service
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                Teaching assistant at UESTC for Network Computing and Software Architecture courses.
                AI Engineer providing intelligent automation solutions, model development, and
                deployment pipelines for real-world applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

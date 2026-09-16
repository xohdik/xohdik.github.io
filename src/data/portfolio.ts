export const selectedWork = [
  {
    slug: 'friendra',
    index: '01',
    title: 'Friendra',
    role: 'Founder / CTO / Server Administrator',
    summary: 'A privacy-first social platform designed, deployed, and operated end-to-end, including infrastructure, PostgreSQL, Nginx, Cloudflare, monitoring, and incident response.',
    meta: 'Production systems · 2,000+ users · 99.9% availability',
    href: 'https://www.friendra.com',
    kind: 'Production platform',
    challenge: 'Run a real social platform reliably without hiding operational complexity behind a managed platform abstraction.',
    contribution: [
      'Designed the deployment architecture around Ubuntu, Nginx, PostgreSQL, SSL, and Cloudflare.',
      'Owned backup strategy, monitoring, incident response, server hardening, and deployment operations.',
      'Operated the platform for 2,000+ users while maintaining 99.9% availability.',
    ],
    stack: ['Linux', 'Nginx', 'PostgreSQL', 'Cloudflare', 'Ruby on Rails', 'React'],
  },
  {
    slug: 'graphcodebert-gat',
    index: '02',
    title: 'Explainable Code Retrieval',
    role: 'Research Engineer',
    summary: 'GraphCodeBERT-GAT combines pretrained code representations with hierarchical graph attention to make neural code retrieval more interpretable.',
    meta: 'PyTorch Geometric · GraphCodeBERT · GNNs',
    href: '/research',
    kind: 'Research system',
    challenge: 'Improve neural code retrieval while preserving a useful connection between model predictions and program structure.',
    contribution: [
      'Built a graph-based retrieval pipeline around pretrained code representations and hierarchical graph attention.',
      'Focused the model design on program dependencies rather than purely token-level similarity.',
      'Turned the research implementation into an auditable experimental system rather than a demo-only prototype.',
    ],
    stack: ['Python', 'PyTorch Geometric', 'GraphCodeBERT', 'Program graphs'],
  },
  {
    slug: 'benchmark-reliability',
    index: '03',
    title: 'Benchmark Reliability Audits',
    role: 'Software Engineering Research',
    summary: 'Research tooling for measuring evaluation leakage, contamination, entity overlap, and benchmark reliability across code intelligence tasks.',
    meta: 'Evaluation methodology · Static analysis · Reproducible experiments',
    href: '/research',
    kind: 'Research tooling',
    challenge: 'Separate real model capability from performance inflation caused by benchmark construction and train/test contamination.',
    contribution: [
      'Built leakage-aware experimental protocols and auditing tools for derived-example code benchmarks.',
      'Used entity-level grouping and intervention-based analysis to distinguish exposure from exploitability.',
      'Emphasized deterministic recomputation, invariants, and frozen artifacts for reproducibility.',
    ],
    stack: ['Python', 'Benchmark auditing', 'Program analysis', 'Statistical evaluation'],
  },
  {
    slug: 'data-platform-engineering',
    index: '04',
    title: 'Data & Platform Engineering',
    role: 'Engineer',
    summary: 'Production-oriented software spanning data pipelines, SQL optimization, full-stack systems, automation, and server administration.',
    meta: 'Python · PostgreSQL · React · Linux · Docker',
    href: '/#experience',
    kind: 'Engineering practice',
    challenge: 'Make operational data and software workflows dependable enough for daily use rather than one-off analysis.',
    contribution: [
      'Automated repetitive data cleaning and transformation workflows with Python.',
      'Optimized SQL and reporting paths to reduce operational turnaround time.',
      'Applied production debugging habits across infrastructure, software, and data layers.',
    ],
    stack: ['Python', 'SQL', 'PostgreSQL', 'React', 'Linux'],
  },
];

export const researchItems = [
  {
    title: 'GraphCodeBERT-GAT: Hierarchical Graph Attention Networks for Explainable Neural Code Retrieval',
    venue: 'ICCWAMTIP 2025',
    status: 'Published / accepted',
    focus: 'Explainable neural code retrieval with graph attention over program structure.',
  },
  {
    title: 'What Drives Neural Pairwise Bug Verification?',
    venue: 'Empirical Software Engineering submission',
    status: 'Under review',
    focus: 'Evaluation leakage, representation learning, graph structure, and multilingual generalization.',
  },
  {
    title: 'Entity-Level Leakage in Code Intelligence Benchmarks',
    venue: 'ACM TOSEM submission',
    status: 'Under review',
    focus: 'Predicting, measuring, and correcting contamination in derived-example datasets.',
  },
  {
    title: 'Multimodal Time Series Forecasting in Frequency Domain',
    venue: 'Ongoing research',
    status: 'Research project',
    focus: 'Frequency-domain multimodal forecasting with rigorous alignment and baseline validation.',
  },
];

export const experience = [
  ['2023 — NOW', 'CTO & Server Administrator', 'Friendra', 'Production infrastructure, deployment, databases, monitoring, security, and platform reliability.'],
  ['2024 — 2026', 'Graduate Software Engineer', 'UESTC', 'Research and engineering across AI for software engineering, code intelligence, program analysis, and full-stack systems.'],
  ['2021 — 2023', 'Data Engineer', 'Fidelity Pension Managers', 'Python automation, SQL optimization, data transformation, reporting, and operational data systems.'],
  ['2020 — 2021', 'Technical Support', 'Tekniteed Nigeria Limited', 'Enterprise troubleshooting across software, hardware, and network infrastructure.'],
];

export const capabilities = [
  'Software architecture', 'Production systems', 'Python', 'TypeScript / JavaScript', 'React', 'PostgreSQL',
  'Linux / Nginx', 'Docker', 'Program analysis', 'Graph neural networks', 'PyTorch', 'Code intelligence',
];

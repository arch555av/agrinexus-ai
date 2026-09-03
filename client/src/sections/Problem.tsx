import { useEffect, useRef, useState } from 'react'

const problems = [
  {
    num: '01',
    title: 'Fragmented Agricultural Data',
    desc: 'Satellite, soil, weather, and crop data exist in silos. Farmers cannot combine them into a single decision.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="18" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
        <rect x="2" y="18" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
        <rect x="18" y="18" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M14 8h4M8 14v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
    color: 'var(--color-earth)',
    bg: 'rgba(155,115,64,0.08)',
  },
  {
    num: '02',
    title: 'Limited Access to Advanced Intelligence',
    desc: 'Precision agriculture tools are expensive, technically complex, and built for large commercial operations — not smallholder farmers.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    color: 'var(--color-sky)',
    bg: 'rgba(74,143,170,0.08)',
  },
  {
    num: '03',
    title: 'Climate and Crop Uncertainty',
    desc: 'Changing climate patterns create unpredictable growing conditions. Traditional advisory systems cannot adapt fast enough.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 22c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M11 10L10 6M21 10l1-4M16 8V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M4 26h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <circle cx="8" cy="26" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="16" cy="26" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="24" cy="26" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    color: '#6B8C5A',
    bg: 'rgba(107,140,90,0.08)',
  },
  {
    num: '04',
    title: 'Advice Without Follow-Through',
    desc: 'Most advisory systems deliver a recommendation and stop. There is no loop — no follow-up, no outcome tracking, no learning.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M10 13h8M10 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="26" cy="24" r="5" fill="var(--color-parchment)" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 24l1.5 1.5L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        <line x1="24" y1="22" x2="28" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    ),
    color: '#8B5A2B',
    bg: 'rgba(139,90,43,0.08)',
  },
]

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function Problem() {
  const { ref, inView } = useInView(0.15)

  return (
    <section
      style={{ background: 'var(--color-cream)', borderTop: '1px solid var(--color-sand)' }}
      className="section-pad"
    >
      <div className="container-wide" ref={ref}>
        <div style={{ maxWidth: 680, marginBottom: '3.5rem' }}>
          <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem' }}>
            The Challenge
          </div>
          <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ marginBottom: '1rem' }}>
            Agriculture Has Data.<br />Farmers Need Decisions.
          </h2>
          <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            Farmers often have fragmented information from weather, soil, satellite imagery, and crop observations. The challenge is turning these disconnected signals into timely, localized, understandable decisions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {problems.map((p, i) => (
            <div
              key={p.num}
              className={`card-base ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{
                padding: '1.75rem',
                animationDelay: `${(i + 3) * 100}ms`,
                borderTop: `3px solid ${p.color}`,
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: p.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.color,
                marginBottom: '1.25rem',
              }}>
                {p.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.7rem',
                color: p.color,
                letterSpacing: '0.08em',
                marginBottom: '0.5rem',
                fontWeight: 500,
              }}>
                {p.num}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-family-body)',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: 'var(--color-forest)',
                marginBottom: '0.625rem',
                lineHeight: 1.35,
              }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.65, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

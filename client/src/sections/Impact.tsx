import { useEffect, useRef, useState } from 'react'

const metrics = [
  {
    value: 'Better',
    unit: 'Decisions',
    desc: 'Farmers make more informed, data-backed decisions with contextual AI intelligence rather than guesswork.',
    icon: '🧠',
    color: '#3D7A52',
    bg: 'rgba(61,122,82,0.07)',
  },
  {
    value: 'Earlier',
    unit: 'Risk Detection',
    desc: 'Satellite and climate intelligence identifies crop stress and disease risk days before visible symptoms appear.',
    icon: '🛰',
    color: '#4A8FAA',
    bg: 'rgba(74,143,170,0.07)',
  },
  {
    value: 'Higher',
    unit: 'Advisory Adoption',
    desc: 'The closed-loop follow-up system significantly improves the rate at which farmers act on recommendations.',
    icon: '📈',
    color: '#9B7340',
    bg: 'rgba(155,115,64,0.07)',
  },
  {
    value: 'More Efficient',
    unit: 'Resource Use',
    desc: 'Targeted, location-specific advice reduces overuse of water, fertilizers, and pesticides.',
    icon: '💧',
    color: '#264D38',
    bg: 'rgba(38,77,56,0.07)',
  },
  {
    value: 'Stronger',
    unit: 'Climate Resilience',
    desc: 'Regenerative agriculture recommendations help farms adapt to long-term climate change.',
    icon: '🌱',
    color: '#6BAE7A',
    bg: 'rgba(107,174,122,0.07)',
  },
  {
    value: 'Cross-Border',
    unit: 'Cooperation',
    desc: 'BRICS nations share agricultural intelligence and coordinate interventions without compromising farmer privacy.',
    icon: '🌍',
    color: '#1A3D28',
    bg: 'rgba(26,61,40,0.07)',
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function Impact() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="impact" style={{ background: 'var(--color-parchment)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem' }}>
          <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Projected Impact
          </div>
          <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Measurable Change<br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-leaf)' }}>At Every Level.</span>
          </h2>
          <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ textAlign: 'center', margin: '0 auto' }}>
            AgriNexus is designed to deliver compounding impact — from individual farm decisions to regional food security and cross-border cooperation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {metrics.map((m, i) => (
            <div
              key={m.unit}
              className={`${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{
                animationDelay: `${(i % 3) * 100 + 300}ms`,
                padding: '2rem 1.75rem',
                background: m.bg,
                border: `1px solid ${m.color}20`,
                borderRadius: 18,
                borderTop: `2px solid ${m.color}`,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${m.color}18`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{m.icon}</div>
              <div style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                color: m.color,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '0.25rem',
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-stone)',
                fontWeight: 500,
                marginBottom: '0.875rem',
              }}>
                {m.unit}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-bark)', lineHeight: 1.65, margin: 0 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        <div className={`${inView ? 'animate-fade-up delay-600' : 'opacity-0'}`} style={{
          marginTop: '2.5rem',
          padding: '1.5rem 2rem',
          background: 'var(--color-warm-white)',
          border: '1px solid var(--color-dune)',
          borderRadius: 16,
          display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: '1.5rem' }}>📋</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
              Research Foundation
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-stone)' }}>
              Impact projections are grounded in published research on precision agriculture, AI advisory systems, and BRICS agricultural cooperation frameworks.
            </div>
          </div>
          <div style={{
            marginLeft: 'auto',
            padding: '0.375rem 0.875rem',
            borderRadius: 999,
            background: 'rgba(155,115,64,0.1)',
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.68rem',
            color: 'var(--color-earth)',
            letterSpacing: '0.05em',
            flexShrink: 0,
          }}>
            Prototype / Demo Data
          </div>
        </div>
      </div>
    </section>
  )
}

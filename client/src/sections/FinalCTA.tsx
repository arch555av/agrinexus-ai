import { useEffect, useRef, useState } from 'react'

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

export default function FinalCTA() {
  const { ref, inView } = useInView(0.2)

  return (
    <section style={{ background: 'var(--color-forest)', position: 'relative', overflow: 'hidden' }} className="section-pad">
      {/* Background elements */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)`,
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(ellipse at center, rgba(61,122,82,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-wide" ref={ref} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Loop visualization */}
        <div className={`${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ display: 'flex', justifyContent: 'center', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {['Sense', 'Understand', 'Predict', 'Advise', 'Act', 'Verify', 'Scale'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{
                padding: '0.3rem 0.75rem',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.7)',
              }}>
                {step}
              </span>
              {i < 6 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>→</span>}
            </div>
          ))}
        </div>

        <h2
          className={`${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`}
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            color: 'var(--color-cream)',
            letterSpacing: '-0.025em',
            marginBottom: '1.25rem',
          }}
        >
          Smarter Farms.<br />Stronger Communities.<br />
          <span style={{ color: 'var(--color-sprout)', fontStyle: 'italic' }}>A More Resilient Future.</span>
        </h2>

        <p
          className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75,
            maxWidth: 560,
            margin: '0 auto 2.5rem',
          }}
        >
          AgriNexus AI connects farmers, data, intelligence, and institutions into one continuous agricultural intelligence network — designed for scale, built for trust.
        </p>

        <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`} style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a href="#pillars" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--color-parchment)',
            color: 'var(--color-forest)',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 700,
            fontSize: '0.95rem',
            padding: '0.875rem 2rem',
            borderRadius: 9,
            textDecoration: 'none',
            transition: 'transform 0.15s ease',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
          >
            Explore the Platform
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#dashboard" className="btn-secondary" style={{
            border: '1.5px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.85)',
            padding: '0.875rem 2rem',
          }}>
            View the Intelligence
          </a>
          <a href="#brics" className="btn-secondary" style={{
            border: '1.5px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.85)',
            padding: '0.875rem 2rem',
          }}>
            Explore the BRICS Network
          </a>
        </div>

        {/* Trust badges */}
        <div className={`${inView ? 'animate-fade-up delay-400' : 'opacity-0'}`} style={{
          display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {[
            { icon: '🏆', label: 'Code for Communities — Second Edition', sub: 'Track 4: AgriN & Regenerative Intelligence' },
            { icon: '🤝', label: 'BRICS Cooperation Vision', sub: 'India · Brazil · Russia · China · South Africa' },
            { icon: '✦', label: 'Built with Google AI', sub: 'Gemini · Earth Engine · Vertex AI' },
          ].map(badge => (
            <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{badge.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '0.825rem', color: 'rgba(255,255,255,0.8)' }}>{badge.label}</div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>{badge.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

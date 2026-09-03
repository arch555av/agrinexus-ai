import { useEffect, useRef, useState } from 'react'

const nodes = [
  { id: 'farmer', x: 80, y: 220, label: 'Farmer Input', icon: '👤', sub: 'Voice · Image · Text' },
  { id: 'satellite', x: 260, y: 80, label: 'Satellite', icon: '🛰', sub: 'Earth Engine · NDVI' },
  { id: 'weather', x: 440, y: 50, label: 'Weather', icon: '🌤', sub: 'Climate · Forecast' },
  { id: 'soil', x: 260, y: 360, label: 'Soil Data', icon: '🌱', sub: 'Health · Nutrients' },
  { id: 'location', x: 120, y: 380, label: 'Location', icon: '📍', sub: 'Maps · Boundaries' },
  { id: 'ai', x: 440, y: 210, label: 'AgriNexus AI', icon: '⬡', sub: 'Gemini · Vertex AI', isCenter: true },
  { id: 'reco', x: 640, y: 210, label: 'Recommendation', icon: '✓', sub: 'Actionable · Local' },
]

const edges = [
  { from: 'farmer', to: 'ai' },
  { from: 'satellite', to: 'ai' },
  { from: 'weather', to: 'ai' },
  { from: 'soil', to: 'ai' },
  { from: 'location', to: 'ai' },
  { from: 'ai', to: 'reco' },
]

function getNode(id: string) {
  return nodes.find(n => n.id === id)!
}

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const [activeEdge, setActiveEdge] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEdge(prev => (prev + 1) % edges.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        background: `linear-gradient(160deg, var(--color-parchment) 0%, var(--color-cream) 60%, rgba(193,224,204,0.18) 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26,61,40,0.06) 1px, transparent 0)`,
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Left: Text */}
        <div>
          <div className={`label-tag ${visible ? 'animate-fade-up' : ''}`} style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-leaf)', display: 'inline-block' }} />
            Agentic Agricultural Intelligence · BRICS
          </div>

          <h1 className={`${visible ? 'animate-fade-up delay-100' : ''}`} style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
            lineHeight: 1.1,
            color: 'var(--color-forest)',
            letterSpacing: '-0.025em',
            marginBottom: '1.25rem',
            margin: 0,
          }}>
            From Farm Signals<br />
            to Smarter<br />
            <span style={{ color: 'var(--color-leaf)', fontStyle: 'italic' }}>Decisions.</span>
          </h1>

          <p className={`${visible ? 'animate-fade-up delay-200' : ''}`} style={{
            fontSize: '1.1rem',
            color: 'var(--color-stone)',
            lineHeight: 1.75,
            maxWidth: 520,
            marginTop: '1.5rem',
            marginBottom: '1rem',
          }}>
            AgriNexus AI turns satellite data, climate intelligence, soil insights, and farmer-generated information into localized, actionable agricultural intelligence.
          </p>

          <div className={`${visible ? 'animate-fade-up delay-300' : ''}`} style={{
            display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
            marginBottom: '2.25rem', marginTop: '1.25rem',
          }}>
            {['Sense', 'Understand', 'Predict', 'Advise', 'Act', 'Verify', 'Scale'].map((step, i) => (
              <span key={step} style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
                color: 'var(--color-leaf)',
                fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '0.3rem',
              }}>
                {step}{i < 6 && <span style={{ color: 'var(--color-dune)', fontSize: '0.8rem' }}>→</span>}
              </span>
            ))}
          </div>

          <div className={`${visible ? 'animate-fade-up delay-400' : ''}`} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <a href="#pillars" className="btn-primary">
              Explore AgriNexus AI
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#loop" className="btn-secondary">
              See How It Works
            </a>
          </div>

          {/* Trust signals */}
          <div className={`${visible ? 'animate-fade-up delay-500' : ''}`} style={{
            marginTop: '2.5rem',
            display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
          }}>
            {[
              { label: 'Built with Gemini AI', color: 'var(--color-sky)' },
              { label: 'BRICS Cooperation', color: 'var(--color-earth)' },
              { label: 'Code for Communities', color: 'var(--color-leaf)' },
            ].map(t => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.color }} />
                <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', letterSpacing: '0.05em', color: 'var(--color-stone)', textTransform: 'uppercase' }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated SVG Pipeline */}
        <div className={`${visible ? 'animate-fade-in delay-300' : ''}`} style={{ position: 'relative' }}>
          <div style={{
            background: 'var(--color-warm-white)',
            border: '1px solid var(--color-dune)',
            borderRadius: 24,
            padding: '2rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--color-stone)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Agricultural Intelligence Pipeline
            </div>
            <svg
              viewBox="0 0 740 450"
              style={{ width: '100%', height: 'auto' }}
              aria-label="AgriNexus AI data pipeline visualization"
            >
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="var(--color-leaf)" />
                </marker>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Edges */}
              {edges.map((edge, i) => {
                const from = getNode(edge.from)
                const to = getNode(edge.to)
                const isActive = activeEdge === i
                const mx = (from.x + to.x) / 2
                const my = (from.y + to.y) / 2 - 20

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <path
                      d={`M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`}
                      fill="none"
                      stroke={isActive ? 'var(--color-leaf)' : 'var(--color-dune)'}
                      strokeWidth={isActive ? 2 : 1.5}
                      strokeDasharray={isActive ? '6 3' : '4 4'}
                      markerEnd={edge.to === 'reco' ? 'url(#arrow)' : undefined}
                      style={{
                        transition: 'stroke 0.4s ease, stroke-width 0.4s ease',
                        filter: isActive ? 'url(#glow)' : undefined,
                      }}
                    />
                    {isActive && (
                      <circle r="5" fill="var(--color-leaf)" opacity="0.9">
                        <animateMotion
                          dur="1.2s"
                          path={`M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`}
                          fill="freeze"
                        />
                      </circle>
                    )}
                  </g>
                )
              })}

              {/* Nodes */}
              {nodes.map(node => (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                  {node.isCenter ? (
                    <>
                      <circle cx="0" cy="0" r="44" fill="var(--color-forest)" />
                      <circle cx="0" cy="0" r="44" fill="none" stroke="var(--color-leaf)" strokeWidth="2" opacity="0.5" />
                      <circle cx="0" cy="0" r="52" fill="none" stroke="var(--color-leaf)" strokeWidth="1" opacity="0.2">
                        <animate attributeName="r" values="44;60;44" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <text textAnchor="middle" dy="-6" fill="var(--color-parchment)" fontSize="20">{node.icon}</text>
                      <text textAnchor="middle" dy="14" fill="var(--color-mint)" fontSize="11" fontFamily="var(--font-family-mono)">
                        AgriNexus
                      </text>
                      <text textAnchor="middle" dy="28" fill="var(--color-sprout)" fontSize="9" fontFamily="var(--font-family-mono)">
                        AI
                      </text>
                    </>
                  ) : (
                    <>
                      <circle cx="0" cy="0" r="32" fill="var(--color-warm-white)" stroke="var(--color-dune)" strokeWidth="1.5" />
                      <text textAnchor="middle" dy="6" fontSize="18">{node.icon}</text>
                      <text textAnchor="middle" dy="50" fill="var(--color-forest)" fontSize="10.5" fontFamily="var(--font-family-body)" fontWeight="600">{node.label}</text>
                      <text textAnchor="middle" dy="63" fill="var(--color-stone)" fontSize="9" fontFamily="var(--font-family-mono)">{node.sub}</text>
                    </>
                  )}
                </g>
              ))}

              {/* Background farm field suggestion */}
              <ellipse cx="440" cy="350" rx="220" ry="60" fill="rgba(107,174,122,0.06)" />
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-sand)' }}>
              {[
                { color: 'var(--color-leaf)', label: 'Active signal' },
                { color: 'var(--color-dune)', label: 'Passive connection' },
                { color: 'var(--color-sky)', label: 'Satellite layer' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: 16, height: 2, background: l.color, borderRadius: 1 }} />
                  <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'var(--color-stone)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }} className="animate-float">
        <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--color-stone)', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--color-dune)" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2.5" fill="var(--color-leaf)">
            <animate attributeName="cy" values="8;14;8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero > div.container-wide {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}

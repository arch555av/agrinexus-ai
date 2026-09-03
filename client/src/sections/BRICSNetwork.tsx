import { useEffect, useRef, useState } from 'react'

const countries = [
  { id: 'india', name: 'India', cx: 540, cy: 200, color: '#E67E22', crops: 'Wheat · Rice · Cotton', flag: '🇮🇳' },
  { id: 'brazil', name: 'Brazil', cx: 195, cy: 265, color: '#27AE60', crops: 'Soy · Coffee · Sugarcane', flag: '🇧🇷' },
  { id: 'russia', name: 'Russia', cx: 500, cy: 100, color: '#3498DB', crops: 'Wheat · Sunflower · Barley', flag: '🇷🇺' },
  { id: 'china', name: 'China', cx: 600, cy: 155, color: '#E74C3C', crops: 'Rice · Wheat · Maize', flag: '🇨🇳' },
  { id: 'southafrica', name: 'South Africa', cx: 480, cy: 310, color: '#F39C12', crops: 'Maize · Sugarcane · Citrus', flag: '🇿🇦' },
]

const connections = [
  { from: 'india', to: 'brazil' },
  { from: 'india', to: 'russia' },
  { from: 'india', to: 'china' },
  { from: 'india', to: 'southafrica' },
  { from: 'brazil', to: 'southafrica' },
  { from: 'russia', to: 'china' },
  { from: 'china', to: 'southafrica' },
]

const dataFlows = [
  { label: 'Crop Models', desc: 'Regional ML models shared across BRICS partner institutions' },
  { label: 'Risk Patterns', desc: 'Climate and pest risk patterns shared for early warning' },
  { label: 'Seasonal Insights', desc: 'Aggregated seasonal performance and adaptation data' },
  { label: 'Policy Intelligence', desc: 'Intervention outcome data for cross-border policy coordination' },
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

export default function BRICSNetwork() {
  const { ref, inView } = useInView(0.1)
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [flowActive, setFlowActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => setFlowActive(prev => (prev + 1) % connections.length), 1800)
    return () => clearInterval(interval)
  }, [inView])

  function getCountry(id: string) {
    return countries.find(c => c.id === id)!
  }

  return (
    <section id="brics" style={{ background: 'var(--color-cream)', borderTop: '1px solid var(--color-sand)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3rem' }}>
          <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            BRICS Cooperation Layer
          </div>
          <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Agricultural Intelligence<br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-leaf)' }}>Should Cross Borders.</span>
          </h2>
          <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ textAlign: 'center', margin: '0 auto' }}>
            AgriNexus is designed as an interoperable digital public-good architecture where participating regions can share agricultural models and insights without centralizing sensitive farmer-level data.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '3rem', alignItems: 'center' }}>
          {/* BRICS Map visualization */}
          <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
            <div style={{
              background: 'var(--color-warm-white)',
              border: '1px solid var(--color-dune)',
              borderRadius: 20,
              padding: '1.5rem',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--color-stone)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                BRICS Agricultural Intelligence Network
              </div>

              <svg viewBox="0 0 740 420" style={{ width: '100%', display: 'block' }} aria-label="BRICS countries network map">
                {/* World map background - simplified continents */}
                <defs>
                  <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="rgba(194,224,204,0.15)" />
                    <stop offset="100%" stopColor="rgba(242,238,230,0.05)" />
                  </radialGradient>
                </defs>
                <rect width="740" height="420" fill="rgba(194,224,204,0.06)" rx="12" />

                {/* Simplified continent shapes */}
                {/* Europe/Asia landmass */}
                <path d="M260 60 Q320 40 420 55 Q520 50 600 70 Q680 90 700 140 Q720 190 680 220 Q640 240 580 230 Q520 220 480 250 Q440 280 400 300 Q360 320 320 290 Q280 260 300 220 Q320 180 280 160 Q240 140 220 110 Z" fill="rgba(100,150,100,0.08)" stroke="rgba(100,150,100,0.12)" strokeWidth="1" />

                {/* Africa */}
                <path d="M360 260 Q400 250 420 270 Q450 300 460 340 Q460 380 430 390 Q400 395 380 375 Q350 350 340 310 Q330 280 360 260 Z" fill="rgba(100,150,100,0.08)" stroke="rgba(100,150,100,0.12)" strokeWidth="1" />

                {/* Americas */}
                <path d="M60 80 Q120 60 160 90 Q200 120 190 160 Q180 200 200 240 Q220 280 180 310 Q140 330 110 300 Q80 270 70 230 Q55 180 40 140 Q30 100 60 80 Z" fill="rgba(100,150,100,0.08)" stroke="rgba(100,150,100,0.12)" strokeWidth="1" />

                {/* Grid lines */}
                {[120, 240, 360, 480, 600].map(x => (
                  <line key={x} x1={x} y1="20" x2={x} y2="400" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
                ))}
                {[80, 160, 240, 320].map(y => (
                  <line key={y} x1="20" y1={y} x2="720" y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
                ))}

                {/* Connection lines */}
                {connections.map((conn, i) => {
                  const from = getCountry(conn.from)
                  const to = getCountry(conn.to)
                  const isActive = flowActive === i
                  return (
                    <g key={`conn-${i}`}>
                      <line
                        x1={from.cx} y1={from.cy}
                        x2={to.cx} y2={to.cy}
                        stroke={isActive ? from.color : 'rgba(0,0,0,0.08)'}
                        strokeWidth={isActive ? 2 : 1}
                        strokeDasharray={isActive ? '6 3' : '3 5'}
                        style={{ transition: 'stroke 0.4s ease' }}
                      />
                      {isActive && (
                        <circle r="4" fill={from.color} opacity="0.8">
                          <animateMotion
                            dur="1.8s"
                            path={`M${from.cx},${from.cy} L${to.cx},${to.cy}`}
                            fill="remove"
                            repeatCount="1"
                          />
                        </circle>
                      )}
                    </g>
                  )
                })}

                {/* Country nodes */}
                {countries.map(c => {
                  const isActive = activeCountry === c.id
                  const isConnected = activeCountry ? connections.some(conn => conn.from === activeCountry && conn.to === c.id || conn.from === c.id && conn.to === activeCountry) : false
                  return (
                    <g
                      key={c.id}
                      transform={`translate(${c.cx}, ${c.cy})`}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setActiveCountry(c.id)}
                      onMouseLeave={() => setActiveCountry(null)}
                    >
                      <circle r={isActive ? 22 : 16} fill={c.color} opacity={isConnected ? 0.9 : isActive ? 1 : 0.75} style={{ transition: 'all 0.2s ease' }} />
                      {isActive && (
                        <circle r="28" fill="none" stroke={c.color} strokeWidth="1.5" opacity="0.3">
                          <animate attributeName="r" values="22;34;22" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <text textAnchor="middle" dy="4" fontSize="12" style={{ userSelect: 'none' }}>{c.flag}</text>
                      <text textAnchor="middle" dy={isActive ? 36 : 30} fontSize="9.5" fill="var(--color-forest)" fontFamily="var(--font-family-body)" fontWeight="600" style={{ userSelect: 'none' }}>{c.name}</text>
                    </g>
                  )
                })}

                {/* Active country detail */}
                {activeCountry && (() => {
                  const c = getCountry(activeCountry)
                  return (
                    <g>
                      <rect x="20" y="350" width="240" height="56" rx="8" fill="rgba(10,10,10,0.75)" />
                      <text x="32" y="368" fontSize="10" fill={c.color} fontFamily="var(--font-family-mono)">{c.flag} {c.name}</text>
                      <text x="32" y="386" fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-family-mono)">{c.crops}</text>
                    </g>
                  )
                })()}
              </svg>
            </div>
          </div>

          {/* Right: Data flows */}
          <div>
            <div className={`${inView ? 'animate-fade-up delay-400' : 'opacity-0'}`} style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                Privacy-First Cross-Border Architecture
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.7, margin: 0 }}>
                Individual farmer data never leaves national boundaries. Only anonymized, aggregated agricultural intelligence is shared — enabling genuine cooperation without privacy compromise.
              </p>
            </div>

            {/* Flow visualization */}
            <div className={`${inView ? 'animate-fade-up delay-500' : 'opacity-0'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {['Local Data', '→', 'Regional Intelligence', '→', 'Shared Models', '→', 'BRICS Cooperation'].map((item, i) => (
                <span key={i} style={{
                  fontFamily: item === '→' ? 'inherit' : 'var(--font-family-mono)',
                  fontSize: item === '→' ? '1rem' : '0.72rem',
                  color: item === '→' ? 'var(--color-dune)' : 'var(--color-forest)',
                  background: item === '→' ? 'transparent' : 'rgba(61,122,82,0.1)',
                  padding: item === '→' ? '0' : '0.2rem 0.6rem',
                  borderRadius: item === '→' ? 0 : 4,
                  fontWeight: item === '→' ? 400 : 500,
                  letterSpacing: '0.04em',
                }}>
                  {item}
                </span>
              ))}
            </div>

            <div className={`${inView ? 'animate-fade-up delay-500' : 'opacity-0'}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {dataFlows.map((flow, i) => (
                <div key={flow.label} style={{
                  padding: '1rem 1.125rem',
                  background: 'var(--color-warm-white)',
                  border: '1px solid var(--color-dune)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `rgba(${[61, 74, 155, 26][i]},${[122, 143, 115, 61][i]},${[82, 170, 64, 40][i]}, 0.12)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.7rem',
                    color: `rgb(${[61, 74, 155, 26][i]},${[122, 143, 115, 61][i]},${[82, 170, 64, 40][i]})`,
                    fontWeight: 600,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-forest)', marginBottom: '0.2rem' }}>{flow.label}</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--color-stone)', lineHeight: 1.55 }}>{flow.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${inView ? 'animate-fade-up delay-600' : 'opacity-0'}`} style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {countries.map(c => (
                <div key={c.id} style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.25rem 0.625rem',
                  background: 'var(--color-warm-white)',
                  border: '1px solid var(--color-dune)',
                  borderRadius: 999,
                  cursor: 'pointer',
                }}
                  onMouseEnter={() => setActiveCountry(c.id)}
                  onMouseLeave={() => setActiveCountry(null)}
                >
                  <span style={{ fontSize: '0.875rem' }}>{c.flag}</span>
                  <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'var(--color-stone)' }}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #brics .container-wide > div[style*="grid-template-columns: 1.3fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

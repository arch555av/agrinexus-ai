import { useEffect, useRef, useState } from 'react'

const timePeriods = ['Past 30 days', 'Past 7 days', 'Today']

const ndviZones = [
  { id: 'zone-a', label: 'Zone A', ndvi: 0.71, status: 'Healthy', color: '#3D7A52', fill: 'rgba(61,122,82,0.65)', path: 'M 120 80 L 280 70 L 300 160 L 260 200 L 130 190 Z' },
  { id: 'zone-b', label: 'Zone B', ndvi: 0.52, status: 'Moderate', color: '#C9A000', fill: 'rgba(201,160,0,0.6)', path: 'M 260 200 L 300 160 L 380 170 L 370 250 L 280 260 Z' },
  { id: 'zone-c', label: 'Zone C', ndvi: 0.34, status: 'Stressed', color: '#D4551A', fill: 'rgba(212,85,26,0.65)', path: 'M 130 190 L 260 200 L 280 260 L 240 310 L 100 290 Z' },
  { id: 'zone-d', label: 'Zone D', ndvi: 0.62, status: 'Good', color: '#5B9C72', fill: 'rgba(91,156,114,0.6)', path: 'M 280 260 L 370 250 L 380 330 L 300 360 L 240 310 Z' },
]

const weatherPoints = [
  { x: 320, y: 110, icon: '🌤', label: '24°C, Low wind' },
  { x: 180, y: 140, icon: '💧', label: 'Irrigation active' },
]

const riskPoints = [
  { x: 200, y: 240, icon: '⚠️', label: 'Stress detected', color: '#D4551A' },
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

export default function SatelliteIntelligence() {
  const { ref, inView } = useInView(0.1)
  const [period, setPeriod] = useState(2)
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [showNDVI, setShowNDVI] = useState(true)
  const [showWeather, setShowWeather] = useState(true)

  return (
    <section id="satellite" style={{ background: 'var(--color-parchment)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left: Map */}
          <div className={`${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            <div style={{
              background: 'var(--color-warm-white)',
              border: '1px solid var(--color-dune)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
            }}>
              {/* Map header */}
              <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--color-sand)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3D7A52', animation: 'pulseRing 2s ease-out infinite' }} />
                  <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', color: 'var(--color-stone)', letterSpacing: '0.06em' }}>
                    LIVE SATELLITE · Rajasthan, India
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'var(--color-dune)' }}>
                  17.8229°N 83.1224°E
                </div>
              </div>

              {/* Layer toggles */}
              <div style={{ padding: '0.625rem 1.25rem', borderBottom: '1px solid var(--color-sand)', display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'NDVI Zones', active: showNDVI, toggle: () => setShowNDVI(!showNDVI), color: '#3D7A52' },
                  { label: 'Weather Layer', active: showWeather, toggle: () => setShowWeather(!showWeather), color: '#4A8FAA' },
                ].map(l => (
                  <button key={l.label} onClick={l.toggle} style={{
                    padding: '0.25rem 0.625rem',
                    borderRadius: 4,
                    border: `1px solid ${l.active ? l.color + '60' : 'var(--color-sand)'}`,
                    background: l.active ? l.color + '14' : 'transparent',
                    color: l.active ? l.color : 'var(--color-stone)',
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.68rem',
                    cursor: 'pointer',
                    fontWeight: l.active ? 600 : 400,
                    letterSpacing: '0.05em',
                  }}>
                    {l.label}
                  </button>
                ))}
              </div>

              {/* SVG Farm Map */}
              <div style={{ position: 'relative' }}>
                <svg viewBox="0 0 500 420" style={{ width: '100%', display: 'block' }} aria-label="Farm satellite map with NDVI zones">
                  {/* Base farm background */}
                  <rect width="500" height="420" fill="#2A4428" />

                  {/* Grid lines suggesting satellite map */}
                  <defs>
                    <pattern id="farmgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="500" height="420" fill="url(#farmgrid)" />

                  {/* Farm boundary */}
                  <polygon
                    points="100,60 390,55 400,350 80,360"
                    fill="rgba(0,0,0,0.2)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                  />

                  {/* NDVI zones */}
                  {showNDVI && ndviZones.map(zone => (
                    <path
                      key={zone.id}
                      d={zone.path}
                      fill={zone.fill}
                      stroke={hoveredZone === zone.id ? 'white' : 'rgba(255,255,255,0.2)'}
                      strokeWidth={hoveredZone === zone.id ? 2 : 1}
                      style={{ cursor: 'pointer', transition: 'stroke 0.2s ease' }}
                      onMouseEnter={() => setHoveredZone(zone.id)}
                      onMouseLeave={() => setHoveredZone(null)}
                    />
                  ))}

                  {/* Zone labels */}
                  {showNDVI && ndviZones.map(zone => {
                    const paths = zone.path.match(/[\d.]+\s[\d.]+/g)?.map(p => p.split(' ').map(Number)) || []
                    const cx = paths.reduce((s, p) => s + p[0], 0) / paths.length
                    const cy = paths.reduce((s, p) => s + p[1], 0) / paths.length
                    return (
                      <g key={zone.id + '-label'}>
                        <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="9" fontFamily="var(--font-family-mono)" fontWeight="600">
                          {zone.label}
                        </text>
                        <text x={cx} y={cy + 10} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="var(--font-family-mono)">
                          {zone.ndvi}
                        </text>
                      </g>
                    )
                  })}

                  {/* Weather points */}
                  {showWeather && weatherPoints.map((p, i) => (
                    <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                      <circle r="14" fill="rgba(74,143,170,0.3)" stroke="rgba(74,143,170,0.6)" strokeWidth="1" />
                      <text textAnchor="middle" dy="5" fontSize="12">{p.icon}</text>
                    </g>
                  ))}

                  {/* Risk points */}
                  {riskPoints.map((p, i) => (
                    <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                      <circle r="10" fill="rgba(212,85,26,0.25)" stroke="rgba(212,85,26,0.7)" strokeWidth="1.5">
                        <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text textAnchor="middle" dy="4" fontSize="11">{p.icon}</text>
                    </g>
                  ))}

                  {/* North indicator */}
                  <g transform="translate(460, 30)">
                    <circle r="12" fill="rgba(0,0,0,0.4)" />
                    <text textAnchor="middle" dy="-2" fill="white" fontSize="8" fontFamily="var(--font-family-mono)" fontWeight="600">N</text>
                    <path d="M0,-2 L2,4 L0,2 L-2,4 Z" fill="white" transform="translate(0,-2)" />
                  </g>

                  {/* Scale bar */}
                  <g transform="translate(20, 390)">
                    <line x1="0" y1="0" x2="50" y2="0" stroke="white" strokeWidth="1.5" opacity="0.5" />
                    <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="1.5" opacity="0.5" />
                    <line x1="50" y1="-4" x2="50" y2="4" stroke="white" strokeWidth="1.5" opacity="0.5" />
                    <text x="25" y="-6" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="var(--font-family-mono)">500m</text>
                  </g>
                </svg>

                {/* NDVI tooltip */}
                {hoveredZone && (() => {
                  const zone = ndviZones.find(z => z.id === hoveredZone)!
                  return (
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(10,10,10,0.88)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 10,
                      padding: '0.75rem',
                      minWidth: 140,
                    }}>
                      <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: zone.color, marginBottom: '0.3rem', letterSpacing: '0.08em' }}>
                        {zone.label} · {zone.status}
                      </div>
                      <div style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.5rem', color: 'white' }}>
                        {zone.ndvi}
                      </div>
                      <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.1rem' }}>
                        NDVI Index
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Timeline */}
              <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-sand)', display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: 'var(--color-stone)', marginRight: '0.25rem' }}>Timeline:</span>
                {timePeriods.map((t, i) => (
                  <button key={t} onClick={() => setPeriod(i)} style={{
                    padding: '0.25rem 0.625rem',
                    borderRadius: 4,
                    border: '1px solid var(--color-sand)',
                    background: period === i ? 'var(--color-forest)' : 'transparent',
                    color: period === i ? 'var(--color-parchment)' : 'var(--color-stone)',
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.68rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* NDVI legend */}
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              background: 'var(--color-warm-white)',
              border: '1px solid var(--color-dune)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              flexWrap: 'wrap',
            }}>
              <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'var(--color-stone)', letterSpacing: '0.06em' }}>NDVI Scale:</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1 }}>
                <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: 'var(--color-stone)' }}>Poor</span>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'linear-gradient(to right, #D4551A, #C9A000, #3D7A52)' }} />
                <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: 'var(--color-stone)' }}>Healthy</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-sand)', paddingLeft: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: 'var(--color-stone)' }}>
                  NDVI = satellite-derived vegetation index
                </span>
              </div>
            </div>
          </div>

          {/* Right: Context */}
          <div>
            <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem' }}>
              Satellite Intelligence
            </div>
            <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ marginBottom: '1.25rem' }}>
              See What the Farm<br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-leaf)' }}>Can't Tell You.</span>
            </h2>
            <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              Google Earth Engine processes satellite observations daily to compute vegetation indices, detect crop stress, and identify risk zones invisible to the naked eye.
            </p>

            {/* Zone cards */}
            <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {ndviZones.map(zone => (
                <div
                  key={zone.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.875rem 1rem',
                    background: hoveredZone === zone.id ? zone.color + '10' : 'var(--color-warm-white)',
                    border: `1px solid ${hoveredZone === zone.id ? zone.color + '40' : 'var(--color-dune)'}`,
                    borderRadius: 12,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <div style={{ width: 12, height: 36, borderRadius: 3, background: zone.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-forest)' }}>{zone.label}</span>
                      <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', color: zone.color, fontWeight: 600 }}>{zone.status}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--color-sand)', borderRadius: 2 }}>
                        <div style={{ width: `${zone.ndvi * 100}%`, height: '100%', background: zone.color, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', color: 'var(--color-stone)' }}>NDVI {zone.ndvi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Insight card */}
            <div className={`${inView ? 'animate-fade-up delay-400' : 'opacity-0'}`} style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              background: 'rgba(212,85,26,0.07)',
              border: '1px solid rgba(212,85,26,0.2)',
              borderRadius: 14,
              borderLeft: '3px solid #D4551A',
            }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: '#D4551A', letterSpacing: '0.08em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                ⚠️ Satellite Insight · Zone C
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-bark)', lineHeight: 1.65 }}>
                Vegetation trend declining in the northern section. Satellite observations indicate increasing crop stress — 12% reduction in NDVI over 7 days.
              </p>
              <button className="btn-primary" style={{ marginTop: '0.875rem', fontSize: '0.8375rem', padding: '0.5rem 1rem' }}>
                Get AI Recommendation
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #satellite .container-wide > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

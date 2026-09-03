import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '12,450', label: 'Farms Monitored', icon: '🌾', color: '#3D7A52', trend: '+8.4%' },
  { value: '75.6%', label: 'Advisory Adoption', icon: '📊', color: '#4A8FAA', trend: '+3.2%' },
  { value: '2,184', label: 'High-Risk Farms', icon: '⚠️', color: '#D4551A', trend: '-12%' },
  { value: '8,920', label: 'Advisories Issued', icon: '💡', color: '#9B7340', trend: '+15%' },
  { value: '6,840', label: 'Actions Completed', icon: '✅', color: '#264D38', trend: '+11%' },
  { value: '47', label: 'Climate-Risk Zones', icon: '🌡', color: '#5B8FAA', trend: '+2' },
]

const regionData = [
  { name: 'Rajasthan', adoption: 82, risk: 12, farms: 3240, color: '#3D7A52' },
  { name: 'Maharashtra', adoption: 71, risk: 28, farms: 2810, color: '#4A8FAA' },
  { name: 'Andhra Pradesh', adoption: 79, risk: 18, farms: 2100, color: '#9B7340' },
  { name: 'Punjab', adoption: 88, risk: 8, farms: 1960, color: '#264D38' },
  { name: 'Karnataka', adoption: 65, risk: 34, farms: 1420, color: '#D4551A' },
]

const trendData = [62, 65, 68, 64, 70, 72, 69, 74, 76, 73, 78, 76]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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

function AreaChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const h = 80, w = 400
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * (h - 10)
    return `${x},${y}`
  })
  const area = `M${pts.join(' L')} L${w},${h} L0,${h} Z`
  const line = `M${pts.join(' L')}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 80 }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / (max - min)) * (h - 10)} r="2.5" fill={color} />
      ))}
    </svg>
  )
}

export default function PolicyDashboard() {
  const { ref, inView } = useInView(0.1)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <section id="dashboard" style={{ background: 'var(--color-forest)', position: 'relative', overflow: 'hidden' }} className="section-pad">
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
        backgroundSize: '20px 20px',
        pointerEvents: 'none',
      }} />

      <div className="container-wide" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '0.875rem', background: 'rgba(107,174,122,0.12)', borderColor: 'rgba(107,174,122,0.25)', color: 'var(--color-sprout)' }}>
              Policymaker Intelligence
            </div>
            <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ color: 'var(--color-cream)' }}>
              From Individual Farms<br />to Regional Intelligence.
            </h2>
          </div>
          <div className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All Regions', 'India', 'Brazil', 'South Africa'].map(r => (
              <button key={r} style={{
                padding: '0.375rem 0.875rem',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.15)',
                background: r === 'All Regions' ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.7rem',
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy notice */}
        <div className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{
          marginBottom: '1.75rem',
          padding: '0.625rem 1rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ fontSize: '0.875rem' }}>🔒</span>
          <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
            All data is aggregated and anonymized. No personally identifiable farmer information is exposed.
          </span>
        </div>

        {/* Stats grid */}
        <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{
              padding: '1.25rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              transition: 'background 0.2s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.62rem',
                  color: s.trend.startsWith('+') ? '#6BAE7A' : '#E07860',
                  background: s.trend.startsWith('+') ? 'rgba(107,174,122,0.12)' : 'rgba(224,120,96,0.12)',
                  padding: '0.15rem 0.4rem',
                  borderRadius: 4,
                }}>
                  {s.trend}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.7rem', color: 'var(--color-cream)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.375rem', letterSpacing: '0.04em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className={`${inView ? 'animate-fade-up delay-400' : 'opacity-0'}`} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
          {/* Adoption trend */}
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-cream)' }}>
                  Advisory Adoption Trend
                </div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.15rem' }}>
                  All regions · 12 months
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.4rem', color: '#6BAE7A' }}>75.6%</div>
            </div>
            <AreaChart data={trendData} color="#6BAE7A" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem' }}>
              {months.map(m => (
                <span key={m} style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>{m}</span>
              ))}
            </div>
          </div>

          {/* Regional breakdown */}
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
          }}>
            <div style={{ fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-cream)', marginBottom: '0.25rem' }}>
              Regional Adoption
            </div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>
              By state / region
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {regionData.map(r => (
                <div
                  key={r.name}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setSelectedRegion(r.name)}
                  onMouseLeave={() => setSelectedRegion(null)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-family-body)', fontSize: '0.8rem', color: selectedRegion === r.name ? 'white' : 'rgba(255,255,255,0.65)' }}>
                      {r.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', color: r.color, fontWeight: 600 }}>
                      {r.adoption}%
                    </span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
                    <div style={{
                      width: `${r.adoption}%`,
                      height: '100%',
                      background: r.color,
                      borderRadius: 2,
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
            * All metrics are prototype / demonstration data for the Code for Communities hackathon submission.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #dashboard .container-wide > div:last-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

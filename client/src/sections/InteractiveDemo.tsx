import { useState, useEffect, useRef } from 'react'
import { runDemo, type DemoResponse } from '../lib/agrinexus-api'

const modes = [
  {
    id: 'farmer',
    title: 'Farmer Mode',
    tagline: 'Ask about my crop',
    desc: 'Experience how a farmer interacts with AgriNexus AI — send a crop observation and receive an instant intelligence report.',
    icon: '👤',
    color: '#3D7A52',
    bg: 'rgba(61,122,82,0.08)',
    cta: 'Try Farmer Mode',
    demo: {
      input: 'My wheat crop has yellow spots on the leaves and the plants look weak.',
      response: {
        title: 'Crop Intelligence Report',
        items: [
          { label: 'Crop', value: 'Wheat', color: '#3D7A52' },
          { label: 'Health Score', value: '68/100', color: '#E67E22' },
          { label: 'Disease Risk', value: 'Medium – Rust Probable', color: '#E67E22' },
          { label: 'Weather Risk', value: 'Low', color: '#3D7A52' },
          { label: 'NDVI Trend', value: 'Declining (–0.09)', color: '#C04A3A' },
        ],
        recommendation: 'Inspect field within 24 hours. Apply preventive fungicide if rust confirmed. Adjust irrigation to reduce leaf wetness.',
      },
    },
  },
  {
    id: 'field',
    title: 'Field Intelligence',
    tagline: 'Analyze my farm',
    desc: 'See how AgriNexus processes satellite data, weather signals, and soil intelligence to map your entire farm\'s health in seconds.',
    icon: '🛰',
    color: '#4A8FAA',
    bg: 'rgba(74,143,170,0.08)',
    cta: 'Analyze a Farm',
    demo: {
      input: 'Farm location: Nashik, Maharashtra. Crop: Grapes. Area: 4.2 hectares.',
      response: {
        title: 'Satellite Farm Analysis',
        items: [
          { label: 'NDVI Average', value: '0.61 – Moderate', color: '#C9A000' },
          { label: 'Stressed Area', value: '1.1 ha (Zone SW)', color: '#D4551A' },
          { label: 'Water Stress', value: 'Detected – 7-day deficit', color: '#E67E22' },
          { label: 'Soil Moisture', value: 'Below optimal (62%)', color: '#E67E22' },
          { label: 'Climate Risk', value: 'Low – Stable 14-day', color: '#3D7A52' },
        ],
        recommendation: 'Increase irrigation in SW zone by 20%. Schedule soil sampling in stressed area within 72 hours.',
      },
    },
  },
  {
    id: 'policy',
    title: 'Policymaker Mode',
    tagline: 'Explore regional intelligence',
    desc: 'Access aggregated, anonymized intelligence across thousands of farms for evidence-based agricultural policy decisions.',
    icon: '🏛',
    color: '#1A3D28',
    bg: 'rgba(26,61,40,0.08)',
    cta: 'Open Policy Dashboard',
    demo: {
      input: 'Regional query: Maharashtra — Kharif season crop health and advisory adoption',
      response: {
        title: 'Regional Intelligence Brief',
        items: [
          { label: 'Farms Monitored', value: '2,810 farms', color: '#3D7A52' },
          { label: 'Advisory Adoption', value: '71.4% this season', color: '#4A8FAA' },
          { label: 'High-Risk Farms', value: '423 (15%)', color: '#D4551A' },
          { label: 'Top Risk Factor', value: 'Water stress – 38%', color: '#E67E22' },
          { label: 'NDVI Trend', value: 'Stable → Improving', color: '#3D7A52' },
        ],
        recommendation: 'Deploy targeted water advisory to 423 high-risk farms. Coordinate with district Krishi Vibhag for on-ground support.',
      },
    },
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

export default function InteractiveDemo() {
  const { ref, inView } = useInView(0.1)
  const [activeMode, setActiveMode] = useState<string | null>(null)
  const [showResponse, setShowResponse] = useState(false)
  const [loading, setLoading] = useState(false)
  const [liveResponse, setLiveResponse] = useState<DemoResponse | null>(null)

  async function openDemo(id: string) {
    setActiveMode(id)
    setShowResponse(false)
    setLiveResponse(null)
    setLoading(true)
    try {
      const response = await runDemo(id as 'farmer' | 'field' | 'policy')
      setLiveResponse(response)
      setShowResponse(true)
    } catch {
      setShowResponse(true)
    } finally {
      setLoading(false)
    }
  }

  const activeModeData = modes.find(m => m.id === activeMode)
  const responseData = liveResponse ?? activeModeData?.demo.response

  return (
    <section id="demo" style={{ background: 'var(--color-parchment)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem' }}>
          <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Interactive Experience
          </div>
          <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Experience AgriNexus AI
          </h2>
          <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ textAlign: 'center', margin: '0 auto' }}>
            Three entry points. Choose your perspective and see AgriNexus in action.
          </p>
        </div>

        <div id="demo-modes" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: activeMode ? '2rem' : 0 }}>
          {modes.map((mode, i) => (
            <div
              key={mode.id}
              className={`${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{
                animationDelay: `${i * 100 + 300}ms`,
                background: activeMode === mode.id ? mode.bg : 'var(--color-warm-white)',
                border: `1px solid ${activeMode === mode.id ? mode.color + '40' : 'var(--color-dune)'}`,
                borderRadius: 18,
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeMode === mode.id ? `0 6px 24px ${mode.color}18` : 'none',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: activeMode === mode.id ? mode.color : mode.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.25rem',
                transition: 'background 0.25s ease',
              }}>
                {mode.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-family-body)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-forest)', marginBottom: '0.375rem' }}>
                {mode.title}
              </h3>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', color: mode.color, letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 500 }}>
                "{mode.tagline}"
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.65, margin: '0 0 1.25rem' }}>
                {mode.desc}
              </p>
              <button
                className="btn-primary"
                onClick={() => openDemo(mode.id)}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: mode.color,
                  fontSize: '0.875rem',
                  padding: '0.625rem 1rem',
                }}
              >
                {mode.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Demo response panel */}
        {activeMode && activeModeData && (
          <div style={{
            background: 'var(--color-warm-white)',
            border: `1px solid ${activeModeData.color}30`,
            borderRadius: 20,
            overflow: 'hidden',
            animation: 'fadeUp 0.4s ease both',
          }}>
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--color-sand)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: activeModeData.bg,
            }}>
              <span style={{ fontSize: '1.25rem' }}>{activeModeData.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-forest)' }}>{activeModeData.title}</div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'var(--color-stone)' }}>
                  AgriNexus AI · Live Analysis
                </div>
              </div>
              <button
                onClick={() => setActiveMode(null)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--color-stone)', padding: '0.25rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {/* Input */}
              <div style={{ padding: '1.5rem', borderRight: '1px solid var(--color-sand)' }}>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: 'var(--color-stone)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Input
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'var(--color-parchment)',
                  border: '1px solid var(--color-dune)',
                  borderRadius: 10,
                  fontSize: '0.875rem',
                  color: 'var(--color-bark)',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                }}>
                  "{activeModeData.demo.input}"
                </div>
              </div>

              {/* Response */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: activeModeData.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {loading ? '⏳ Analyzing...' : `✓ ${responseData?.title}`}
                </div>

                {loading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{
                        height: 24,
                        borderRadius: 6,
                        background: `linear-gradient(90deg, var(--color-sand) 0%, var(--color-dune) 50%, var(--color-sand) 100%)`,
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                        opacity: 1 - i * 0.2,
                        width: `${100 - i * 12}%`,
                      }} />
                    ))}
                  </div>
                ) : showResponse && (
                  <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                      {responseData?.items.map(item => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.625rem', background: 'var(--color-parchment)', borderRadius: 8 }}>
                          <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: 'var(--color-stone)' }}>{item.label}</span>
                          <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', color: item.color, fontWeight: 600 }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      padding: '0.875rem 1rem',
                      background: activeModeData.color + '0E',
                      border: `1px solid ${activeModeData.color}25`,
                      borderRadius: 10,
                      borderLeft: `3px solid ${activeModeData.color}`,
                    }}>
                      <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: activeModeData.color, marginBottom: '0.3rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Recommendation
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-bark)', lineHeight: 1.65 }}>
                        {responseData?.recommendation}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 700px) {
          #demo-modes { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

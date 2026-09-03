import { useEffect, useRef, useState } from 'react'

const stages = [
  {
    id: 'sense',
    label: 'SENSE',
    title: 'Capture Every Signal',
    color: '#6BAE7A',
    icon: '📡',
    desc: 'Farmer-generated inputs — photo, voice, text, GPS location — combined with satellite observations, weather data, and soil sensor readings.',
    inputs: ['Farmer Photo', 'Voice Note', 'Location', 'Satellite', 'Weather API', 'Soil Data'],
  },
  {
    id: 'understand',
    label: 'UNDERSTAND',
    title: 'Interpret with Gemini',
    color: '#4A8FAA',
    icon: '🧠',
    desc: 'Gemini multimodal AI analyzes crop images, understands voice notes in local languages, and interprets all incoming data into structured agricultural context.',
    inputs: ['Gemini Vision', 'Speech-to-Text', 'Translation API', 'Crop Classification'],
  },
  {
    id: 'predict',
    label: 'PREDICT',
    title: 'Forecast Risk & Opportunity',
    color: '#9B7340',
    icon: '📈',
    desc: 'Machine learning models trained on regional agricultural history identify emerging crop stress, disease probability, climate risk patterns, and yield trajectory.',
    inputs: ['Crop Stress Model', 'Disease Risk ML', 'Climate Pattern', 'Yield Forecast'],
  },
  {
    id: 'advise',
    label: 'ADVISE',
    title: 'Generate Local Intelligence',
    color: '#3D7A52',
    icon: '💡',
    desc: 'Four specialized AI Agents — Crop, Climate, Soil, and Decision — collaborate to generate a contextual, localized, actionable recommendation for the specific farm.',
    inputs: ['Crop Agent', 'Climate Agent', 'Soil Agent', 'Decision Agent'],
  },
  {
    id: 'act',
    label: 'ACT',
    title: 'Deliver the Recommendation',
    color: '#264D38',
    icon: '📲',
    desc: 'The recommendation reaches the farmer through WhatsApp — as text, voice, or both — in their native language, with a simple next step they can take today.',
    inputs: ['WhatsApp Message', 'Voice Playback', 'Local Language', 'Simple Action'],
  },
  {
    id: 'verify',
    label: 'VERIFY',
    title: 'Close the Loop',
    color: '#5B8FAA',
    icon: '✅',
    desc: 'AgriNexus follows up 24–72 hours later via WhatsApp. Did the farmer act? What changed? Outcomes are recorded and feed back into model improvement.',
    inputs: ['Follow-up Message', 'Action Confirmation', 'Outcome Record', 'Model Update'],
  },
  {
    id: 'scale',
    label: 'SCALE',
    title: 'Power Policymakers',
    color: '#1A3D28',
    icon: '🌍',
    desc: 'Aggregated, privacy-preserving intelligence helps agricultural organizations, governments, and BRICS partners understand regional patterns and coordinate interventions.',
    inputs: ['Regional Dashboard', 'Policy Intelligence', 'BRICS Sharing', 'Impact Analytics'],
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function IntelligenceLoop() {
  const { ref, inView } = useInView(0.1)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % stages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stage = stages[active]

  return (
    <section id="loop" style={{ background: 'var(--color-forest)', position: 'relative', overflow: 'hidden' }} className="section-pad">
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)`,
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      <div className="container-wide" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3rem' }}>
          <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem', display: 'inline-flex', background: 'rgba(107,174,122,0.15)', borderColor: 'rgba(107,174,122,0.3)', color: 'var(--color-sprout)' }}>
            The Intelligence Cycle
          </div>
          <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ color: 'var(--color-cream)', marginBottom: '1rem', textAlign: 'center' }}>
            How AgriNexus Thinks
          </h2>
          <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ color: 'rgba(255,255,255,0.55)', textAlign: 'center', margin: '0 auto' }}>
            Seven stages, one closed loop — continuously learning from every farm interaction.
          </p>
        </div>

        {/* Stage selector */}
        <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`} style={{
          display: 'flex',
          gap: '0',
          overflowX: 'auto',
          marginBottom: '2.5rem',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.04)',
          scrollbarWidth: 'none',
        }}>
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                minWidth: 80,
                padding: '0.875rem 0.5rem',
                background: active === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                borderRight: i < stages.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
              <span style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.08em',
                color: active === i ? s.color : 'rgba(255,255,255,0.35)',
                fontWeight: active === i ? 600 : 400,
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}>
                {s.label}
              </span>
              {active === i && (
                <div style={{ width: 16, height: 2, borderRadius: 1, background: s.color }} />
              )}
            </button>
          ))}
        </div>

        {/* Stage detail */}
        <div className={`${inView ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${stage.color}40`,
            borderRadius: 20,
            padding: '2.5rem',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: stage.color + '22',
                  border: `1px solid ${stage.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {stage.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: stage.color, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                    Stage {String(active + 1).padStart(2, '0')} of 07
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.6rem', color: 'var(--color-cream)', margin: 0, letterSpacing: '-0.02em' }}>
                    {stage.title}
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: 0 }}>
                {stage.desc}
              </p>

              {/* Progress bar */}
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.25rem' }}>
                {stages.map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 3, borderRadius: 2,
                    background: i <= active ? stage.color : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.3s ease',
                  }} />
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Key Components
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {stage.inputs.map((input, i) => (
                  <div
                    key={input}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10,
                      animation: `fadeUp 0.4s ${i * 80}ms both`,
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: stage.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-family-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                      {input}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #loop .container-wide > div:last-child > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

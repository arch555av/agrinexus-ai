import { useEffect, useRef, useState } from 'react'

const timeline = [
  {
    day: 'Day 0',
    event: 'Recommendation Delivered',
    icon: '💡',
    color: '#3D7A52',
    desc: 'AgriNexus sends a personalized recommendation via WhatsApp in the farmer\'s language. Simple, actionable, specific.',
    detail: '"Inspect affected plants within the next 24 hours and review irrigation conditions."',
    type: 'system',
  },
  {
    day: 'Day 1',
    event: 'WhatsApp Follow-up',
    icon: '📲',
    color: '#4A8FAA',
    desc: 'AgriNexus sends a gentle nudge: "Did you complete the recommended action? Let us know."',
    detail: '"Hello! Have you had a chance to inspect your wheat field yet? Your response helps us improve future advice."',
    type: 'ai',
  },
  {
    day: 'Day 1',
    event: 'Farmer Responds',
    icon: '👤',
    color: '#9B7340',
    desc: 'The farmer confirms action through a simple reply.',
    detail: '"Yes, done. I checked the field and adjusted the drip irrigation on the northern section."',
    type: 'farmer',
  },
  {
    day: 'Day 2',
    event: 'Action Recorded',
    icon: '✅',
    color: '#264D38',
    desc: 'The confirmed action is recorded in the system, linked to the farm, crop, and original recommendation.',
    detail: 'Action logged: Irrigation adjustment · Farm ID: F-2847 · Compliance: Confirmed',
    type: 'system',
  },
  {
    day: 'Day 7',
    event: 'Outcome Observed',
    icon: '🛰',
    color: '#5B8FAA',
    desc: 'Satellite data is compared with pre-intervention baseline. NDVI trend is checked for improvement.',
    detail: 'NDVI Zone C: +0.09 improvement observed · Crop stress indicators: Declining',
    type: 'system',
  },
  {
    day: 'Day 7+',
    event: 'Model Updated',
    icon: '🔄',
    color: '#1A3D28',
    desc: 'Recommendation effectiveness is evaluated and fed back into AgriNexus. The next farmer gets smarter advice.',
    detail: 'Recommendation effectiveness: High · Similar cases: 847 farms improved with this intervention',
    type: 'learn',
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

export default function NudgeEngine() {
  const { ref, inView } = useInView(0.1)
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      setActiveStep(i)
      i++
      if (i >= timeline.length) clearInterval(interval)
    }, 600)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section style={{ background: 'var(--color-parchment)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
          {/* Left: Text */}
          <div>
            <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem' }}>
              Closed-Loop Accountability
            </div>
            <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ marginBottom: '1.25rem' }}>
              Advice Should Not<br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-leaf)' }}>End With Advice.</span>
            </h2>
            <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              AgriNexus closes the loop between recommendation and real-world action. Every advisory is tracked, confirmed, observed, and learned from.
            </p>

            <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`} style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { value: '78%', label: 'Advisory Adoption Rate', color: 'var(--color-leaf)' },
                { value: '24h', label: 'Average Response Time', color: 'var(--color-sky)' },
                { value: '+0.08', label: 'Average NDVI Improvement', color: 'var(--color-earth)' },
                { value: '6.2×', label: 'Learning Feedback Cycles', color: 'var(--color-forest)' },
              ].map(m => (
                <div key={m.label} style={{
                  padding: '1.125rem',
                  background: 'var(--color-warm-white)',
                  border: '1px solid var(--color-dune)',
                  borderRadius: 12,
                }}>
                  <div style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', color: m.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {m.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'var(--color-stone)', marginTop: '0.4rem', lineHeight: 1.4 }}>
                    {m.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.6rem', color: 'var(--color-dune)', marginTop: '0.2rem' }}>
                    Prototype Data
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: '10px',
                top: 20,
                bottom: 20,
                width: 2,
                background: 'var(--color-sand)',
              }} />

              {timeline.map((step, i) => {
                const isActive = i <= activeStep

                return (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      paddingBottom: i < timeline.length - 1 ? '1.5rem' : 0,
                      opacity: isActive ? 1 : 0.35,
                      transition: 'opacity 0.4s ease',
                    }}
                    onMouseEnter={() => setActiveStep(Math.max(activeStep, i))}
                  >
                    {/* Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-1.65rem',
                      top: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: isActive ? step.color : 'var(--color-sand)',
                      border: `2px solid ${isActive ? step.color : 'var(--color-dune)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.6rem',
                      transition: 'all 0.4s ease',
                      zIndex: 1,
                    }}>
                      {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />}
                    </div>

                    <div style={{
                      background: isActive ? 'var(--color-warm-white)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--color-dune)' : 'transparent'}`,
                      borderRadius: 12,
                      padding: isActive ? '1rem 1.125rem' : '0.5rem 1.125rem',
                      transition: 'all 0.3s ease',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '0.65rem',
                          color: step.color,
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                        }}>
                          {step.day}
                        </span>
                        <span style={{ fontSize: '0.85rem' }}>{step.icon}</span>
                        <span style={{
                          fontFamily: 'var(--font-family-body)',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: 'var(--color-forest)',
                        }}>
                          {step.event}
                        </span>
                      </div>

                      {isActive && (
                        <>
                          <p style={{ margin: '0.375rem 0 0.5rem', fontSize: '0.825rem', color: 'var(--color-stone)', lineHeight: 1.6 }}>
                            {step.desc}
                          </p>
                          <div style={{
                            padding: '0.5rem 0.75rem',
                            background: step.color + '10',
                            borderRadius: 8,
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: '0.7rem',
                            color: step.color,
                            lineHeight: 1.5,
                            borderLeft: `2px solid ${step.color}`,
                          }}>
                            {step.detail}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section .container-wide > div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

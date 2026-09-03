import { useEffect, useRef, useState } from 'react'

const languages = ['Hindi', 'English', 'Marathi', 'Telugu', 'Portuguese', 'Russian']

const conversationSteps = [
  {
    type: 'farmer',
    text: 'I am seeing yellow spots on my wheat leaves.',
    time: '10:23 AM',
  },
  {
    type: 'farmer',
    isImage: true,
    text: '📷 Crop Photo — wheat_field_north.jpg',
    time: '10:23 AM',
  },
  {
    type: 'system',
    text: 'Analyzing your crop with satellite + soil data...',
    time: '10:23 AM',
    isTyping: true,
  },
  {
    type: 'ai',
    isCard: true,
    time: '10:24 AM',
    card: {
      crop: 'Wheat',
      health: 72,
      diseaseRisk: 'Medium',
      weatherRisk: 'Low',
      trend: 'Declining',
      ndvi: 0.52,
    },
  },
  {
    type: 'ai',
    text: 'Satellite data shows a 12% vegetation decline in your northern field over the past 7 days. Combined with your photo, this is consistent with early-stage rust or nutrient deficiency. I recommend inspecting affected plants within 24 hours and reviewing your irrigation conditions.',
    time: '10:24 AM',
    hasVoice: true,
  },
  {
    type: 'ai',
    isAction: true,
    action: 'Inspect affected plants within the next 24 hours and review irrigation conditions before taking further action.',
    time: '10:24 AM',
  },
]

function HealthBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.8s ease' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.75rem', fontWeight: 600, color, minWidth: 32 }}>{value}</span>
    </div>
  )
}

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

export default function FarmerExperience() {
  const { ref, inView } = useInView(0.1)
  const [lang, setLang] = useState('English')
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const visibleMessages = conversationSteps.slice(0, step + 1)

  useEffect(() => {
    if (step < conversationSteps.length - 1) {
      const delay = conversationSteps[step].isTyping ? 1800 : 1200
      const timer = setTimeout(() => setStep(s => s + 1), delay)
      return () => clearTimeout(timer)
    }
  }, [step])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [step])

  return (
    <section id="farmer" style={{ background: 'var(--color-cream)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left: Text */}
          <div>
            <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem' }}>
              Farmer Experience
            </div>
            <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ marginBottom: '1.25rem' }}>
              Intelligence That Speaks<br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-leaf)' }}>Every Farmer's Language.</span>
            </h2>
            <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              No app download required. Farmers interact entirely through WhatsApp — using voice, text, or photos in their native language. AgriNexus responds with clear, localized advice within seconds.
            </p>

            {/* Language selector */}
            <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`} style={{ marginTop: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--color-stone)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Supported Languages
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {languages.map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: '0.375rem 0.875rem',
                      borderRadius: 999,
                      border: `1.5px solid ${lang === l ? 'var(--color-leaf)' : 'var(--color-dune)'}`,
                      background: lang === l ? 'rgba(61,122,82,0.1)' : 'transparent',
                      color: lang === l ? 'var(--color-leaf)' : 'var(--color-stone)',
                      fontFamily: 'var(--font-family-body)',
                      fontSize: '0.8375rem',
                      fontWeight: lang === l ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className={`${inView ? 'animate-fade-up delay-400' : 'opacity-0'}`} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '🎙', text: 'Voice notes in any language' },
                { icon: '📸', text: 'Crop photo analysis via Gemini Vision' },
                { icon: '🛰', text: 'Satellite intelligence attached to every response' },
                { icon: '🔔', text: 'Automatic follow-up in 24–72 hours' },
              ].map(f => (
                <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{f.icon}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-bark)' }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: 380,
              background: '#0A0A0A',
              borderRadius: 28,
              padding: 4,
              boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
            }}>
              <div style={{ background: '#EDEDED', borderRadius: 24, overflow: 'hidden' }}>
                {/* WhatsApp header */}
                <div style={{ background: '#1A7A4A', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-sprout)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>
                    🌾
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-family-body)' }}>AgriNexus AI</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)' }}>Agricultural Intelligence · {lang}</div>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>📞</div>
                </div>

                {/* Chat messages */}
                <div
                  ref={chatRef}
                  style={{
                    height: 420,
                    overflowY: 'auto',
                    padding: '1rem 0.75rem',
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                    background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A9960' fill-opacity='0.04'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10S0 14.5 0 20s4.5 10 10 10 10-4.5 10-10zm10 10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    scrollbarWidth: 'none',
                  }}
                >
                  {visibleMessages.map((msg, i) => {
                    if (msg.type === 'system') {
                      return (
                        <div key={i} style={{ textAlign: 'center', padding: '0.25rem' }}>
                          <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: '#666', background: 'rgba(0,0,0,0.07)', padding: '0.2rem 0.6rem', borderRadius: 999 }}>
                            {msg.isTyping ? '⏳ ' : ''}{msg.text}
                          </span>
                        </div>
                      )
                    }

                    if (msg.type === 'farmer') {
                      return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <div style={{
                            background: '#DCF8C6',
                            borderRadius: '12px 12px 2px 12px',
                            padding: '0.625rem 0.875rem',
                            maxWidth: '80%',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                          }}>
                            {msg.isImage ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: 48, height: 40, background: 'rgba(0,0,0,0.06)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📷</div>
                                <span style={{ fontSize: '0.8rem', color: '#1A7A4A', fontWeight: 500 }}>Photo attached</span>
                              </div>
                            ) : (
                              <p style={{ margin: 0, fontSize: '0.875rem', color: '#1A1A12', lineHeight: 1.5 }}>{msg.text}</p>
                            )}
                            <div style={{ fontSize: '0.65rem', color: '#999', textAlign: 'right', marginTop: '0.25rem' }}>{msg.time} ✓✓</div>
                          </div>
                        </div>
                      )
                    }

                    if (msg.isCard && msg.card) {
                      const c = msg.card
                      return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <div style={{
                            background: 'white',
                            borderRadius: '12px 12px 12px 2px',
                            padding: '0.875rem',
                            maxWidth: '90%',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                            border: '1px solid #E0E0E0',
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem', alignItems: 'center' }}>
                              <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', letterSpacing: '0.08em', color: '#666', textTransform: 'uppercase' }}>
                                Crop Intelligence Report
                              </span>
                              <span style={{ fontSize: '0.7rem', color: 'var(--color-leaf)', fontWeight: 600 }}>🛰 Live</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                              <div>
                                <div style={{ fontSize: '0.65rem', color: '#999', marginBottom: '0.1rem' }}>Crop</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1A12' }}>{c.crop}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '0.65rem', color: '#999', marginBottom: '0.1rem' }}>NDVI Index</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-earth)' }}>{c.ndvi}</div>
                              </div>
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#666', marginBottom: '0.25rem' }}>Crop Health Score</div>
                            <HealthBar value={c.health} color="#3D7A52" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem', marginTop: '0.6rem' }}>
                              {[
                                { label: 'Disease', value: c.diseaseRisk, color: '#E67E22' },
                                { label: 'Weather', value: c.weatherRisk, color: '#3D7A52' },
                                { label: 'Trend', value: c.trend, color: '#C0392B' },
                              ].map(m => (
                                <div key={m.label} style={{ background: '#F5F5F5', borderRadius: 6, padding: '0.3rem 0.4rem' }}>
                                  <div style={{ fontSize: '0.6rem', color: '#999' }}>{m.label}</div>
                                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: m.color }}>{m.value}</div>
                                </div>
                              ))}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#999', textAlign: 'right', marginTop: '0.4rem' }}>{msg.time}</div>
                          </div>
                        </div>
                      )
                    }

                    if (msg.isAction) {
                      return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <div style={{
                            background: 'linear-gradient(135deg, #1A3D28, #264D38)',
                            borderRadius: '12px 12px 12px 2px',
                            padding: '0.875rem',
                            maxWidth: '90%',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          }}>
                            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: 'var(--color-sprout)', letterSpacing: '0.08em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                              ✓ Recommended Next Step
                            </div>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-cream)', lineHeight: 1.55 }}>{msg.action}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                              <button
                                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, padding: '0.3rem 0.75rem', color: 'white', fontSize: '0.75rem', cursor: 'pointer' }}
                                onClick={() => setPlaying(!playing)}
                              >
                                {playing ? '⏸ Playing...' : '▶ Play in ' + lang}
                              </button>
                            </div>
                            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textAlign: 'right', marginTop: '0.4rem' }}>{msg.time}</div>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div key={i} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{
                          background: 'white',
                          borderRadius: '12px 12px 12px 2px',
                          padding: '0.625rem 0.875rem',
                          maxWidth: '88%',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                        }}>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#1A1A12', lineHeight: 1.55 }}>{msg.text}</p>
                          {msg.hasVoice && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', padding: '0.3rem 0' }}>
                              <button
                                onClick={() => setPlaying(!playing)}
                                style={{ background: 'var(--color-leaf)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', fontSize: '0.6rem' }}
                              >
                                {playing ? '⏸' : '▶'}
                              </button>
                              <div style={{ flex: 1, height: 2, background: 'linear-gradient(to right, var(--color-leaf) 40%, #E0E0E0 40%)', borderRadius: 1 }} />
                              <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.65rem', color: '#999' }}>0:08</span>
                            </div>
                          )}
                          <div style={{ fontSize: '0.65rem', color: '#999', textAlign: 'right', marginTop: '0.25rem' }}>{msg.time}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Input bar */}
                <div style={{ background: '#F0F0F0', padding: '0.625rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ flex: 1, background: 'white', borderRadius: 20, padding: '0.5rem 0.875rem', fontSize: '0.8rem', color: '#999' }}>
                    Message AgriNexus AI...
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1A7A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', cursor: 'pointer' }}>
                    🎙
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #farmer .container-wide > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

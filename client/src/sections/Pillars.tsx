import { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    num: '01',
    title: 'Multimodal Crop Intelligence',
    short: 'Gemini-powered analysis of farmer voice, text, images, and crop observations.',
    detail: 'Using Google Gemini\'s multimodal capabilities, AgriNexus can interpret a photo of a diseased leaf, a voice note in a local language, or a text description of crop symptoms — and convert them into structured agricultural intelligence instantly.',
    icon: '🌾',
    color: '#3D7A52',
    bg: 'rgba(61,122,82,0.08)',
  },
  {
    num: '02',
    title: 'Geospatial & Satellite Intelligence',
    short: 'Google Earth Engine and Maps Platform provide farm-level geospatial and vegetation intelligence.',
    detail: 'Satellite observations through Google Earth Engine compute NDVI (vegetation index), identify crop-stress zones, track seasonal change, and overlay farm boundaries for precise, location-aware analysis. Google Maps Platform adds local road, boundary, and geographic context.',
    icon: '🛰',
    color: '#4A8FAA',
    bg: 'rgba(74,143,170,0.08)',
  },
  {
    num: '03',
    title: 'Climate, Soil & Predictive Intelligence',
    short: 'Weather, soil, historical data, and ML help identify crop stress, risks, and future conditions.',
    detail: 'Real-time and forecast weather data is combined with soil health parameters and historical agricultural datasets. Machine learning models trained on regional patterns identify emerging climate risks, soil degradation indicators, and optimal intervention windows.',
    icon: '📊',
    color: '#9B7340',
    bg: 'rgba(155,115,64,0.08)',
  },
  {
    num: '04',
    title: 'Agentic Regenerative Agriculture Engine',
    short: 'Specialized AI Agents turn multiple signals into regenerative agricultural recommendations.',
    detail: 'Four specialized AI agents — Crop, Climate, Soil, and Decision — operate in a coordinated agentic framework. Each agent contributes domain-specific intelligence. The Decision Agent synthesizes all signals into context-aware, regenerative farming recommendations.',
    icon: '⚙️',
    color: '#6B4E2A',
    bg: 'rgba(107,78,42,0.08)',
  },
  {
    num: '05',
    title: 'Zero-App Multilingual Voice Interface',
    short: 'Farmers interact through WhatsApp using voice, text, images, and multilingual communication.',
    detail: 'AgriNexus requires no app download. Farmers can interact entirely through WhatsApp — sending voice notes, photos, or text in Hindi, Marathi, Telugu, Portuguese, Russian, Mandarin, or English. Google Cloud Speech-to-Text and Translation APIs handle language automatically.',
    icon: '🎙',
    color: '#3D7A52',
    bg: 'rgba(61,122,82,0.08)',
  },
  {
    num: '06',
    title: 'Closed-Loop Nudge & Accountability Engine',
    short: 'AgriNexus follows up, records farmer action, and learns from outcomes.',
    detail: 'Most advisory platforms stop at the recommendation. AgriNexus follows up via WhatsApp, confirms action, records outcomes, and feeds them back into the model. This creates a continuous improvement loop that makes recommendations smarter with every farm interaction.',
    icon: '🔄',
    color: '#5B8FAA',
    bg: 'rgba(91,143,170,0.08)',
  },
  {
    num: '07',
    title: 'BRICS Policymaker & Cooperation Layer',
    short: 'Aggregated intelligence helps policymakers understand risks and cross-border opportunities.',
    detail: 'Anonymized, aggregated agricultural intelligence flows to a policymaker dashboard showing regional risk patterns, intervention adoption, and climate trends. BRICS partners can share agricultural models, seasonal patterns, and knowledge — without sharing individual farmer data.',
    icon: '🌍',
    color: '#2A5C3E',
    bg: 'rgba(42,92,62,0.08)',
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

export default function Pillars() {
  const { ref, inView } = useInView(0.1)
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="pillars" style={{ background: 'var(--color-parchment)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3.5rem' }}>
          <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Core Architecture
          </div>
          <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ marginBottom: '1rem', textAlign: 'center' }}>
            Seven Intelligence Pillars.<br />One Connected Agricultural System.
          </h2>
          <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ margin: '0 auto', textAlign: 'center' }}>
            AgriNexus AI connects sensing, intelligence, action, accountability, and cooperation into one continuous loop.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {pillars.map((p, i) => {
            const isOpen = expanded === i
            return (
              <div
                key={p.num}
                className={inView ? 'animate-fade-up' : 'opacity-0'}
                style={{
                  animationDelay: `${(i % 4) * 80 + 250}ms`,
                  background: isOpen ? p.bg : 'var(--color-warm-white)',
                  border: `1px solid ${isOpen ? p.color + '40' : 'var(--color-dune)'}`,
                  borderRadius: 16,
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  boxShadow: isOpen ? `0 4px 24px ${p.color}18` : '0 1px 3px rgba(0,0,0,0.04)',
                }}
                onClick={() => setExpanded(isOpen ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setExpanded(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: isOpen ? p.color : p.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.375rem',
                    flexShrink: 0,
                    transition: 'background 0.25s ease',
                  }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.7rem',
                        color: p.color,
                        letterSpacing: '0.08em',
                        fontWeight: 500,
                      }}>
                        Pillar {p.num}
                      </span>
                      <span style={{
                        color: 'var(--color-stone)',
                        fontSize: '0.75rem',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}>
                        ▼
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-family-body)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--color-forest)',
                      lineHeight: 1.35,
                      margin: 0,
                    }}>
                      {p.title}
                    </h3>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1.65,
                  margin: '0.875rem 0 0',
                }}>
                  {p.short}
                </p>

                {/* Expanded content */}
                <div style={{
                  maxHeight: isOpen ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease',
                }}>
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${p.color}30`,
                    fontSize: '0.875rem',
                    color: 'var(--color-bark)',
                    lineHeight: 1.7,
                  }}>
                    {p.detail}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

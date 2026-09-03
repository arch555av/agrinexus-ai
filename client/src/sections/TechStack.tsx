import { useEffect, useRef, useState } from 'react'

const technologies = [
  {
    name: 'Gemini',
    desc: 'Multimodal crop and language intelligence',
    icon: '✦',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.08)',
    category: 'AI / Intelligence',
  },
  {
    name: 'Vertex AI',
    desc: 'AI/ML and agentic infrastructure on Google Cloud',
    icon: '⬡',
    color: '#34A853',
    bg: 'rgba(52,168,83,0.08)',
    category: 'AI / Infrastructure',
  },
  {
    name: 'Google Earth Engine',
    desc: 'Satellite imagery, NDVI, and geospatial analysis',
    icon: '🛰',
    color: '#0F9D58',
    bg: 'rgba(15,157,88,0.08)',
    category: 'Satellite / Geospatial',
  },
  {
    name: 'Google Maps Platform',
    desc: 'Farm location, boundaries, and geographic context',
    icon: '📍',
    color: '#EA4335',
    bg: 'rgba(234,67,53,0.08)',
    category: 'Location Intelligence',
  },
  {
    name: 'BigQuery',
    desc: 'Agricultural data intelligence and aggregation',
    icon: '▦',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.08)',
    category: 'Data Platform',
  },
  {
    name: 'Cloud Speech-to-Text',
    desc: 'Multilingual voice note transcription',
    icon: '🎙',
    color: '#FBBC04',
    bg: 'rgba(251,188,4,0.08)',
    category: 'Voice AI',
  },
  {
    name: 'Translation API',
    desc: 'Real-time multilingual communication support',
    icon: '🌐',
    color: '#34A853',
    bg: 'rgba(52,168,83,0.08)',
    category: 'Language',
  },
  {
    name: 'Text-to-Speech',
    desc: 'Voice response delivery in local languages',
    icon: '🔊',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.08)',
    category: 'Voice AI',
  },
  {
    name: 'Firebase',
    desc: 'Authentication and application infrastructure',
    icon: '🔥',
    color: '#FF7043',
    bg: 'rgba(255,112,67,0.08)',
    category: 'App Infrastructure',
  },
  {
    name: 'Cloud Run',
    desc: 'Scalable, serverless backend services',
    icon: '⚡',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.08)',
    category: 'Backend',
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

export default function TechStack() {
  const { ref, inView } = useInView(0.1)
  const [filter, setFilter] = useState<string | null>(null)

  const categories = Array.from(new Set(technologies.map(t => t.category)))

  const filtered = filter ? technologies.filter(t => t.category === filter) : technologies

  return (
    <section style={{ background: 'var(--color-cream)', borderTop: '1px solid var(--color-sand)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: 520 }}>
            <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem' }}>
              Technology Foundation
            </div>
            <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ marginBottom: '0.5rem' }}>
              Built With Google AI.
            </h2>
            <p className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ fontSize: '0.95rem', color: 'var(--color-stone)', lineHeight: 1.65, margin: 0 }}>
              AgriNexus integrates Google Cloud's most advanced AI, geospatial, and data infrastructure.
            </p>
          </div>

          {/* Category filter */}
          <div className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilter(null)}
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: 999,
                border: '1px solid var(--color-dune)',
                background: filter === null ? 'var(--color-forest)' : 'transparent',
                color: filter === null ? 'var(--color-parchment)' : 'var(--color-stone)',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.68rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                letterSpacing: '0.04em',
              }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat === filter ? null : cat)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 999,
                  border: '1px solid var(--color-dune)',
                  background: filter === cat ? 'var(--color-forest)' : 'transparent',
                  color: filter === cat ? 'var(--color-parchment)' : 'var(--color-stone)',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {filtered.map((tech, i) => (
            <div
              key={tech.name}
              className={`card-base ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{
                padding: '1.375rem',
                animationDelay: `${(i % 5) * 80 + 300}ms`,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: tech.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem',
                marginBottom: '0.875rem',
                color: tech.color,
                fontWeight: 700,
                fontFamily: 'var(--font-family-mono)',
              }}>
                {tech.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.62rem',
                color: tech.color,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.3rem',
                fontWeight: 500,
              }}>
                {tech.category}
              </div>
              <div style={{
                fontFamily: 'var(--font-family-body)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'var(--color-forest)',
                marginBottom: '0.375rem',
              }}>
                {tech.name}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-stone)', lineHeight: 1.55, margin: 0 }}>
                {tech.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Google attribution */}
        <div className={`${inView ? 'animate-fade-up delay-500' : 'opacity-0'}`} style={{
          marginTop: '2rem',
          padding: '1.25rem 1.75rem',
          background: 'var(--color-warm-white)',
          border: '1px solid var(--color-dune)',
          borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>☁️</span>
            <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-forest)' }}>
              Google Cloud Platform
            </span>
          </div>
          <div style={{ width: 1, height: 24, background: 'var(--color-dune)', flexShrink: 0 }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--color-stone)', margin: 0, lineHeight: 1.5 }}>
            AgriNexus is designed for deployment on Google Cloud infrastructure, leveraging the full suite of Google AI, geospatial, data, and communication APIs.
          </p>
        </div>
      </div>
    </section>
  )
}

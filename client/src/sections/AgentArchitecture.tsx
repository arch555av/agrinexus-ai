import { useEffect, useRef, useState } from 'react'

const agents = [
  {
    id: 'crop',
    name: 'Crop Agent',
    role: 'Visual & Symptom Intelligence',
    desc: 'Analyzes crop photos, identifies visible symptoms, classifies disease candidates, and scores crop health from multimodal inputs.',
    icon: '🌾',
    color: '#3D7A52',
    bg: 'rgba(61,122,82,0.1)',
    output: 'Crop Health: 72/100 · Disease: Possible Rust',
  },
  {
    id: 'climate',
    name: 'Climate Agent',
    role: 'Weather & Climate Risk',
    desc: 'Processes real-time weather, forecast models, historical patterns, and climate risk indicators relevant to the specific crop and location.',
    icon: '🌤',
    color: '#4A8FAA',
    bg: 'rgba(74,143,170,0.1)',
    output: 'Weather Risk: Low · 72h Forecast: Favorable',
  },
  {
    id: 'soil',
    name: 'Soil Agent',
    role: 'Soil Health & Regeneration',
    desc: 'Interprets soil health parameters, nutrient profiles, moisture levels, and identifies regenerative agriculture opportunities.',
    icon: '🌱',
    color: '#9B7340',
    bg: 'rgba(155,115,64,0.1)',
    output: 'Soil pH: 6.8 · Nitrogen: Low · Moisture: Adequate',
  },
  {
    id: 'decision',
    name: 'Decision Agent',
    role: 'Synthesis & Recommendation',
    desc: 'Combines evidence from all three specialist agents into a final contextual, localized, actionable recommendation — the definitive farm intelligence.',
    icon: '⚙️',
    color: '#1A3D28',
    bg: 'rgba(26,61,40,0.1)',
    output: 'Inspect Zone C within 24h · Review irrigation',
    isFinal: true,
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

export default function AgentArchitecture() {
  const { ref, inView } = useInView(0.1)
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const [flowStep, setFlowStep] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setFlowStep(prev => (prev + 1) % 4)
    }, 1500)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section style={{ background: 'var(--color-cream)', borderTop: '1px solid var(--color-sand)' }} className="section-pad">
      <div className="container-wide" ref={ref}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3.5rem' }}>
          <div className={`label-tag ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Agentic AI Architecture
          </div>
          <h2 className={`section-heading ${inView ? 'animate-fade-up delay-100' : 'opacity-0'}`} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Four AI Agents.<br />One Agricultural Decision.
          </h2>
          <p className={`section-subheading ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`} style={{ textAlign: 'center', margin: '0 auto' }}>
            Specialized agents collaborate in an orchestrated framework, each contributing domain expertise to produce a single, trustworthy recommendation.
          </p>
        </div>

        {/* Agent flow visualization */}
        <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`} style={{ position: 'relative' }}>
          {/* Connection lines SVG */}
          <svg style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '60%',
            pointerEvents: 'none',
            zIndex: 0,
          }} viewBox="0 0 600 300" preserveAspectRatio="none">
            <defs>
              <marker id="arrowAgent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="var(--color-dune)" />
              </marker>
            </defs>
            {/* Lines from 3 agents to Decision Agent */}
            {[0, 1, 2].map(i => {
              const isActive = flowStep === i || flowStep === 3
              return (
                <line
                  key={i}
                  x1={i === 0 ? '16%' : i === 1 ? '50%' : '84%'}
                  y1="35%"
                  x2="50%"
                  y2="65%"
                  stroke={isActive ? 'var(--color-leaf)' : 'var(--color-dune)'}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray="5 4"
                  markerEnd="url(#arrowAgent)"
                  style={{ transition: 'stroke 0.4s ease' }}
                />
              )
            })}
          </svg>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
            {agents.slice(0, 3).map((agent, i) => (
              <div
                key={agent.id}
                className="card-base"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  background: activeAgent === agent.id ? agent.bg : 'var(--color-warm-white)',
                  borderColor: activeAgent === agent.id ? agent.color + '40' : 'var(--color-dune)',
                  transition: 'all 0.25s ease',
                  borderTop: `3px solid ${flowStep === i ? agent.color : 'var(--color-dune)'}`,
                }}
                onMouseEnter={() => setActiveAgent(agent.id)}
                onMouseLeave={() => setActiveAgent(null)}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 11,
                  background: flowStep === i ? agent.color : agent.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem',
                  marginBottom: '1rem',
                  transition: 'background 0.3s ease',
                }}>
                  {agent.icon}
                </div>
                <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: agent.color, letterSpacing: '0.06em', marginBottom: '0.3rem', fontWeight: 500, textTransform: 'uppercase' }}>
                  {agent.role}
                </div>
                <h3 style={{ fontFamily: 'var(--font-family-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-forest)', marginBottom: '0.625rem' }}>
                  {agent.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-stone)', lineHeight: 1.6, margin: 0 }}>
                  {agent.desc}
                </p>
                {(activeAgent === agent.id || flowStep === i) && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.5rem 0.75rem',
                    background: agent.color + '15',
                    border: `1px solid ${agent.color}30`,
                    borderRadius: 8,
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.7rem',
                    color: agent.color,
                    lineHeight: 1.5,
                  }}>
                    ↳ {agent.output}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Decision Agent */}
          <div style={{ maxWidth: 480, margin: '2rem auto 0', position: 'relative', zIndex: 1 }}>
            <div
              className="card-base"
              style={{
                padding: '2rem',
                background: flowStep === 3 ? 'rgba(26,61,40,0.05)' : 'var(--color-warm-white)',
                borderTop: `3px solid ${flowStep === 3 ? 'var(--color-forest)' : 'var(--color-dune)'}`,
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 13,
                  background: flowStep === 3 ? 'var(--color-forest)' : 'rgba(26,61,40,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem',
                  transition: 'background 0.3s ease',
                }}>
                  {agents[3].icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', color: 'var(--color-leaf)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Final Synthesis
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-family-body)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-forest)', margin: 0 }}>
                    {agents[3].name}
                  </h3>
                </div>
                {flowStep === 3 && (
                  <div style={{ marginLeft: 'auto', width: 10, height: 10, borderRadius: '50%', background: 'var(--color-leaf)', animation: 'pulseRing 1.5s ease-out infinite' }} />
                )}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.65, margin: 0 }}>
                {agents[3].desc}
              </p>
              {flowStep === 3 && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '0.875rem 1rem',
                  background: 'var(--color-forest)',
                  borderRadius: 10,
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--color-sprout)',
                  lineHeight: 1.6,
                }}>
                  ✓ Final Recommendation: {agents[3].output}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #agent-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

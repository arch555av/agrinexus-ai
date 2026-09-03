export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-forest-dark)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div className="container-wide" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: 32, height: 32,
                background: 'var(--color-leaf)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2C9 2 4 5 4 10C4 12.76 6.24 15 9 15C11.76 15 14 12.76 14 10C14 5 9 2 9 2Z" fill="rgba(255,255,255,0.9)" />
                  <path d="M9 2V15M9 8C9 8 6 7 5 9" stroke="var(--color-forest)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.15rem', color: 'var(--color-cream)' }}>
                AgriNexus <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)' }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 300, margin: '0 0 1.25rem' }}>
              Agentic Multimodal Agricultural Intelligence for BRICS. Connecting farmers, data, intelligence, and institutions.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.875rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.68rem',
              color: 'var(--color-sprout)',
              letterSpacing: '0.06em',
            }}>
              🏆 Code for Communities — Second Edition
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {['Home', 'How It Works', 'Intelligence', 'Farmer Experience', 'BRICS Network', 'Impact', 'Dashboard'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-cream)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Technology */}
          <div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
              Technology
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {['Gemini AI', 'Google Earth Engine', 'Vertex AI', 'BigQuery', 'Google Maps Platform', 'Firebase', 'Cloud Run'].map(tech => (
                <span key={tech} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>{tech}</span>
              ))}
            </div>
          </div>

          {/* BRICS */}
          <div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
              BRICS Partners
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { flag: '🇮🇳', name: 'India' },
                { flag: '🇧🇷', name: 'Brazil' },
                { flag: '🇷🇺', name: 'Russia' },
                { flag: '🇨🇳', name: 'China' },
                { flag: '🇿🇦', name: 'South Africa' },
              ].map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{c.flag}</span>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
            © 2025 AgriNexus AI · Prototype submission for Code for Communities — Second Edition · Track 4: AgriN & Regenerative Agricultural Intelligence
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Sense', 'Understand', 'Predict', 'Advise', 'Act', 'Verify', 'Scale'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.15)' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container-wide > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer .container-wide > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}

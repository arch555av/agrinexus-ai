import { useState, useEffect } from 'react'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'How It Works', href: '#loop' },
  { label: 'Intelligence', href: '#pillars' },
  { label: 'Farmer Experience', href: '#farmer' },
  { label: 'BRICS Network', href: '#brics' },
  { label: 'Impact', href: '#impact' },
  { label: 'Dashboard', href: '#dashboard' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'rgba(244,240,230,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
      }}
    >
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', height: '68px', gap: '2rem' }}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--color-forest)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2C9 2 4 5 4 10C4 12.76 6.24 15 9 15C11.76 15 14 12.76 14 10C14 5 9 2 9 2Z" fill="var(--color-sprout)" />
              <path d="M9 2V15M9 8C9 8 6 7 5 9" stroke="var(--color-parchment)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.1rem', color: 'var(--color-forest)', letterSpacing: '-0.01em' }}>
            AgriNexus <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 300, fontSize: '0.9rem', color: 'var(--color-stone)' }}>AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1, justifyContent: 'center' }} className="hidden-mobile">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-bark)',
                textDecoration: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: 6,
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = 'var(--color-forest)'
                ;(e.target as HTMLElement).style.background = 'rgba(26,61,40,0.06)'
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = 'var(--color-bark)'
                ;(e.target as HTMLElement).style.background = 'transparent'
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }} className="hidden-mobile">
          <a href="#demo" className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Explore the Intelligence
          </a>
          <a href="/dashboard" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Open Field Desk
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setOpen(!open)}
          style={{
            marginLeft: 'auto',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex', flexDirection: 'column', gap: '5px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--color-forest)',
              borderRadius: 2,
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: open && i === 0 ? 'rotate(45deg) translate(5px, 5px)' : open && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? '480px' : '0',
        transition: 'max-height 0.35s ease',
        background: 'rgba(244,240,230,0.98)',
        backdropFilter: 'blur(12px)',
      }}>
        <div className="container-wide" style={{ paddingTop: '1rem', paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: '0.75rem 0.5rem',
                fontFamily: 'var(--font-family-body)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--color-bark)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--color-sand)',
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a href="#demo" className="btn-secondary" style={{ fontSize: '0.875rem', flex: 1, justifyContent: 'center' }}>
              Explore Intelligence
            </a>
            <a href="/dashboard" className="btn-primary" style={{ fontSize: '0.875rem', flex: 1, justifyContent: 'center' }}>
              Open Field Desk
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 899px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </header>
  )
}

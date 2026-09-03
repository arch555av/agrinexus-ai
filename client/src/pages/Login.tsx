import { motion } from 'motion/react'
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { startLogin } from '@/const'
import { AgriSignalOrb, GlassPanel } from '@/components/AgriVisuals'

export default function Login() {
  return (
    <main className="auth-page">
      <div className="auth-noise" aria-hidden="true" />
      <div className="auth-shell">
        <motion.section className="auth-intro" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <a className="brand-lockup" href="/" aria-label="AgriNexus home"><span className="brand-mark"><Leaf size={18} /></span><span>AgriNexus <em>AI</em></span></a>
          <div className="auth-copy">
            <div className="label-tag"><Sparkles size={13} /> FARM INTELLIGENCE, IN MOTION</div>
            <h1>Turn every field signal into a <i>clearer</i> next move.</h1>
            <p>Bring your farms, crop observations, and local context into one calm intelligence workspace built for decisive action.</p>
          </div>
          <div className="auth-proof-row">
            <span><ShieldCheck size={15} /> Private by account</span>
            <span><span className="live-dot" /> Gemini-ready guidance</span>
          </div>
        </motion.section>
        <motion.section className="auth-card-wrap" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.75, delay: 0.12 }}>
          <AgriSignalOrb compact />
          <GlassPanel className="auth-card">
            <div className="auth-card-heading"><span className="eyebrow">WELCOME BACK</span><h2>Enter your field desk.</h2><p>Sign in to continue to your farm intelligence workspace.</p></div>
            <button className="oauth-button" onClick={() => startLogin()}><span className="oauth-icon">G</span><span>Continue with Google / Manus</span><ArrowRight size={17} /></button>
            <div className="auth-divider"><span>secure access</span></div>
            <div className="auth-mini-grid"><div><strong>01</strong><span>Save farm context</span></div><div><strong>02</strong><span>Ask in your language</span></div><div><strong>03</strong><span>Act with confidence</span></div></div>
            <p className="auth-legal">Your account controls access to saved farms, advisories, alerts, and field data.</p>
          </GlassPanel>
        </motion.section>
      </div>
    </main>
  )
}

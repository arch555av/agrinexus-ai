import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, ArrowUpRight, CheckCircle2, CloudSun, Leaf, LogOut, MapPinned, Plus, Sprout } from 'lucide-react'
import { Link } from 'wouter'
import { useAuth } from '@/_core/hooks/useAuth'
import { startLogin } from '@/const'
import { AgriSignalOrb, GlassPanel } from '@/components/AgriVisuals'

type DashboardData = { stats?: { farms: number; unreadAlerts: number; monitoredFields: number; advisoryAdoption: number | null }; farms?: Array<{ id: string; name: string; areaHectares: number }>; alerts?: Array<{ id: string; title: string; message: string; priority: string }> }

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState('')
  const [authTimedOut, setAuthTimedOut] = useState(false)
  useEffect(() => { const timeout = window.setTimeout(() => setAuthTimedOut(true), 2500); return () => window.clearTimeout(timeout) }, [])
  useEffect(() => {
    if (!user) return
    fetch('/api/v1/dashboard').then(async response => { if (!response.ok) throw new Error('Dashboard data is unavailable'); return response.json() }).then(setData).catch(() => setError('Connect a farm to begin your intelligence feed.'))
  }, [user])

  if (loading && !authTimedOut) return <div className="dashboard-loading"><div className="loading-orbit" /><p>Opening your field desk…</p></div>
  if (!user) return <main className="dashboard-gate"><AgriSignalOrb compact /><GlassPanel className="dashboard-gate-card"><span className="eyebrow">PRIVATE FIELD DESK</span><h1>Your intelligence workspace is ready.</h1><p>Sign in to see saved farms, crop signals, advisories, and priority alerts.</p><button className="btn-primary" onClick={() => startLogin()}>Sign in to continue <ArrowUpRight size={16} /></button></GlassPanel></main>

  const stats = data?.stats ?? { farms: 0, unreadAlerts: 0, monitoredFields: 0, advisoryAdoption: null }
  return <main className="dashboard-page"><div className="dashboard-backdrop" aria-hidden="true" /><div className="dashboard-container">
    <motion.header className="dashboard-topbar" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}><div><Link href="/" className="dashboard-brand"><span className="brand-mark"><Leaf size={17} /></span> AgriNexus <em>AI</em></Link><span className="dashboard-breadcrumb">/ FIELD DESK</span></div><div className="dashboard-user"><span>{user.name ?? user.email ?? 'Farmer'}</span><button aria-label="Sign out" onClick={() => logout()}><LogOut size={16} /></button></div></motion.header>
    <section className="dashboard-hero"><div><span className="label-tag"><span className="live-dot" /> LIVE INTELLIGENCE</span><h1>Good morning, <i>{(user.name ?? 'farmer').split(' ')[0]}.</i></h1><p>Your field signals are quiet. Here’s the latest view of what needs your attention.</p></div><AgriSignalOrb compact /></section>
    <div className="dashboard-grid stats-grid">{([{ icon: Sprout, value: stats.farms, label: 'Farms connected', note: 'Your saved farm contexts' }, { icon: MapPinned, value: stats.monitoredFields, label: 'Fields monitored', note: 'Add a field to unlock insights' }, { icon: AlertTriangle, value: stats.unreadAlerts, label: 'Priority alerts', note: 'Read before your next visit' }, { icon: CheckCircle2, value: stats.advisoryAdoption == null ? '—' : `${stats.advisoryAdoption}%`, label: 'Advisory adoption', note: 'Measured from logged actions' }]).map(({ icon: Icon, value, label, note }, i) => <motion.div key={label} className="stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><div className="stat-icon"><Icon size={18} /></div><strong>{value}</strong><span>{label}</span><small>{note}</small></motion.div>)}</div>
    <div className="dashboard-grid content-grid"><GlassPanel className="dashboard-panel farms-panel"><div className="panel-heading"><div><span className="eyebrow">YOUR LANDSCAPE</span><h2>Connected farms</h2></div><button className="icon-button" aria-label="Add farm"><Plus size={17} /></button></div>{error && <div className="empty-state"><CloudSun size={24} /><p>{error}</p><span>Use the farm actions to bring your first context into the system.</span></div>}{!error && (data?.farms?.length ? data.farms.map(farm => <div className="farm-row" key={farm.id}><span className="farm-avatar"><Sprout size={17} /></span><div><strong>{farm.name}</strong><span>{farm.areaHectares} hectares · Context synced</span></div><ArrowUpRight size={16} /></div>) : <div className="empty-state"><Sprout size={25} /><p>No farms connected yet.</p><span>Add your first farm to activate local guidance.</span><button className="btn-secondary"><Plus size={15} /> Add a farm</button></div>)}</GlassPanel><GlassPanel className="dashboard-panel alerts-panel"><div className="panel-heading"><div><span className="eyebrow">ATTENTION QUEUE</span><h2>Priority signals</h2></div><span className="queue-count">{stats.unreadAlerts} open</span></div>{data?.alerts?.length ? data.alerts.slice(0, 4).map(alert => <div className="alert-row" key={alert.id}><span className={`alert-mark ${alert.priority}`}><AlertTriangle size={15} /></span><div><strong>{alert.title}</strong><p>{alert.message}</p></div></div>) : <div className="empty-state compact"><CheckCircle2 size={25} /><p>No priority alerts.</p><span>New risks will appear here.</span></div>}</GlassPanel></div>
  </div></main>
}

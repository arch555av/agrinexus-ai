import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Pillars from './sections/Pillars'
import IntelligenceLoop from './sections/IntelligenceLoop'
import FarmerExperience from './sections/FarmerExperience'
import SatelliteIntelligence from './sections/SatelliteIntelligence'
import AgentArchitecture from './sections/AgentArchitecture'
import NudgeEngine from './sections/NudgeEngine'
import PolicyDashboard from './sections/PolicyDashboard'
import BRICSNetwork from './sections/BRICSNetwork'
import Impact from './sections/Impact'
import TechStack from './sections/TechStack'
import InteractiveDemo from './sections/InteractiveDemo'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-parchment)' }}>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pillars />
        <IntelligenceLoop />
        <FarmerExperience />
        <SatelliteIntelligence />
        <AgentArchitecture />
        <NudgeEngine />
        <PolicyDashboard />
        <BRICSNetwork />
        <Impact />
        <TechStack />
        <InteractiveDemo />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

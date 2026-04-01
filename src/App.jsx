import DarkVeil from './components/DarkVeil'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TechLogoLoop from './components/TechLogoLoop' // Import komponen baru
import ProjectSection from './components/ProjectSection'
import WhyHireMe from './components/WhyHireMe'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>

      {/* DarkVeil fixed — background seluruh halaman */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <DarkVeil
          hueShift={302}
          noiseIntensity={0.02}
          scanlineIntensity={0.04}
          scanlineFrequency={400}
          speed={0.5}
          warpAmount={2.0}
          resolutionScale={1}
        />
      </div>

      {/* Overlay sangat tipis — DarkVeil tetap kelihatan */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: 'rgba(5, 2, 12, 0.45)',
        pointerEvents: 'none',
      }} />

      {/* Konten */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <HeroSection />
        
        {/* Infinite Logo Loop dipasang di sini */}
        <TechLogoLoop />
        
        <ProjectSection />
        <WhyHireMe />
        <SkillsSection />
        <ContactSection />
      </div>

    </div>
  )
}
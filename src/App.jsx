import { useEffect, useState } from 'react'
import DarkVeil from './components/DarkVeil'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TechLogoLoop from './components/TechLogoLoop'
import ProjectSection from './components/ProjectSection'
import MyExperience from './components/MyExperience'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  // Setelah melewati layar hero, overlay digelapkan agar teks lebih mudah dibaca
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

      {/* Overlay — tipis di hero, lebih gelap di area konten */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: 'rgba(5, 2, 12, 1)',
        opacity: pastHero ? 0.68 : 0.4,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
      }} />

      {/* Konten */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <HeroSection />

        {/* Infinite Logo Loop tech stack */}
        <TechLogoLoop />

        <ProjectSection />
        <MyExperience />
        <SkillsSection />
        <ContactSection />
      </div>

    </div>
  )
}

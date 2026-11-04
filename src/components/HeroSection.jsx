import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import ReflectiveCard from './ReflectiveCard'
import GradientText from './GradientText'
import GlowButton from './GlowButton'

function useTyping(text, speed = 120, delay = 300) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    let interval
    const wait = setTimeout(() => {
      interval = setInterval(() => {
        if (i < text.length) setDisplayed(text.slice(0, ++i))
        else clearInterval(interval)
      }, speed)
    }, delay)
    return () => { clearTimeout(wait); clearInterval(interval) }
  }, [text, speed, delay])
  return displayed
}

function useRoles(roles, typeDelay = 150, eraseDelay = 30, pauseDelay = 1400) {
  const [text, setText] = useState('')
  useEffect(() => {
    let wordIndex = 0, charIndex = 0, isErasing = false, timeout
    const tick = () => {
      const current = roles[wordIndex]
      if (isErasing) {
        setText(current.slice(0, --charIndex))
        if (charIndex === 0) { isErasing = false; wordIndex = (wordIndex + 1) % roles.length; timeout = setTimeout(tick, typeDelay) }
        else timeout = setTimeout(tick, eraseDelay)
      } else {
        setText(current.slice(0, ++charIndex))
        if (charIndex === current.length) { isErasing = true; timeout = setTimeout(tick, pauseDelay) }
        else timeout = setTimeout(tick, typeDelay)
      }
    }
    timeout = setTimeout(tick, 500)
    return () => clearTimeout(timeout)
  }, [roles, typeDelay, eraseDelay, pauseDelay])
  return text
}

// ── Download PDF helper ──
function downloadCV() {
  const link = document.createElement('a')
  link.href = '/Berkas/Cv-RizkiFirdausPurnama.pdf'
  link.download = 'CV-RizkiFirdausPurnama.pdf'
  link.type = 'application/pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function scrollToId(e, id) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const ROLES = ['Web Development', 'Full Stack Development', 'Front-End Development']

const cursorStyle = (color) => ({
  display: 'inline-block', width: '2px', height: '0.85em',
  background: color, marginLeft: '3px', verticalAlign: 'middle',
  animation: 'blink 0.7s step-end infinite',
})

const heroCSS = `
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 2.5rem;
}
.about-highlights {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: grid;
  gap: 10px;
}
.about-highlights li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #b0b0b0;
  line-height: 1.6;
}
.about-highlights i {
  color: #b06ef3;
  margin-top: 5px;
  font-size: 0.85rem;
  width: 16px;
  text-align: center;
}
.social-link {
  color: #d4a8ff;
  font-size: 1.5rem;
  text-decoration: none;
  transition: color 0.3s, text-shadow 0.3s;
}
.social-link:hover {
  color: #b06ef3;
  text-shadow: 0 0 12px rgba(176,110,243,0.8);
}
`

export default function HeroSection() {
  const name = useTyping('Rizki Firdaus Purnama', 110, 400)
  const role = useRoles(ROLES)

  return (
    <div id="home">
      <style dangerouslySetInnerHTML={{ __html: heroCSS }} />

      {/* ========================================== */}
      {/* 1. SECTION INTRO (Terkunci 1 Layar Penuh)    */}
      {/* ========================================== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '100px 16px 80px',
      }}>

        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <p style={{ fontSize: '0.9rem', color: '#c8a8f0', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 500 }}>
            Full Stack Creative
          </p>

          <h1 style={{ fontSize: 'clamp(2.6rem, 8vw, 6.5rem)', fontWeight: 800, lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em' }}>
            <GradientText>Crafting the Surface.</GradientText>
          </h1>
          <h1 style={{ fontSize: 'clamp(2.6rem, 8vw, 6.5rem)', fontWeight: 800, color: '#f0f0f0', lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em' }}>
            Forging the Core.
          </h1>

          <p style={{ fontSize: '1rem', color: '#b0b0b0', marginTop: '2rem', fontWeight: 400, letterSpacing: '0.02em' }}>
            Computer Science Student • Web Developer • Full Stack Developer
          </p>

          {/* CTA utama */}
          <div className="hero-cta">
            <GlowButton href="#project" variant="primary" onClick={e => scrollToId(e, 'project')}>
              View Projects <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.9rem' }} />
            </GlowButton>
            <GlowButton href="#contact" onClick={e => scrollToId(e, 'contact')}>
              <i className="fa-solid fa-envelope" style={{ fontSize: '0.9rem', color: '#d4a8ff' }} /> Get in Touch
            </GlowButton>
          </div>
        </div>

        {/* Indikator Panah Scroll ke Bawah */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '32px', display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <a href="#about-me" aria-label="Scroll ke About" onClick={e => scrollToId(e, 'about-me')}
            style={{ color: '#d4a8ff', fontSize: '1.5rem', opacity: 0.6, textDecoration: 'none' }}>
            <i className="fa-solid fa-angles-down" />
          </a>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 2. SECTION ABOUT ME                          */}
      {/* ========================================== */}
      <section id="about-me" className="page-section" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>

          <div className="row align-items-center justify-content-between">

            {/* Kiri: Teks & Tombol */}
            <div className="col-lg-6 col-md-12">
              <span style={{ fontSize: '1.1rem', color: '#a0a0a0', letterSpacing: '0.05em' }}>Hello Guys</span>

              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#f0f0f0', margin: '10px 0 4px', lineHeight: 1.2 }}>
                I am{' '}
                <span style={{ color: '#b06ef3' }}>
                  {name}
                  <span style={cursorStyle('#b06ef3')} />
                </span>
              </h1>

              <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 400, color: '#d4a8ff', minHeight: '2rem', marginBottom: '1rem' }}>
                {role}
                <span style={cursorStyle('#d4a8ff')} />
              </h2>

              <p className="mt-4" style={{ maxWidth: '500px', color: '#b0b0b0' }}>
                Computer Science student at Binus University who builds web applications end-to-end, from database design to polished interfaces.
              </p>

              <ul className="about-highlights" style={{ maxWidth: '500px' }}>
                <li><i className="fa-solid fa-code" /> Full-stack with Laravel, React, Next.js and Supabase</li>
                <li><i className="fa-solid fa-briefcase" /> Full Stack Developer intern at Otto Pharmaceutical Industries</li>
                <li><i className="fa-solid fa-pen-ruler" /> UI/UX mindset, designing in Figma before writing code</li>
              </ul>

              <div style={{ marginTop: '1.75rem' }}>
                <GlowButton onClick={downloadCV}>
                  <i className="fa-solid fa-download" style={{ fontSize: '0.9rem', color: '#d4a8ff' }} /> Download CV
                </GlowButton>
              </div>

              {/* Social */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '2rem' }}>
                <span style={{ color: '#a0a0a0', fontWeight: 500, fontSize: '0.95rem' }}>Find Me On</span>
                {[
                  { href: 'https://github.com/RizkiFirdausPurnama',        icon: 'fa-brands fa-github',      label: 'GitHub' },
                  { href: 'https://www.instagram.com/kikifrdp',            icon: 'fa-brands fa-instagram',   label: 'Instagram' },
                  { href: 'https://www.linkedin.com/in/rizki-firdaus-purnama-bb2414255/', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
                ].map(({ href, icon, label }) => (
                  <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-link">
                    <i className={icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Kanan: Reflective Card (statis — efek kilau sudah mengikuti kursor) */}
            <div className="col-lg-6 col-md-12 d-flex justify-content-center justify-content-lg-end mt-5 mt-lg-0">
              <ReflectiveCard
                overlayColor="rgba(0, 0, 0, 0.25)"
                blurStrength={14}
                glassDistortion={30}
                metalness={1}
                roughness={0.45}
                displacementStrength={20}
                noiseScale={1}
                specularConstant={5}
                grayscale={0.15}
                color="#ffffff"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

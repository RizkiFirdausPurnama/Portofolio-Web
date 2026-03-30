import { useState, useEffect } from 'react'
import ReflectiveCard from './ReflectiveCard'

function useTyping(text, speed = 120, delay = 300) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const wait = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) setDisplayed(text.slice(0, ++i))
        else clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(wait)
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
  }, [])
  return text
}

export default function HeroSection() {
  const name = useTyping('Rizki Firdaus Purnama', 110, 400)
  const role = useRoles(['Web Development', 'Full Stack Development', 'Front-End Development', 'Data Analytics'])

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px',
    }}>
      <div className="container">
        <div className="row align-items-center">

          {/* Kiri: Teks */}
          <div className="col-lg-6 col-md-12">
            <span style={{ fontSize: '1.1rem', color: '#a0a0a0', letterSpacing: '0.05em' }}>Hello Guys</span>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#f0f0f0', margin: '10px 0 4px', lineHeight: 1.2 }}>
              I am{' '}
              <span style={{ color: '#b06ef3' }}>
                {name}
                <span style={{
                  display: 'inline-block', width: '2px', height: '0.85em',
                  background: '#b06ef3', marginLeft: '3px', verticalAlign: 'middle',
                  animation: 'blink 0.7s step-end infinite',
                }} />
              </span>
            </h1>

            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 400, color: '#d4a8ff', minHeight: '2rem', marginBottom: '1rem' }}>
              {role}
              <span style={{
                display: 'inline-block', width: '2px', height: '0.85em',
                background: '#d4a8ff', marginLeft: '3px', verticalAlign: 'middle',
                animation: 'blink 0.7s step-end infinite',
              }} />
            </h2>

            <p className="mt-4" style={{ maxWidth: '500px', color: '#b0b0b0' }}>
              A Computer Science student at Binus University passionate about building impactful solutions.
              Developing parallel skills in Front-End Development and Data Analytics, using UI/UX as a bridge
              to translate complex data into visually compelling interfaces.
            </p>

            <a href="/Berkas/Cv-RizkiFirdausPurnama.pdf" download style={{
              display: 'inline-block', marginTop: '1.75rem',
              background: '#9b59b6', color: '#fff',
              padding: '12px 32px', borderRadius: '8px',
              textDecoration: 'none', fontWeight: 600,
              transition: 'background 0.3s, box-shadow 0.3s',
              boxShadow: '0 0 18px rgba(155,89,182,0.5)',
            }}
              onMouseEnter={e => { e.target.style.background = '#8e44ad'; e.target.style.boxShadow = '0 0 28px rgba(155,89,182,0.8)' }}
              onMouseLeave={e => { e.target.style.background = '#9b59b6'; e.target.style.boxShadow = '0 0 18px rgba(155,89,182,0.5)' }}
            >
              Download CV
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '2rem' }}>
              <span style={{ color: '#a0a0a0', fontWeight: 500, fontSize: '0.95rem' }}>Find Me On</span>
              {[
                { href: 'https://github.com/RizkiFirdausPurnama',        icon: 'fa-brands fa-github' },
                { href: 'https://www.instagram.com/kikifrdp',            icon: 'fa-brands fa-instagram' },
                { href: 'https://www.linkedin.com/in/rizki-firdaus-purnama-bb2414255/', icon: 'fa-brands fa-linkedin-in' },
              ].map(({ href, icon }) => (
                <a key={icon} href={href} target="_blank" rel="noreferrer" style={{
                  color: '#d4a8ff', fontSize: '1.5rem',
                  textDecoration: 'none', transition: 'color 0.3s, text-shadow 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#b06ef3'; e.currentTarget.style.textShadow = '0 0 12px rgba(176,110,243,0.8)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#d4a8ff'; e.currentTarget.style.textShadow = 'none' }}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Kanan: Reflective Card */}
          <div className="col-lg-6 col-md-12 d-flex justify-content-center mt-5 mt-lg-0">
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
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </section>
  )
}
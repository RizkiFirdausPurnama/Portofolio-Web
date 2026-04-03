import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'
import ReflectiveCard from './ReflectiveCard'

// ── GradientText inline ──
function GradientText({ children, colors = ['#9b59b6', '#d4a8ff', '#b06ef3', '#ffffff', '#9b59b6'], animationSpeed = 6 }) {
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef(null)
  const animationDuration = animationSpeed * 1000

  useAnimationFrame(time => {
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return }
    elapsedRef.current += time - lastTimeRef.current
    lastTimeRef.current = time
    const fullCycle = animationDuration * 2
    const cycleTime = elapsedRef.current % fullCycle
    progress.set(cycleTime < animationDuration
      ? (cycleTime / animationDuration) * 100
      : 100 - ((cycleTime - animationDuration) / animationDuration) * 100
    )
  })

  const backgroundPosition = useTransform(progress, p => `${p}% 50%`)
  const gradientColors = [...colors, colors[0]].join(', ')
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '300% 100%',
    backgroundRepeat: 'repeat',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    fontWeight: 'inherit',
  }

  return (
    <motion.span style={{ ...gradientStyle, backgroundPosition }}>
      {children}
    </motion.span>
  )
}

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

// ── Komponen Tombol Glow (Adaptasi dari Navbar) ──
function GlowButton({ children, onClick }) {
  const buttonRef = useRef(null);

  const handlePointerMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--mouse-x', `${x}px`);
    btn.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <button
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      onClick={onClick}
      className="btn-glow-effect"
    >
      {children}
    </button>
  );
}

// ── CSS Injeksi untuk Animasi Blink & Glow Button ──
const heroCSS = `
@keyframes blink { 50% { opacity: 0; } }

.btn-glow-effect {
  --mouse-x: -1000px;
  --mouse-y: -1000px;
  position: relative;
  display: inline-block;
  margin-top: 1.75rem;
  padding: 12px 32px;
  border-radius: 999px; /* Bentuk pill/kapsul agar senada dengan navbar */
  background: rgba(15,10,25,0.65); /* Transparan gelap */
  border: 1px solid rgba(176,110,243,0.25);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  isolation: isolate;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

/* Glow di garis border yang mengikuti kursor */
.btn-glow-effect::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1.5px;
  background: radial-gradient(
    80px circle at var(--mouse-x) var(--mouse-y),
    #f472b6 0%,
    #c084fc 40%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Bias cahaya lembut ke arah luar */
.btn-glow-effect::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    60px circle at var(--mouse-x) var(--mouse-y),
    rgba(192, 132, 252, 0.4) 0%,
    transparent 100%
  );
  filter: blur(10px);
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-glow-effect:hover::after,
.btn-glow-effect:hover::before {
  opacity: 1;
}

.btn-glow-effect:hover {
  background: rgba(15,10,25,0.88);
  box-shadow: 0 4px 20px rgba(155,89,182,0.2);
}
`;

export default function HeroSection() {
  const name = useTyping('Rizki Firdaus Purnama', 110, 400)
  const role = useRoles(['Web Development', 'Full Stack Development', 'Front-End Development', 'Data Analytics'])

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
        paddingTop: '80px'
      }}>
        
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <p style={{ fontSize: '0.9rem', color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
            Full Stack Creative
          </p>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 800, lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em' }}>
            <GradientText>Visuals by Heart.</GradientText>
          </h1>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 800, color: '#f0f0f0', lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em' }}>
            Logic by Code.
          </h1>

          <p style={{ fontSize: '1rem', color: '#b0b0b0', marginTop: '2.5rem', fontWeight: 400, letterSpacing: '0.02em' }}>
            Computer Science Student • Web Developer • Data Enthusiast
          </p>
        </div>

        {/* Indikator Panah Scroll ke Bawah */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '40px', display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <a href="#about-me" onClick={(e) => {
            e.preventDefault();
            document.getElementById('about-me').scrollIntoView({ behavior: 'smooth' });
          }} style={{ color: '#d4a8ff', fontSize: '1.5rem', opacity: 0.6, textDecoration: 'none' }}>
            <i className="fa-solid fa-angles-down" />
          </a>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 2. SECTION ABOUT ME (Berada di layar ke-2)   */}
      {/* ========================================== */}
      <section id="about-me" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: '100px', 
        paddingBottom: '40px' 
      }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: '1140px', width: '100%' }}>
          
          <div className="row align-items-center justify-content-between">

            {/* Kiri: Teks & Tombol */}
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
                Computer Science student at Binus University focusing on Full-Stack and Web Development. Passionate about building robust, scalable, and functional web applications. Experienced in handling end-to-end development lifecycles, combining strong technical logic across both frontend interfaces and backend architectures to deliver efficient software solutions.
              </p>

              {/* Tombol Download CV dengan Efek Glow Navbar */}
              <GlowButton onClick={downloadCV}>
                Download CV
              </GlowButton>

              {/* Social */}
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
            <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end mt-5 mt-lg-0">
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
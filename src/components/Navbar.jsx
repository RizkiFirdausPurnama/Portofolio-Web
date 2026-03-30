import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'

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
    fontWeight: 700,
    fontSize: '1.25rem',
  }

  return (
    <motion.span style={{ ...gradientStyle, backgroundPosition }}>
      {children}
    </motion.span>
  )
}

// ── Navbar ──
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home',           href: '#home'    },
    { label: 'About',          href: '#home'    },
    { label: 'Project',        href: '#project' },
    { label: 'Tools & Skills', href: '#skills'  },
  ]

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, width: 'calc(100% - 48px)', maxWidth: '860px',
        background: scrolled ? 'rgba(15,10,25,0.88)' : 'rgba(15,10,25,0.65)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(176,110,243,0.25)', borderRadius: '999px',
        padding: '10px 20px',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 8px 32px rgba(155,89,182,0.2)' : '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Brand — GradientText */}
        <a href="#home" onClick={() => handleNavClick('#home')} style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <GradientText>MyPorto</GradientText>
        </a>

        {/* Desktop links */}
        <div className="d-none d-lg-flex" style={{ alignItems: 'center', gap: '4px' }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              style={{ color: '#c8a8f0', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', padding: '7px 16px', borderRadius: '999px', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.target.style.background = 'rgba(155,89,182,0.2)'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c8a8f0' }}
            >
              {link.label}
            </a>
          ))}
          <a href="https://www.linkedin.com/in/rizki-firdaus-purnama-bb2414255/" target="_blank" rel="noreferrer"
            style={{
              background: 'rgba(155,89,182,0.85)', color: '#fff', padding: '7px 20px',
              borderRadius: '999px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
              border: '1px solid rgba(176,110,243,0.5)', transition: 'all 0.25s ease',
              marginLeft: '6px', boxShadow: '0 0 14px rgba(155,89,182,0.35)',
            }}
            onMouseEnter={e => { e.target.style.background = '#9b59b6'; e.target.style.boxShadow = '0 0 24px rgba(155,89,182,0.65)' }}
            onMouseLeave={e => { e.target.style.background = 'rgba(155,89,182,0.85)'; e.target.style.boxShadow = '0 0 14px rgba(155,89,182,0.35)' }}
          >
            Contact Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="d-lg-none" onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'rgba(155,89,182,0.2)', border: '1px solid rgba(176,110,243,0.3)',
            color: '#d4a8ff', fontSize: '1.1rem', cursor: 'pointer',
            width: '38px', height: '38px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '78px', left: '50%', transform: 'translateX(-50%)',
          width: 'calc(100% - 48px)', maxWidth: '860px', zIndex: 999,
          background: 'rgba(15,10,25,0.95)', backdropFilter: 'blur(18px)',
          border: '1px solid rgba(176,110,243,0.2)', borderRadius: '20px', padding: '12px 16px',
        }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              style={{ display: 'block', color: '#c8a8f0', textDecoration: 'none', fontWeight: 500, padding: '11px 16px', borderRadius: '12px', transition: 'background 0.2s' }}
              onMouseEnter={e => e.target.style.background = 'rgba(155,89,182,0.15)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >
              {link.label}
            </a>
          ))}
          <div style={{ borderTop: '1px solid rgba(176,110,243,0.15)', marginTop: '8px', paddingTop: '8px' }}>
            <a href="https://www.linkedin.com/in/rizki-firdaus-purnama-bb2414255/" target="_blank" rel="noreferrer"
              style={{ display: 'block', background: '#9b59b6', color: '#fff', padding: '11px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, textAlign: 'center' }}>
              Contact Me
            </a>
          </div>
        </div>
      )}
    </>
  )
}
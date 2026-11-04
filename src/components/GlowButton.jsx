import { useRef } from 'react'

// ── Tombol pill dengan glow border yang mengikuti kursor ──
// Render <a> jika ada href, selain itu <button>. Style ada di index.css (.btn-glow-effect)
export default function GlowButton({ children, href, onClick, variant, external = false }) {
  const ref = useRef(null)

  const handlePointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const className = `btn-glow-effect${variant === 'primary' ? ' btn-glow-primary' : ''}`

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        className={className}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" onClick={onClick} onPointerMove={handlePointerMove} className={className}>
      {children}
    </button>
  )
}

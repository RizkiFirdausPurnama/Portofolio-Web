import GradientText from './GradientText'
import { useReveal } from '../hooks/useReveal'

// ── Header seragam untuk semua section: label kecil, judul gradien, subjudul ──
export default function SectionHeader({ eyebrow, icon = 'fa-solid fa-star', title, subtitle }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal section-header">
      {eyebrow && (
        <div className="section-eyebrow">
          <i className={icon} />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="section-title">
        <GradientText>{title}</GradientText>
      </h2>
      {subtitle && <p className="section-subtitle-text">{subtitle}</p>}
    </div>
  )
}

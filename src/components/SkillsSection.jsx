import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const skills = [
  { icon: 'fa-brands fa-figma',      label: 'Figma' },
  { icon: 'fa-brands fa-html5',      label: 'HTML5' },
  { icon: 'fa-brands fa-css3-alt',   label: 'CSS3' },
  { icon: 'fa-brands fa-js',         label: 'JavaScript' },
  { icon: 'fa-brands fa-python',     label: 'Python' },
  { icon: 'fa-solid fa-database',    label: 'MySQL' },
  { icon: 'fa-brands fa-bootstrap',  label: 'Bootstrap' },
  { icon: 'fa-solid fa-c',           label: 'C', extra: null },
  { icon: 'fa-solid fa-c',           label: 'C++', extra: '++' },
  { icon: 'fa-brands fa-php',        label: 'PHP' },
  { icon: 'fa-brands fa-laravel',    label: 'Laravel' },
  { icon: 'fa-brands fa-git-alt',    label: 'Git' },
  { icon: 'fa-brands fa-react',      label: 'React.js' },
]

function SkillIcon({ skill }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div title={skill.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fff' : 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${hovered ? '#fff' : 'rgba(176,110,243,0.2)'}`,
        width: '100px', height: '100px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '20px', cursor: 'default',
        boxShadow: hovered ? '0 0 20px rgba(255,255,255,0.15)' : '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        flexDirection: 'row',
      }}
    >
      <i className={skill.icon} style={{ fontSize: '3rem', color: hovered ? '#101010' : '#f0f0f0', transition: 'color 0.3s' }} />
      {skill.extra && (
        <span style={{ fontSize: '2rem', fontWeight: 700, color: hovered ? '#101010' : '#f0f0f0', marginLeft: '-4px', lineHeight: 1, transition: 'color 0.3s' }}>
          {skill.extra}
        </span>
      )}
    </div>
  )
}

export default function SkillsSection() {
  const titleRef = useReveal()
  const gridRef  = useReveal()
  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <div className="container">
        <div ref={titleRef} className="reveal text-center mb-5">
          <h2 style={{ color: '#f0f0f0' }}>Tools and <span style={{ color: '#9b59b6' }}>Skills</span></h2>
        </div>
        <div ref={gridRef} className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {skills.map(s => <SkillIcon key={s.label} skill={s} />)}
        </div>
      </div>
    </section>
  )
}
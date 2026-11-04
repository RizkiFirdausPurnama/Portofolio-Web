import { useReveal } from '../hooks/useReveal'
import SectionHeader from './SectionHeader'
import { SiNextdotjs, SiSupabase, SiPostgresql, SiTailwindcss } from 'react-icons/si'

// Skill dikelompokkan per kategori. Pakai `icon` (class FontAwesome) atau `customIcon` (React Icons).
const skillGroups = [
  {
    title: 'Frontend',
    icon: 'fa-solid fa-display',
    skills: [
      { icon: 'fa-brands fa-html5',      label: 'HTML5' },
      { icon: 'fa-brands fa-css3-alt',   label: 'CSS3' },
      { icon: 'fa-brands fa-js',         label: 'JavaScript' },
      { icon: 'fa-brands fa-react',      label: 'React.js' },
      { icon: 'fa-brands fa-vuejs',      label: 'Vue.js' },
      { customIcon: <SiNextdotjs />,     label: 'Next.js' },
      { icon: 'fa-brands fa-bootstrap',  label: 'Bootstrap' },
      { customIcon: <SiTailwindcss />,   label: 'Tailwind' },
    ],
  },
  {
    title: 'Backend & Database',
    icon: 'fa-solid fa-server',
    skills: [
      { icon: 'fa-brands fa-php',        label: 'PHP' },
      { icon: 'fa-brands fa-laravel',    label: 'Laravel' },
      { icon: 'fa-solid fa-database',    label: 'MySQL' },
      { customIcon: <SiPostgresql />,    label: 'PostgreSQL' },
      { customIcon: <SiSupabase />,      label: 'Supabase' },
    ],
  },
  {
    title: 'Languages & Tools',
    icon: 'fa-solid fa-screwdriver-wrench',
    skills: [
      { icon: 'fa-brands fa-python',     label: 'Python' },
      { icon: 'fa-solid fa-c',           label: 'C' },
      { icon: 'fa-solid fa-c',           label: 'C++', extra: '++' },
      { icon: 'fa-brands fa-git-alt',    label: 'Git' },
      { icon: 'fa-brands fa-figma',      label: 'Figma' },
    ],
  },
]

const skillsCSS = `
.skill-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.skill-group {
  background: rgba(15,10,25,0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 28px;
  backdrop-filter: blur(8px);
}
.skill-group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #f0f0f0;
  margin: 0 0 20px;
}
.skill-group-title i { color: #b06ef3; font-size: 0.95rem; }
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(82px, 1fr));
  gap: 12px;
}
.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 6px;
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(176,110,243,0.15);
  color: #f0f0f0;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.skill-item:hover {
  background: #fff;
  border-color: #fff;
  color: #101010;
  transform: translateY(-3px);
}
.skill-icon {
  display: flex;
  align-items: baseline;
  font-size: 1.9rem;
  line-height: 1;
}
.skill-icon .extra {
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: -2px;
}
.skill-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #b0b0b0;
  text-align: center;
  transition: color 0.3s ease;
}
.skill-item:hover .skill-label { color: #3a2a4a; }
@media (max-width: 400px) {
  .skill-groups { grid-template-columns: 1fr; }
  .skill-group { padding: 20px; }
}
`

function SkillItem({ skill }) {
  return (
    <div className="skill-item">
      <span className="skill-icon">
        {skill.customIcon ?? <i className={skill.icon} />}
        {skill.extra && <span className="extra">{skill.extra}</span>}
      </span>
      <span className="skill-label">{skill.label}</span>
    </div>
  )
}

export default function SkillsSection() {
  const gridRef = useReveal()
  return (
    <section id="skills" className="page-section">
      <style dangerouslySetInnerHTML={{ __html: skillsCSS }} />
      <div className="container">
        <SectionHeader
          eyebrow="Toolbox"
          icon="fa-solid fa-code"
          title="Tools and Skills"
          subtitle="Technologies I use to design, build and ship web applications."
        />
        <div ref={gridRef} className="reveal skill-groups">
          {skillGroups.map(group => (
            <div key={group.title} className="skill-group">
              <h3 className="skill-group-title"><i className={group.icon} /> {group.title}</h3>
              <div className="skill-grid">
                {group.skills.map(s => <SkillItem key={s.label} skill={s} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

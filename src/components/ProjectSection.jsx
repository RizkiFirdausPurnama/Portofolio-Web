import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const projects = [
  {
    id: 'nyusur',
    category: 'Web Development',
    title: 'Nyusur',
    description: 'Nyusur is a website for reporting damaged roads in Indonesia. Reports are saved in Firebase and this project was carried out by me and 4 of my friends.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/RizkiFirdausPurnama/Nyusur',
    images: ['Nyusur1', 'Nyusur2', 'Nyusur3', 'Nyusur4', 'Nyusur5', 'Nyusur6'],
    ext: 'png',
  },
  {
    id: 'shopco',
    category: 'Web Development',
    title: 'SHOP.CO',
    description: 'SHOP.CO is a responsive e-commerce web application built using a headless architecture. Implements a complete shopping experience for users and a robust CMS for admins.',
    tags: ['React.js', 'Tailwind CSS', 'Laravel 11', 'MySQL', 'REST API'],
    github: 'https://github.com/RizkiFirdausPurnama/E-Commerce-Web',
    images: ['Shop.co1','Shop.co2','Shop.co3','Shop.co4','Shop.co5','Shop.co6','Shop.co7','Shop.co8','Shop.co9','Shop.co10','Shop.co11','Shop.co12'],
    ext: 'png',
  },
  {
    id: 'doctime',
    category: 'UI/UX Design',
    title: 'App DocTime',
    description: 'DocTime is a project for the Human and Computer Interaction course, carried out by me and 3 of my friends.',
    tags: ['Figma'],
    github: 'https://www.figma.com/design/Tk1UXNkigy2vN9SaTSvQNZ/Wireframe-DocTime---Tugas-HCI?node-id=0-1&p=f&t=RhjPhQGdzTeLqkvw-0',
    images: ['doctime1','doctime2','doctime3','doctime4','doctime5','doctime6'],
    ext: 'jpg',
  },
  {
    id: 'warnet',
    category: 'Web Development',
    title: 'WarnetGalaxy',
    description: 'Warnet Galaxy is a website whose main purpose is to store customer rental data, automatically saved to the database.',
    tags: ['PHP', 'JavaScript', 'CSS', 'MySQL'],
    github: 'https://github.com/RizkiFirdausPurnama/Web-Warnet-Galaxy',
    images: ['WarnetGalaxy1', 'WarnetGalaxy2', 'WarnetGalaxy3'],
    ext: 'png',
  },
]

const arrowBtn = (side) => ({
  position: 'absolute', top: '50%', [side]: '12px',
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', width: '42px', height: '42px',
  borderRadius: '50%', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '1rem', zIndex: 2, transition: 'background 0.3s',
})

function ProjectCard({ project }) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const ref = useReveal()

  return (
    <div ref={ref} className="reveal col-lg-10 col-md-12 mb-5 mx-auto">
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(176,110,243,0.15)',
          borderRadius: '15px', overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hovered ? '0 12px 35px rgba(155,89,182,0.2)' : '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
          <img
            src={`/Foto/${project.images[current]}.${project.ext}`}
            alt={`${project.title} slide ${current + 1}`}
            style={{ width: '100%', height: '400px', objectFit: 'contain', display: 'block' }}
          />
          {project.images.length > 1 && (<>
            <button onClick={() => setCurrent(i => (i - 1 + project.images.length) % project.images.length)} style={arrowBtn('left')}>
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button onClick={() => setCurrent(i => (i + 1) % project.images.length)} style={arrowBtn('right')}>
              <i className="fa-solid fa-chevron-right" />
            </button>
            <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px' }}>
              {project.images.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: i === current ? '24px' : '8px', height: '8px',
                  borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: i === current ? '#9b59b6' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease', padding: 0,
                }} />
              ))}
            </div>
          </>)}
        </div>
        <div style={{ padding: '25px' }}>
          <span style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>{project.category}</span>
          <h3 style={{ fontSize: '1.5rem', color: '#f0f0f0', margin: '5px 0 10px' }}>{project.title}</h3>
          <p>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '18px 0' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                background: 'rgba(155,89,182,0.15)', color: '#d4a8ff',
                border: '1px solid rgba(176,110,243,0.3)',
                padding: '5px 12px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
          <a href={project.github} target="_blank" rel="noreferrer" style={{
            display: 'inline-block', background: '#9b59b6', color: '#fff',
            padding: '10px 30px', borderRadius: '50px', textDecoration: 'none',
            fontWeight: 600, fontSize: '1rem', border: '2px solid #9b59b6', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = '#9b59b6' }}
            onMouseLeave={e => { e.target.style.background = '#9b59b6'; e.target.style.color = '#fff' }}
          >See Project</a>
        </div>
      </div>
    </div>
  )
}

export default function ProjectSection() {
  const titleRef = useReveal()
  return (
    <section id="project" style={{ padding: '80px 0' }}>
      <div className="container">
        <div ref={titleRef} className="reveal text-center mb-5">
          <h2>Latest <span style={{ color: '#9b59b6' }}>Project</span></h2>
        </div>
        <div className="row">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
import { useReveal } from '../hooks/useReveal'

const items = [
  { icon: 'fa-solid fa-briefcase',   title: 'Workaholic',    desc: "I'm a kind of person who can't just stand around and doing nothing. I have a tendency to do something productive." },
  { icon: 'fa-solid fa-comments',    title: 'Communicative', desc: 'I have a broad understanding of verbal vocabulary. Therefore, I can convey a message well to the receiver.' },
  { icon: 'fa-solid fa-thumbs-up',   title: 'Cooperative',   desc: 'Behind the successful project, there\'s a great team. I can build a good cooperation and remain consistent with the goal.' },
  { icon: 'fa-solid fa-certificate', title: 'Perfectionist', desc: 'I have a strong intuition. I have remained consistent with high quality standards to present a most worthy result.' },
]

function HireCard({ item }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal col-md-3 col-sm-6 mb-4">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{
          width: '90px', height: '90px',
          background: 'rgba(155,89,182,0.1)', border: '2px solid #9b59b6',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 25px',
        }}>
          <i className={item.icon} style={{ fontSize: '2.5rem', color: '#9b59b6' }} />
        </div>
        <h4 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '10px', color: '#f0f0f0' }}>{item.title}</h4>
        <p>{item.desc}</p>
      </div>
    </div>
  )
}

export default function WhyHireMe() {
  const titleRef = useReveal()
  return (
    <section style={{ padding: '80px 0', background: '#181818' }}>
      <div className="container">
        <div ref={titleRef} className="reveal text-center mb-5">
          <h2 style={{ color: '#f0f0f0' }}>Why Hire Me</h2>
        </div>
        <div className="row text-center">
          {items.map(item => <HireCard key={item.title} item={item} />)}
        </div>
      </div>
    </section>
  )
}

import { useReveal } from '../hooks/useReveal'

export default function ContactSection() {
  const ref = useReveal()
  return (
    <>
      <section id="contact" style={{ padding: '80px 0' }}>
        <div className="container">
          <div ref={ref} className="reveal">
            <div className="col-lg-6 col-md-8">
              <h2 style={{ color: '#f0f0f0' }}>Get in Touch</h2>
              <p className="mt-3">For business and partnership inquiry please contact me below!</p>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[
                  { icon: 'fa-brands fa-linkedin-in', text: 'Rizki Firdaus Purnama' },
                  { icon: 'fa-solid fa-envelope',     text: 'kikifirdaus2408@gmail.com' },
                  { icon: 'fa-solid fa-map-marker-alt', text: 'Kota Bandung' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '1.05rem' }}>
                    <i className={icon} style={{ fontSize: '1.4rem', color: '#9b59b6', width: '28px', textAlign: 'center' }} />
                    <span style={{ color: '#f0f0f0' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer style={{ borderTop: '1px solid rgba(176,110,243,0.15)', padding: '1.5rem 0', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#a0a0a0' }}>© 2025 MyPorto. All Rights Reserved.</p>
      </footer>
    </>
  )
}
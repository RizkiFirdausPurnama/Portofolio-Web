import { useReveal } from '../hooks/useReveal'
import SectionHeader from './SectionHeader'
import GlowButton from './GlowButton'

const EMAIL = 'kikifirdaus2408@gmail.com'

const contacts = [
  { icon: 'fa-solid fa-envelope',       label: 'Email',    text: EMAIL, href: `mailto:${EMAIL}` },
  { icon: 'fa-brands fa-linkedin-in',   label: 'LinkedIn', text: 'Rizki Firdaus Purnama', href: 'https://www.linkedin.com/in/rizki-firdaus-purnama-bb2414255/' },
  { icon: 'fa-brands fa-github',        label: 'GitHub',   text: '@RizkiFirdausPurnama', href: 'https://github.com/RizkiFirdausPurnama' },
  { icon: 'fa-solid fa-location-dot',   label: 'Location', text: 'Kota Bandung' },
]

const socials = [
  { href: 'https://github.com/RizkiFirdausPurnama', icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: 'https://www.instagram.com/kikifrdp', icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/rizki-firdaus-purnama-bb2414255/', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
]

const contactCSS = `
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  max-width: 780px;
  margin: 0 auto;
}
.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
  border-radius: 18px;
  background: rgba(15,10,25,0.6);
  border: 1px solid rgba(255,255,255,0.08);
  color: inherit;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
a.contact-card:hover {
  border-color: rgba(176,110,243,0.5);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(176,110,243,0.15);
  color: inherit;
}
.contact-icon {
  flex: 0 0 auto;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(176,110,243,0.12);
  border: 1px solid rgba(176,110,243,0.3);
  color: #d4a8ff;
  font-size: 1.15rem;
}
.contact-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a0a0a0;
}
.contact-text {
  display: block;
  color: #f0f0f0;
  font-weight: 500;
  overflow-wrap: anywhere;
}
.site-footer {
  border-top: 1px solid rgba(176,110,243,0.15);
  padding: 1.75rem 0;
}
.site-footer .container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1140px;
}
.footer-socials { display: flex; gap: 18px; }
.footer-socials a { color: #a0a0a0; font-size: 1.15rem; transition: color 0.3s ease; }
.footer-socials a:hover { color: #d4a8ff; }
@media (max-width: 640px) {
  .contact-grid { grid-template-columns: 1fr; }
}
@media (max-width: 576px) {
  .site-footer .container { justify-content: center; text-align: center; }
}
`

export default function ContactSection() {
  const ref = useReveal()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: contactCSS }} />
      <section id="contact" className="page-section">
        <div className="container">
          <SectionHeader
            eyebrow="Contact"
            icon="fa-solid fa-paper-plane"
            title="Get in Touch"
            subtitle="Open for internships, freelance projects and collaboration. Feel free to reach out!"
          />

          <div ref={ref} className="reveal">
            <div className="contact-grid">
              {contacts.map(({ icon, label, text, href }) => {
                const content = (
                  <>
                    <span className="contact-icon"><i className={icon} /></span>
                    <span>
                      <span className="contact-label">{label}</span>
                      <span className="contact-text">{text}</span>
                    </span>
                  </>
                )
                return href ? (
                  <a key={label} href={href} className="contact-card"
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {content}
                  </a>
                ) : (
                  <div key={label} className="contact-card">{content}</div>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <GlowButton href={`mailto:${EMAIL}`} variant="primary">
                <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.9rem' }} /> Send Me an Email
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p style={{ margin: 0, color: '#a0a0a0', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} Rizki Firdaus Purnama. All Rights Reserved.
          </p>
          <div className="footer-socials">
            {socials.map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import { FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaVuejs, FaPhp, FaLaravel, FaNodeJs, FaPython, FaGitAlt, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiSupabase, SiMysql } from 'react-icons/si';

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

// ── GlowButton inline untuk modal footer ──
function GlowButton({ children, href }) {
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
    <a
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="btn-glow-effect"
    >
      {children}
    </a>
  );
}

// Data Project 
const projectsData = [
  {
    id: 1,
    title: "Digital Sign System",
    category: "FULL-STACK WEB",
    year: "2026",
    image: "Foto/Digi.png", 
    bgGradient: "linear-gradient(135deg, #1e1a2f 0%, #151020 100%)",
    technologies: ["Laravel 5.4", "PHP 5.6", "MySQL", "PDF.js"],
    description: "DigiSing is a secure Digital Signature web application inspired by OpenSign, designed to digitalize and streamline corporate document approvals. I engineered this application entirely from scratch for corporate needs, independently handling the full software development lifecycle without team support.\n\n✨ Key Features:\n• Document Management: Integrated dashboard to track document statuses (Draft, Pending, Completed).\n• Interactive PDF Viewer: In-browser document preview using PDF.js without downloading.\n• Drag-and-Drop Editor: Visual interface for precise signature placement on PDF pages.\n• Multi-Signer Workflow: Supports sequential and parallel signing workflows for verified users.\n• Guest Signing: Secure, account-less signing via email links for external parties.\n• Signature Pad: Real-time digital signature drawing using mouse, stylus, or touch.\n• Reusable Templates: Save and reuse signature position templates for recurring documents.\n• Automated Notifications & Audit Log: Email alerts and detailed activity history tracking.\n• Auto-Generate & Cleanup: Automatically merges digital signatures into the original PDF and securely deletes physical files when documents are removed."
  },
  {
    id: 2,
    title: "Kasir Pintar",
    category: "FULL-STACK WEB",
    year: "2025 - Present",
    image: "Foto/KasirPintar.png",
    bgGradient: "linear-gradient(135deg, #2a1b38 0%, #170f1c 100%)",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    description: "Kasir Pintar is an integrated Point of Sales (POS) and Admin Dashboard application built to optimize daily retail business operations. I designed and developed this system completely from scratch, taking full ownership from the initial database architecture up to the final production deployment.\n\n✨ Key Features & Business Logic:\n• Executive Dashboard (BI): Real-time financial monitoring featuring Gross Revenue, Real Profit calculation ((Selling Price - Capital Price) x Qty), Total Transactions, and Asset Valuation for warehouse stock. Includes a 7-day trend bar chart.\n• Smart Inventory Management: Proactive warehouse system with an automated Low Stock Alert algorithm, visual banners for critical items, and comprehensive CRUD & restock history management.\n• Optimized POS Interface: Distraction-free, fullscreen cashier mode. Features dynamic cart management, instant cash payments with automated change calculation, and support for Bank Transfers and Credit/Debt (Kasbon) payments—all logged precisely.\n• CRM & Reporting: Customer directory and comprehensive transaction reports with date-range filters."
  },
  {
    id: 3,
    title: "SHOP.CO",
    category: "FULL-STACK WEB",
    year: "2025",
    image: "Foto/Shop.co.png",
    bgGradient: "linear-gradient(135deg, #231b2e 0%, #0f0a14 100%)",
    technologies: ["React.js", "Laravel 10", "Tailwind CSS", "MySQL"],
    repoLink: "https://github.com/RizkiFirdausPurnama/doctime", // Ingat untuk diganti dengan link repo Shop.co yang benar
    description: "SHOP.CO is a responsive E-Commerce web application built with a modern Headless architecture, separating the frontend shopping experience from the backend CMS. I built this platform entirely on my own and independently managed the complete deployment phase (Frontend on Vercel, Backend on Railway).\n\n✨ Key Features:\n• Customer Interface: Interactive homepage with dynamic Hero Banners, New Arrivals, and real-time live search with dropdown suggestions.\n• Advanced Product Details: Complete photo galleries and custom variants selection (Hex Code colors and multi-category sizing) with strict pre-cart stock validation.\n• Seamless Checkout & Dashboard: Dynamic shopping cart with auto-subtotal calculation, simulated checkout, and a user dashboard to track order statuses.\n• Admin CMS: Comprehensive dashboard visualizing Total Revenue, Orders, and Active Users. Features full CRUD capabilities for multi-variant products and incoming order management."
  },
  {
    id: 4,
    title: "DocTime",
    category: "UI/UX & FRONT-END",
    year: "2025",
    image: "Foto/doctime.png", 
    bgGradient: "linear-gradient(135deg, #231b2e 0%, #0f0a14 100%)",
    technologies: ["HTML5", "CSS3", "Vanilla JS", "Figma"],
    repoLink: "https://github.com/RizkiFirdausPurnama/Web-DocTime", // Kosongkan atau hapus baris ini jika tidak ada repository-nya
    description: "DocTime is a static website prototype for an online health consultation service. This project was developed collaboratively in a team of 4, where my primary role focused on UI/UX Design and Front-end Development using pure HTML, CSS, and Vanilla JavaScript.\n\n✨ Key Features:\n• Interactive Popup Login: Modal-based login interface on the homepage without requiring page reloads.\n• Dedicated Registration & Routing: Seamless user flow routing from a dedicated sign-up page to success messaging, login, and finally the user dashboard.\n• Client-Side Validation: Strict form validation enforcing mandatory fields and specific email domains (@gmail.com) for registration.\n• Multi-Page Navigation: Smooth navigation logic across various prototype interfaces including home, chat, and schedule pages.\n• Organized Architecture: Clean and modular file structure separating HTML (layout), CSS (styling), and JavaScript (logic)."
  }
];

const projectCSS = `
  .project-card {
    transition: transform 0.3s ease;
  }
  .project-card .img-wrapper {
    overflow: hidden;
    position: relative;
    border-radius: 24px;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    border: 1px solid rgba(176,110,243,0.1);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .project-card .project-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
  .project-card:hover .img-wrapper {
    border-color: rgba(176,110,243,0.4);
    box-shadow: 0 10px 40px rgba(176,110,243,0.15);
  }
  .project-card:hover .project-img {
    transform: scale(1.05) translateY(-5px);
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #0a0612; 
    border-radius: 0 24px 24px 0;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(176,110,243,0.3); 
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(176,110,243,0.5); 
  }

  /* CSS Tombol Glow Repo */
  .btn-glow-effect {
    --mouse-x: -1000px;
    --mouse-y: -1000px;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    border-radius: 999px;
    background: rgba(15,10,25,0.65);
    border: 1px solid rgba(176,110,243,0.25);
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    isolation: isolate;
    transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
  }

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

  .btn-glow-effect:hover::after {
    opacity: 1;
  }

  .btn-glow-effect:hover {
    background: rgba(15,10,25,0.88);
    box-shadow: 0 4px 20px rgba(155,89,182,0.2);
    color: #fff;
  }
`;

export default function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  return (
    <section id="project" style={{ padding: '100px 0', position: 'relative', zIndex: 2 }}>
      <style dangerouslySetInnerHTML={{ __html: projectCSS }} />
      
      <div className="container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'right', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: 0 }}>
            <GradientText>Latest Project</GradientText>
          </h2>
          <p style={{ color: '#a0a0a0', marginTop: '10px', fontSize: '1.1rem' }}>
            A curated selection showcasing my expertise and the achieved results.
          </p>
        </div>

        <div className="row g-5">
          {projectsData.map(proj => (
            <div className="col-lg-6 col-md-12" key={proj.id}>
              <div 
                className="project-card" 
                onClick={() => setSelectedProject(proj)}
                style={{ cursor: 'pointer' }}
              >
                <div className="img-wrapper" style={{ background: proj.bgGradient }}>
                  <img src={proj.image} alt={proj.title} className="project-img" />
                </div>
                
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', color: '#f0f0f0', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                      {proj.title}
                    </h3>
                    <span style={{ color: '#a0a0a0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
                      {proj.category}
                    </span>
                  </div>
                  <div style={{ padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', color: '#a0a0a0', fontSize: '0.85rem' }}>
                    {proj.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 20px 40px 20px' }}>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(5, 2, 12, 0.85)', backdropFilter: 'blur(10px)' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="custom-scrollbar"
              style={{
                position: 'relative',
                background: '#0a0612', 
                border: '1px solid rgba(176,110,243,0.3)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '850px',
                maxHeight: '80vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 60px rgba(176,110,243,0.15)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{ 
                  position: 'absolute', top: '24px', right: '24px', width: '44px', height: '44px', 
                  borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', 
                  color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  cursor: 'pointer', zIndex: 10, transition: 'all 0.2s', backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.2)'; e.target.style.transform = 'scale(1.05)' }}
                onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.4)'; e.target.style.transform = 'scale(1)' }}
              >
                <i className="fa-solid fa-xmark" style={{ pointerEvents: 'none', fontSize: '1.2rem' }}></i>
              </button>

              {/* ── AREA GAMBAR DENGAN GRADIENT FADE ── */}
              <div style={{ 
                position: 'relative',
                width: '100%', 
                flexShrink: 0, // KUNCI UTAMA: Memaksa container ini tidak disusutkan oleh Flexbox modal!
                background: selectedProject.bgGradient,
                borderTopLeftRadius: '24px', 
                borderTopRightRadius: '24px',
                overflow: 'hidden'
              }}>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', // Gambar merentang penuh sesuai aslinya ke bawah
                    display: 'block',
                    zIndex: 1
                  }} 
                />
                
                {/* Efek Gradien Mudar Menyatu Hitam dikembalikan agar desain tetap smooth */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, 
                  left: 0,
                  right: 0,
                  height: '250px', 
                  background: 'linear-gradient(to bottom, rgba(10,6,18,0) 0%, #0a0612 100%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }} />
              </div>

              {/* ── AREA KONTEN ── */}
              {/* Efek melayang (overlap) dikembalikan seperti yang kamu suka */}
              <div style={{ padding: '0 50px 40px 50px', position: 'relative', zIndex: 3, marginTop: '-45px' }}>
                
                <div style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', 
                  borderRadius: '999px', border: '1px solid rgba(176,110,243,0.5)', 
                  background: 'rgba(176,110,243,0.1)', color: '#d4a8ff', fontSize: '0.85rem', 
                  fontWeight: 600, marginBottom: '20px' 
                }}>
                  <i className="fa-solid fa-tag" style={{ fontSize: '0.75rem' }}></i> {selectedProject.category}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#f0f0f0', margin: 0, letterSpacing: '-0.03em' }}>
                    {selectedProject.title}
                  </h2>
                  <div style={{ padding: '8px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', color: '#a0a0a0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-regular fa-calendar"></i> {selectedProject.year}
                  </div>
                </div>

                <div style={{ marginBottom: '35px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#f0f0f0', fontWeight: 600, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '0.05em' }}>
                    <span style={{ display: 'inline-block', width: '4px', height: '16px', background: '#b06ef3', borderRadius: '2px' }}></span>
                    TECHNOLOGIES USED
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} style={{ padding: '8px 18px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#d4a8ff', fontSize: '0.9rem', fontWeight: 500 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#f0f0f0', fontWeight: 600, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '0.05em' }}>
                    <span style={{ display: 'inline-block', width: '4px', height: '16px', background: '#b06ef3', borderRadius: '2px' }}></span>
                    ABOUT PROJECT
                  </h4>
                  <p style={{ color: '#a0a0a0', lineHeight: 1.8, fontSize: '1.05rem', margin: 0, whiteSpace: 'pre-line' }}>
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tombol otomatis hilang jika tidak ada link */}
                {selectedProject.repoLink && (
                  <div style={{ 
                    borderTop: '1px solid rgba(176,110,243,0.1)', 
                    paddingTop: '30px', 
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'flex-start' 
                  }}>
                      <GlowButton href={selectedProject.repoLink}>
                          <i className="fa-brands fa-github" style={{ fontSize: '1.1rem', color: '#d4a8ff' }}></i> View Repository
                      </GlowButton>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
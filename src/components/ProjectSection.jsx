import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from './SectionHeader';
import GlowButton from './GlowButton';
import { useReveal } from '../hooks/useReveal';

// Data Project (urutan di sini = urutan tampil, terbaru di atas)
// `image` boleh dikosongkan dulu; kartu akan menampilkan placeholder bergaya sampai screenshot tersedia.
const projectsData = [
  {
    id: 6,
    title: "AI Clipper Automation",
    category: "AI AUTOMATION",
    year: "2026 - Present",
    image: "public/Foto/shot clipper.png",
    bgGradient: "linear-gradient(135deg, #2a1d14 0%, #120c1c 100%)",
    technologies: ["Python", "FastAPI", "React", "Whisper", "Gemini", "FFmpeg", "Supabase", "Tailwind CSS"],
    description: "AI Clipper Automation is an end-to-end video clipper: paste a YouTube link or upload a long video, and it produces several ready-to-post vertical (9:16) short clips without manual editing. Built in a team of 2 for paid clipping campaigns, it extends the open-source AutoClip project (MIT) and adapts it for Indonesian gaming and streaming content.\n\n✨ Key Features:\n• Automated Pipeline: yt-dlp download → local Whisper transcription with word timestamps → LLM highlight selection → FFmpeg render.\n• AI Highlight Detection: Gemini reads only the transcript and returns ranked clips with title, hook, caption, hashtags and a score, with switchable fallback providers.\n• Clip Stitching: One clip can combine 2–3 non-consecutive segments into a single coherent short.\n• Smart Reframing: Speaker-tracked 9:16 reframing with MediaPipe, plus a facecam preset editor.\n• CapCut-Style Subtitles: Animated word-highlight captions with draggable position and size per clip.\n• Background Music & Watermark: Royalty-free music with audio ducking, and text/image watermarks applied on every render.\n• Review Workflow: Web dashboard to approve or reject clips with keyboard shortcuts, plus live job progress with time estimates.\n• Supabase Integration: Postgres via SQLAlchemy + Alembic, Auth login, private Storage for kept clips, and an audit log of every action and LLM call."
  },
  {
    id: 5,
    title: "eBR System",
    category: "FULL-STACK WEB",
    year: "2026 - Present",
    image: "public/Foto/eBR-banner@2x.png",
    bgGradient: "linear-gradient(135deg, #1f1a33 0%, #120c1c 100%)",
    technologies: ["Laravel 12", "React 18", "Inertia.js", "PostgreSQL", "Tailwind CSS", "TipTap"],
    description: "eBR (Electronic Batch Record) is a pharmaceutical manufacturing web application that replaces paper and Excel-based batch records with a fully digital, auditable workflow. I built it as a monolith (Laravel + React via Inertia.js) covering the journey from designing a product's Master Copy to executing, reviewing and releasing a production batch, with CPOB and 21 CFR Part 11 principles in mind.\n\n✨ Key Features:\n• Master Copy Builder: Ribbon-based visual editor to compose CPB/CKB documents, sections, tables, formulas and specification limits, plus a reusable Library Template.\n• Approval Workflow: Master Copies go through review and approval before they are Ready to Use, with full revision history.\n• PIC Assignment: Assign departments and verifiers (Production, Logistics, QA) per section, with prerequisite steps and re-assignment.\n• Batch Execution: Operators fill sections from My Tasks and Submit & Sign electronically; each entry is sealed with a digital fingerprint.\n• Automatic OOS Detection: Out-of-specification values instantly raise QA Alerts, with Hold/Resume and Deviation handling.\n• QA Review & Release: Controlled corrections, batch review and final release decision by QA.\n• Reporting & Audit Trail: Printable batch record reports, batch monitoring with trend charts, and a complete who-did-what-when audit trail.\n• Role-Based Access: Ten roles (Admin, Author, Reviewer, Approver, Operator, Supervisor, QC, QA, Auditor, etc.) enforced on the backend."
  },
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
    display: block;
    width: 100%;
    padding: 0;
    background: none;
    border: none;
    text-align: left;
    color: inherit;
    font: inherit;
    cursor: pointer;
    border-radius: 24px;
  }
  .project-card .img-wrapper {
    overflow: hidden;
    position: relative;
    border-radius: 24px;
    padding: 24px 24px 0;
    aspect-ratio: 16 / 10;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid rgba(176,110,243,0.12);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .project-card .project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    border-radius: 12px 12px 0 0;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  }
  .project-img-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
    padding: 24px;
    background:
      linear-gradient(rgba(176,110,243,0.07) 1px, transparent 1px) 0 0 / 28px 28px,
      linear-gradient(90deg, rgba(176,110,243,0.07) 1px, transparent 1px) 0 0 / 28px 28px,
      radial-gradient(circle at 50% 40%, rgba(176,110,243,0.22), rgba(15,10,25,0.9) 70%);
    border: 1px solid rgba(176,110,243,0.2);
    border-bottom: none;
  }
  .project-img-placeholder i {
    font-size: 1.6rem;
    color: #d4a8ff;
    opacity: 0.8;
  }
  .project-img-placeholder .placeholder-title {
    font-size: clamp(1.4rem, 3.5vw, 2.2rem);
    font-weight: 800;
    color: #f0f0f0;
    letter-spacing: -0.02em;
  }
  .project-img-placeholder .placeholder-sub {
    font-size: 0.8rem;
    color: #a0a0a0;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }
  .project-card .view-hint {
    position: absolute;
    right: 18px;
    bottom: 18px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 999px;
    background: rgba(15,10,25,0.85);
    border: 1px solid rgba(176,110,243,0.4);
    color: #f0f0f0;
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    backdrop-filter: blur(6px);
  }
  .project-card:hover .img-wrapper,
  .project-card:focus-visible .img-wrapper {
    border-color: rgba(176,110,243,0.45);
    box-shadow: 0 10px 40px rgba(176,110,243,0.18);
  }
  .project-card:hover .project-img {
    transform: scale(1.04) translateY(-4px);
  }
  .project-card:hover .view-hint,
  .project-card:focus-visible .view-hint {
    opacity: 1;
    transform: translateY(0);
  }
  .project-meta {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .project-title {
    display: block;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    color: #f0f0f0;
    font-weight: 700;
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }
  .project-category {
    color: #a0a0a0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
  }
  .project-year {
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.1);
    color: #a0a0a0;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }
  .project-tag {
    padding: 4px 12px;
    border-radius: 6px;
    background: rgba(176,110,243,0.08);
    border: 1px solid rgba(176,110,243,0.2);
    color: #d4a8ff;
    font-size: 0.78rem;
    font-weight: 500;
  }
  .modal-content-area { padding: 0 50px 40px 50px; }
  .modal-title {
    font-size: clamp(1.8rem, 5vw, 3rem);
    font-weight: 800;
    color: #f0f0f0;
    margin: 0;
    letter-spacing: -0.03em;
  }
  @media (max-width: 576px) {
    .modal-content-area { padding: 0 22px 28px 22px; }
    .project-card .img-wrapper { padding: 14px 14px 0; border-radius: 18px; }
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
`;

// Pengganti screenshot untuk project yang belum punya gambar
function ImagePlaceholder({ proj, style }) {
  return (
    <span className="project-img project-img-placeholder" style={style}>
      <i className="fa-solid fa-code" />
      <span className="placeholder-title">{proj.title}</span>
      <span className="placeholder-sub">Preview coming soon</span>
    </span>
  );
}

function ProjectCard({ proj, onOpen }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal">
      <button type="button" className="project-card" onClick={() => onOpen(proj)} aria-label={`Lihat detail ${proj.title}`}>
        <span className="img-wrapper" style={{ background: proj.bgGradient }}>
          {proj.image
            ? <img src={proj.image} alt={proj.title} className="project-img" loading="lazy" />
            : <ImagePlaceholder proj={proj} />}
          <span className="view-hint">View Details <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }} /></span>
        </span>

        <span className="project-meta">
          <span>
            <span className="project-title">{proj.title}</span>
            <span className="project-category">{proj.category}</span>
          </span>
          <span className="project-year">{proj.year}</span>
        </span>

        <span className="project-tags">
          {proj.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="project-tag">{tech}</span>
          ))}
        </span>
      </button>
    </div>
  );
}

export default function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') setSelectedProject(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedProject]);

  return (
    <section id="project" className="page-section" style={{ zIndex: 2 }}>
      <style dangerouslySetInnerHTML={{ __html: projectCSS }} />

      <div className="container">
        <SectionHeader
          eyebrow="Portfolio"
          icon="fa-solid fa-layer-group"
          title="Latest Project"
          subtitle="A curated selection showcasing my expertise and the achieved results."
        />

        <div className="row g-5">
          {projectsData.map(proj => (
            <div className="col-lg-6 col-md-12" key={proj.id}>
              <ProjectCard proj={proj} onOpen={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div role="dialog" aria-modal="true" aria-label={selectedProject.title}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '90px 16px 32px' }}>

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
                type="button"
                aria-label="Tutup"
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute', top: '20px', right: '20px', width: '44px', height: '44px',
                  borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  cursor: 'pointer', zIndex: 10, transition: 'all 0.2s', backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.transform = 'scale(1)' }}
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
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : (
                  <ImagePlaceholder proj={selectedProject} style={{ height: '300px', border: 'none' }} />
                )}

                {/* Efek gradien mudar menyatu ke hitam */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to bottom, rgba(10,6,18,0) 0%, #0a0612 100%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }} />
              </div>

              {/* ── AREA KONTEN ── */}
              <div className="modal-content-area" style={{ position: 'relative', zIndex: 3, marginTop: '-45px' }}>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px',
                  borderRadius: '999px', border: '1px solid rgba(176,110,243,0.5)',
                  background: 'rgba(176,110,243,0.1)', color: '#d4a8ff', fontSize: '0.85rem',
                  fontWeight: 600, marginBottom: '20px'
                }}>
                  <i className="fa-solid fa-tag" style={{ fontSize: '0.75rem' }}></i> {selectedProject.category}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
                  <h2 className="modal-title">{selectedProject.title}</h2>
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
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} style={{ padding: '8px 18px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#d4a8ff', fontSize: '0.9rem', fontWeight: 500 }}>
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
                  <p style={{ color: '#a0a0a0', lineHeight: 1.8, fontSize: '1.02rem', margin: 0, whiteSpace: 'pre-line' }}>
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
                    <GlowButton href={selectedProject.repoLink} external>
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

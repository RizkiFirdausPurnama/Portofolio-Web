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
    image: "https://via.placeholder.com/1200x800/1e1a2f/b06ef3?text=Kasir+Pintar+Preview", 
    bgGradient: "linear-gradient(135deg, #1e1a2f 0%, #151020 100%)",
    technologies: ["Laravel 5.4", "PHP 5.6", "MySQL"],
    repoLink: "https://github.com/RizkiFirdausPurnama/kasir-pintar",
    description: "Sistem Point of Sale (POS) modern berbasis web. Dilengkapi dengan fitur manajemen inventaris, pelacakan transaksi *real-time*, dan *dashboard* analitik untuk mempermudah pemantauan penjualan toko secara efisien."
  },
  {
    id: 2,
    title: "SHOP.CO",
    category: "E-COMMERCE",
    year: "2025",
    image: "Foto/Shop.co.png",
    bgGradient: "linear-gradient(135deg, #2a1b38 0%, #170f1c 100%)",
    technologies: ["React.js", "Laravel", "MySQL"],
    repoLink: "https://github.com/RizkiFirdausPurnama/shop-co",
    description: "Platform e-commerce *end-to-end* dengan antarmuka yang responsif. Mengintegrasikan React di sisi *frontend* untuk pengalaman pengguna yang dinamis dan Laravel sebagai *backend* API yang kokoh untuk menangani logika keranjang belanja dan autentikasi."
  },
  {
    id: 3,
    title: "DocTime",
    category: "UI/UX & FRONT-END",
    year: "2025",
    image: "https://via.placeholder.com/1200x800/231b2e/b06ef3?text=DocTime+Preview",
    bgGradient: "linear-gradient(135deg, #231b2e 0%, #0f0a14 100%)",
    technologies: ["Figma", "React.js", "CSS"],
    repoLink: "https://github.com/RizkiFirdausPurnama/doctime",
    description: "Aplikasi konsultasi kesehatan kolaboratif. Fokus utama pada perancangan UI/UX yang intuitif bagi pasien dan dokter, serta implementasi desain tersebut menjadi komponen *front-end* React yang interaktif."
  },
  {
    id: 4,
    title: "Digital Sign System",
    category: "FULL-STACK WEB",
    year: "2026",
    image: "https://via.placeholder.com/1200x800/1c1826/d4a8ff?text=Digital+Sign+Preview",
    bgGradient: "linear-gradient(135deg, #1c1826 0%, #0a080d 100%)",
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript"],
    repoLink: "https://github.com/RizkiFirdausPurnama/digital-sign",
    description: "Aplikasi Digital Signature yang dibangun dari nol (0) secara mandiri untuk kebutuhan korporasi. Sistem ini mendigitalisasi alur persetujuan dokumen dengan keamanan dan pelacakan riwayat tanda tangan secara terpusat."
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

              {/* ── AREA GAMBAR DIBIARKAN LOSS KE BAWAH ── */}
              <div style={{ 
                position: 'relative',
                width: '100%', 
                background: selectedProject.bgGradient,
                borderTopLeftRadius: '24px', 
                borderTopRightRadius: '24px',
              }}>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', // Dibiarkan auto agar gambar merentang penuh ke bawah
                    display: 'block',
                    borderTopLeftRadius: '24px', 
                    borderTopRightRadius: '24px',
                    zIndex: 1
                  }} 
                />
                
                {/* Efek Gradien Mudar Menyatu Hitam hanya di ujung bawah gambar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, 
                  left: 0,
                  right: 0,
                  height: '150px', 
                  background: 'linear-gradient(to bottom, transparent 0%, #0a0612 100%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }} />
              </div>

              {/* ── AREA KONTEN (TIDAK MENIMPA GAMBAR) ── */}
              <div style={{ 
                padding: '20px 50px 40px 50px', // Jarak aman, tidak ada margin minus
                background: '#0a0612', 
                position: 'relative', 
                zIndex: 3 
              }}>
                
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
                  <p style={{ color: '#a0a0a0', lineHeight: 1.8, fontSize: '1.05rem', margin: 0 }}>
                    {selectedProject.description}
                  </p>
                </div>

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

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
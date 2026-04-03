import { useState, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

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

// =====================================================================
// 📌 CARA MENAMBAH PENGALAMAN (EXPERIENCE) BARU:
// =====================================================================
// 1. Copy salah satu blok yang diapit kurung kurawal { ... } di bawah.
// 2. Paste di bawahnya (jangan lupa pisahkan dengan tanda koma `,`).
// 3. Ganti isinya (id, period, role, company, initials, responsibilities).
// 4. Urutan di kode = urutan tampil di website (dari atas ke bawah).
// =====================================================================

const experiencesData = [
    {
    id: 1,
    period: "Apr 2025 - Present",
    role: "Creative and Design Division",
    company: "Himpunan Mahasiswa Teknik Informatika",
    initials: "HM", // Inisial untuk logo kecil
    responsibilities: [
      "Collaborated with BNEC x HIMTI to design official event merchandise (tumbler) for the \"From Campus To Career: A Journey into the IT World\" seminar.",
      "Designed and executed key visual assets for the SESVENT 2025 event, including the official social media twibbon and event certificates."
    ]
  },
  {
    id: 2,
    period: "Feb 2026 - Present",
    role: "Full Stack Developer",
    company: "Internship at Otto Pharmaceutical Industries",
    initials: "OP", // Inisial untuk logo kecil
    responsibilities: [
      "Acted as the sole developer for two key internal web applications, independently handling the entire software development lifecycle without team support.",
      "Successfully migrated an existing legacy system from the Yii framework to Laravel 5.4, while simultaneously developing and integrating new custom features based on direct user requests.",
      "Engineered a custom Digital Signature application from scratch, taking full responsibility for the database architecture, backend logic, and frontend interface."
    ]
  }
];

// ── Komponen Card Pengalaman dengan Efek Glow Navbar ──
function ExperienceCard({ experience }) {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="timeline-item">
      {/* Titik di garis timeline */}
      <div className="timeline-dot"></div>

      {/* Kotak Konten (Card) */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        className="experience-card"
      >
        {/* Header: Jabatan (Kiri) & Periode (Kanan) */}
        <div className="card-header-flex">
          <h3 className="role-title">{experience.role}</h3>
          <span className="period-badge">{experience.period}</span>
        </div>

        {/* Info Perusahaan dengan Logo Kecil */}
        <div className="company-info">
          <div className="mini-logo">{experience.initials}</div>
          <span className="company-name">{experience.company}</span>
        </div>

        {/* Konten Tanggung Jawab */}
        <div className="responsibilities-section">
          <p className="section-subtitle">Key Responsibilities:</p>
          <ol className="responsibility-list">
            {experience.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// ── Injeksi CSS Khusus untuk Tata Letak Vertikal & Warna Revisi ──
const experienceCSS = `
/* Wadah Utama Timeline Vertikal */
.timeline-wrapper {
  position: relative;
  max-width: 900px; /* Lebar maksimal agar tidak terlalu panjang ke samping */
  margin: 0 auto;
  padding-left: 35px; /* Jarak untuk memberi ruang pada garis vertikal di kiri */
}

/* Garis Vertikal Timeline */
.timeline-wrapper::before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 0;
  left: 0;
  width: 2px;
  background: rgba(176, 110, 243, 0.2); /* Garis ungu redup */
}

/* Baris tiap pengalaman */
.timeline-item {
  position: relative;
  margin-bottom: 50px; /* Jarak antar card ke bawah */
}

/* Titik Lingkaran di Garis Timeline */
.timeline-dot {
  position: absolute;
  left: -42px; /* Ditarik ke kiri agar pas di tengah garis (35px padding + offset) */
  top: 30px; /* Sejajar dengan judul di dalam card */
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0a0612; /* Warna background gelap */
  border: 3px solid #b06ef3; /* Ring ungu terang */
  box-shadow: 0 0 10px rgba(176, 110, 243, 0.5); /* Efek nyala halus */
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(176, 110, 243, 0.8);
}

/* ── Styling Card Pengalaman (Efek Glow Mouse) ── */
.experience-card {
  --mouse-x: -1000px;
  --mouse-y: -1000px;
  position: relative;
  background: rgba(15, 10, 25, 0.65); /* Transparan gelap */
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08); 
  color: #fff;
  transition: background 0.3s ease;
  isolation: isolate; 
}

/* Efek BORDER GLOW KURSOR Ungu */
.experience-card::after {
  content: "";
  position: absolute;
  inset: -1px; 
  border-radius: inherit;
  padding: 1.5px; 
  background: radial-gradient(
    100px circle at var(--mouse-x) var(--mouse-y), 
    #f472b6 0%, 
    #c084fc 40%, 
    transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Efek Bias Cahaya Lembut ke Luar Ungu */
.experience-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    80px circle at var(--mouse-x) var(--mouse-y),
    rgba(192, 132, 252, 0.15) 0%, 
    transparent 100%
  );
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.experience-card:hover::after,
.experience-card:hover::before {
  opacity: 1;
}

/* ── Tata Letak Isi Card ── */
.experience-card .card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 20px;
  flex-wrap: wrap; /* Mencegah patah di layar HP */
}

.experience-card .role-title {
  font-size: 2rem;
  font-weight: 800;
  color: #f0f0f0; 
  margin: 0;
  letter-spacing: -0.02em;
}

.experience-card .period-badge {
  color: #a0a0a0;
  font-size: 0.85rem;
  font-family: monospace; /* Mengikuti referensi foto */
  background: rgba(255,255,255,0.03); 
  padding: 6px 14px;
  border-radius: 999px; 
  border: 1px solid rgba(255,255,255,0.08);
  white-space: nowrap;
}

.experience-card .company-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

/* Logo Mini di samping Nama Perusahaan */
.experience-card .mini-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #1a1225;
  border: 1px solid rgba(176, 110, 243, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: #d4a8ff;
}

.experience-card .company-name {
  color: #a0a0a0; 
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

/* Area Deskripsi & Tanggung Jawab */
.experience-card .responsibilities-section {
  color: #b0b0b0;
}

.experience-card .section-subtitle {
  color: #d4a8ff; /* Ungu terang */
  margin-bottom: 15px;
  font-size: 1rem;
}

.experience-card .responsibility-list {
  padding-left: 20px;
  margin: 0;
  line-height: 1.8;
  font-size: 0.95rem;
}

.experience-card .responsibility-list li {
  margin-bottom: 8px;
}

/* Penyesuaian untuk tampilan Mobile / Layar Kecil */
@media (max-width: 768px) {
  .timeline-wrapper {
    padding-left: 20px;
  }
  .timeline-dot {
    left: -27px;
    width: 14px;
    height: 14px;
  }
  .experience-card {
    padding: 25px;
  }
  .experience-card .role-title {
    font-size: 1.5rem;
  }
}
`;

export default function MyExperience() {
  return (
    <section id="experience" style={{ padding: '100px 0', position: 'relative', zIndex: 2 }}>
      <style dangerouslySetInnerHTML={{ __html: experienceCSS }} />
      
      <div className="container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
        
        {/* Header Section (JUDUL DI TENGAH) */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
            <i className="fa-solid fa-star" style={{ color: '#b06ef3', fontSize: '0.8rem' }}></i>
            <span style={{ color: '#b06ef3', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
              Career Path
            </span>
          </div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0 }}>
            <GradientText>My Experience</GradientText>
          </h2>
          <p style={{ color: '#a0a0a0', marginTop: '15px', fontSize: '1.1rem', maxWidth: '600px', margin: '15px auto 0' }}>
            A timeline of my professional journey, highlighting key roles and contributions in the tech industry.
          </p>
        </div>

        {/* Wadah Timeline Vertikal */}
        <div className="timeline-wrapper">
          {experiencesData.map(experience => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

      </div>
    </section>
  )
}
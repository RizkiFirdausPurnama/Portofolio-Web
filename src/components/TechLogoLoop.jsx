import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

// Menggunakan FontAwesome (fa) untuk ikon dasar agar lebih stabil dan anti-error
import { 
  FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaVuejs, 
  FaPhp, FaLaravel, FaNodeJs, FaPython, FaGitAlt, FaFigma 
} from 'react-icons/fa';

// Menggunakan SimpleIcons (si) khusus untuk ikon spesifik yang aman
import { 
  SiNextdotjs, SiTailwindcss, SiSupabase, SiMysql 
} from 'react-icons/si';

// ==========================================
// 1. INJECT CSS UNTUK LOGO LOOP
// ==========================================
const logoLoopCSS = `
.logoloop {
  position: relative;
  --logoloop-gap: 32px;
  --logoloop-logoHeight: 28px;
  --logoloop-fadeColorAuto: transparent;
}
.logoloop--horizontal {
  width: 100%;
}
.logoloop--scale-hover {
  padding-top: calc(var(--logoloop-logoHeight) * 0.1);
  padding-bottom: calc(var(--logoloop-logoHeight) * 0.1);
}
.logoloop__track {
  display: flex;
  width: max-content;
  will-change: transform;
  user-select: none;
  position: relative;
  z-index: 0;
}
.logoloop__list {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
}
.logoloop__item {
  flex: 0 0 auto;
  margin-right: var(--logoloop-gap);
  font-size: var(--logoloop-logoHeight);
  line-height: 1;
  color: #a0a0a0;
  transition: color 0.3s ease;
}
.logoloop__item:last-child {
  margin-right: var(--logoloop-gap);
}
.logoloop__node {
  display: inline-flex;
  align-items: center;
}
.logoloop--scale-hover .logoloop__item {
  overflow: visible;
}
.logoloop--scale-hover .logoloop__item:hover {
  color: #d4a8ff;
}
.logoloop--scale-hover .logoloop__item:hover .logoloop__node {
  transform: scale(1.2);
  transform-origin: center center;
}
.logoloop--scale-hover .logoloop__node {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.logoloop--fade::before,
.logoloop--fade::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(50px, 15vw, 250px);
  pointer-events: none;
  z-index: 10;
}
.logoloop--fade::before {
  left: 0;
  background: linear-gradient(to right, rgba(15,10,25,1) 0%, rgba(15,10,25,0) 100%);
}
.logoloop--fade::after {
  right: 0;
  background: linear-gradient(to left, rgba(15,10,25,1) 0%, rgba(15,10,25,0) 100%);
}
@media (prefers-reduced-motion: reduce) {
  .logoloop__track { transform: translate3d(0, 0, 0) !important; }
  .logoloop__node { transition: none !important; }
}
`;

// ==========================================
// 2. HELPER HOOKS ANIMASI
// ==========================================
const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => observers.forEach(observer => observer?.disconnect());
  }, [callback, elements, dependencies]);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, hoverSpeed) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = timestamp => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, hoverSpeed, trackRef]);
};

// ==========================================
// 3. CORE LOGO LOOP COMPONENT
// ==========================================
const InternalLogoLoop = memo(({ logos, speed = 120, logoHeight = 28, gap = 32, hoverSpeed = 0, fadeOut = true, scaleOnHover = true }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => Math.abs(speed), [speed]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, hoverSpeed);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => (
    <ul className="logoloop__list" key={`copy-${copyIndex}`} ref={copyIndex === 0 ? seqRef : undefined}>
      {logos.map((item, itemIndex) => (
        <li className="logoloop__item" key={`${copyIndex}-${itemIndex}`}>
          <span className="logoloop__node" title={item.title}>{item.node}</span>
        </li>
      ))}
    </ul>
  )), [copyCount, logos]);

  return (
    <div ref={containerRef} className={`logoloop logoloop--horizontal ${fadeOut ? 'logoloop--fade' : ''} ${scaleOnHover ? 'logoloop--scale-hover' : ''}`} style={{ '--logoloop-gap': `${gap}px`, '--logoloop-logoHeight': `${logoHeight}px` }}>
      <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {logoLists}
      </div>
    </div>
  );
});

// ==========================================
// 4. EXPORT WRAPPER & DATA ICON
// ==========================================
export default function TechLogoLoop() {
  const techLogos = [
    { node: <FaHtml5 />, title: "HTML5" },
    { node: <FaCss3Alt />, title: "CSS3" },
    { node: <FaJs />, title: "JavaScript" },
    { node: <FaBootstrap />, title: "Bootstrap" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <FaReact />, title: "React" },
    { node: <SiNextdotjs />, title: "Next.js" },
    { node: <FaVuejs />, title: "Vue.js" },
    { node: <FaPhp />, title: "PHP" },
    { node: <FaLaravel />, title: "Laravel" },
    { node: <FaNodeJs />, title: "Node.js" },
    { node: <FaPython />, title: "Python" },
    { node: <SiMysql />, title: "MySQL" },
    { node: <SiSupabase />, title: "Supabase" },
    { node: <FaGitAlt />, title: "Git" },
    { node: <FaFigma />, title: "Figma" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: logoLoopCSS }} />
      {/* Wrapper sekarang full width, tanpa border dan tanpa warna background */}
      <div style={{ padding: '40px 0', width: '100%', overflow: 'hidden' }}>
        <InternalLogoLoop 
          logos={techLogos} 
          speed={40} 
          logoHeight={50} 
          gap={80} 
          hoverSpeed={10} 
        />
      </div>
    </>
  );
}
import { useRef, useEffect } from 'react';
import './ReflectiveCard.css';

const ReflectiveCard = ({
  blurStrength = 12,
  color = 'white',
  metalness = 1,
  roughness = 0.4,
  overlayColor = 'rgba(0, 0, 0, 0.25)',
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 0.15,
  glassDistortion = 0,
  className = '',
  style = {}
}) => {
  const cardRef = useRef(null);
  const sheenRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateX(${dy * -10}deg) rotateY(${dx * 10}deg)`;
      card.style.transition = 'transform 0.1s ease';

      if (sheenRef.current) {
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        sheenRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(176,110,243,0.5) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`;
      }
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      card.style.transition = 'transform 0.6s ease';
      if (sheenRef.current) {
        sheenRef.current.style.background = 'linear-gradient(135deg, rgba(176,110,243,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(176,110,243,0.15) 100%)';
      }
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': color,
    '--saturation': saturation,
  };

  return (
    <div ref={cardRef} className={`reflective-card-container ${className}`} style={{ ...style, ...cssVariables }}>

      <svg className="reflective-svg-filters" aria-hidden="true">
        <defs>
          <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency={baseFrequency} numOctaves="2" result="noise" />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementStrength}
              xChannelSelector="R" yChannelSelector="G" result="rippled" />
            <feSpecularLighting in="noiseAlpha" surfaceScale={displacementStrength}
              specularConstant={specularConstant} specularExponent="20"
              lightingColor="#ffffff" result="light">
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
            <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
            <feColorMatrix in="SourceAlpha" type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="solidAlpha" />
            <feMorphology in="solidAlpha" operator="erode" radius="45" result="erodedAlpha" />
            <feGaussianBlur in="erodedAlpha" stdDeviation="10" result="blurredMap" />
            <feComponentTransfer in="blurredMap" result="glassMap">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feDisplacementMap in="metallic-result" in2="glassMap" scale={glassDistortion}
              xChannelSelector="A" yChannelSelector="A" result="final" />
          </filter>
        </defs>
      </svg>

      {/* Background refleksi dari foto */}
      <img src="/Foto/Kiki.png" alt="" aria-hidden="true" className="reflective-bg-photo" />

      <div className="reflective-noise" />
      <div ref={sheenRef} className="reflective-sheen" />
      <div className="reflective-border" />

      <div className="reflective-content">

        {/* Top */}
        <div className="porto-card-top">
          <div className="porto-badge">
            <span className="porto-badge-dot" />
            BINUS UNIVERSITY
          </div>
          <span style={{ fontSize: '10px', letterSpacing: '0.1em', opacity: 0.5, color: '#d4a8ff' }}>
            CS · B27
          </span>
        </div>

        {/* Foto full tanpa lingkaran */}
        <div className="porto-card-photo">
          <img src="/Foto/Kiki.png" alt="Rizki Firdaus Purnama" />
        </div>

        {/* Nama & role */}
        <div className="porto-card-info">
          <h2 className="porto-name">Rizki Firdaus Purnama</h2>
          <p className="porto-role">Full Stack Development &amp; Web Development</p>
        </div>

        {/* Footer */}
        <div className="porto-card-footer">
          <div className="porto-footer-left">
            <span className="porto-footer-label">GitHub</span>
            <span className="porto-footer-value">@RizkiFirdausPurnama</span>
          </div>
          <div className="porto-footer-icon">
            <i className="fa-brands fa-github" style={{ fontSize: '26px' }} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReflectiveCard;
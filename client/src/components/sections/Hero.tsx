import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaChevronDown } from 'react-icons/fa';
import gsap from 'gsap';
import { personalInfo, socialLinks } from '../../data';

// Color palette for donut luminance levels (dark → bright)
const DONUT_COLORS = [
  '#6366f1', '#818cf8', '#a78bfa', '#c084fc',
  '#e879f9', '#f472b6', '#fb7185', '#f97316',
  '#facc15', '#4ade80', '#22d3ee', '#ffffff',
];
const DONUT_CHARS = '.,-~:;=!*#$@';

// ASCII Donut — colorful, big, smooth
const AsciiDonut = () => {
  const canvasRef = useRef<HTMLPreElement>(null);
  const A = useRef(0);
  const B = useRef(0);
  const frameId = useRef<number>(0);
  const lastTime = useRef(0);

  const renderFrame = useCallback((timestamp: number) => {
    if (timestamp - lastTime.current < 33) {
      frameId.current = requestAnimationFrame(renderFrame);
      return;
    }
    lastTime.current = timestamp;

    const b: number[] = [];
    const z: number[] = [];
    const width = 60;
    const height = 28;
    const total = width * height;

    for (let k = 0; k < total; k++) {
      b[k] = -1;
      z[k] = 0;
    }

    for (let j = 0; j < 6.28; j += 0.06) {
      for (let i = 0; i < 6.28; i += 0.015) {
        const c = Math.sin(i);
        const d = Math.cos(j);
        const e = Math.sin(A.current);
        const f = Math.sin(j);
        const g = Math.cos(A.current);
        const h = d + 2;
        const D = 1 / (c * h * e + f * g + 5);
        const l = Math.cos(i);
        const m = Math.cos(B.current);
        const n = Math.sin(B.current);
        const t = c * h * g - f * e;

        const x = Math.floor(30 + 28 * D * (l * h * m - t * n));
        const y = Math.floor(14 + 13 * D * (l * h * n + t * m));
        const o = x + width * y;
        const N = Math.floor(
          8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n)
        );

        if (y >= 0 && y < height && x >= 0 && x < width && D > z[o]) {
          z[o] = D;
          b[o] = N > 0 ? N : 0;
        }
      }
    }

    if (canvasRef.current) {
      let html = '';
      for (let k = 0; k < total; k++) {
        if (k % width === width - 1) {
          html += '\n';
        } else if (b[k] >= 0) {
          const idx = Math.min(b[k], 11);
          html += `<span style="color:${DONUT_COLORS[idx]};text-shadow:0 0 6px ${DONUT_COLORS[idx]}80">${DONUT_CHARS[idx]}</span>`;
        } else {
          html += ' ';
        }
      }
      canvasRef.current.innerHTML = html;
    }

    A.current += 0.015;
    B.current += 0.008;
    frameId.current = requestAnimationFrame(renderFrame);
  }, []);

  useEffect(() => {
    frameId.current = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(frameId.current);
  }, [renderFrame]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 30% 40%, #1a1040 0%, #0a0a18 50%, #050510 100%)',
        boxShadow: '0 0 80px rgba(139, 92, 246, 0.12), 0 0 40px rgba(236, 72, 153, 0.06), 0 25px 60px rgba(0,0,0,0.4)',
        padding: '12px 8px',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, transparent 40%, transparent 60%, rgba(236,72,153,0.3) 100%)',
        }}
      />
      <pre
        ref={canvasRef}
        className="relative z-10 text-[8px] sm:text-[10px] md:text-xs leading-[1.1] font-mono select-none whitespace-pre"
        style={{ letterSpacing: '1.5px' }}
      />
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
      gsap.to(el, {
        y: -20,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    gsap.to('.wave-bg', {
      backgroundPositionX: '100%',
      duration: 20,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  } as const;

  const socialIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    FaGithub,
    FaLinkedin,
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-hero-gradient pt-20 pb-16"
    >
      {/* Animated Wave Background */}
      <div
        className="wave-bg absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%231976D2' fill-opacity='1' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '200% 100%',
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 floating-element opacity-20">
        <div className="w-full h-full rounded-full bg-primary-500/50" />
      </div>
      <div className="absolute top-40 right-20 w-16 h-16 floating-element opacity-20 delay-200">
        <div className="w-full h-full rounded-full bg-secondary-500/50" />
      </div>
      <div className="absolute bottom-40 left-20 w-12 h-12 floating-element opacity-20 delay-300">
        <div className="w-full h-full rounded-full bg-primary-500/50" />
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 floating-element opacity-20 delay-400">
        <div className="w-full h-full rounded-full bg-accent-500/30" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8"
        >
          {/* Text Content — compact */}
          <div className="flex-1 text-center lg:text-left lg:max-w-[45%]">
            <motion.div variants={itemVariants} className="mb-3">
              <span className="inline-block px-3 py-1.5 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm">
                Welcome to my Portfolio!
              </span>
            </motion.div>

            <motion.h1
              ref={textRef}
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-dark-500 mb-2 leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-lg md:text-xl font-heading font-semibold text-dark-100 mb-1"
            >
              {personalInfo.title}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-dark-100 text-sm md:text-base max-w-sm mx-auto lg:mx-0 mb-2 leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons + Social in one row on desktop */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4"
            >
              <motion.a
                href="#projects"
                className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href={personalInfo.resumeUrl}
                className="btn-outline flex items-center gap-2 text-sm px-5 py-2.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                download="Ilyas_Sr_Software_Engineer_Resume.pdf"
              >
                <FaDownload className="text-xs" />
                Download CV
              </motion.a>
                          <motion.div
              variants={itemVariants}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {socialLinks.slice(0, 3).map((link) => {
                const IconComponent = socialIcons[link.icon];
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {IconComponent && <IconComponent className="text-lg" />}
                  </motion.a>
                );
              })}
            </motion.div>
            </motion.div>


          </div>

          {/* Hero — ASCII Coding Donut (big!) */}
          <motion.div
            variants={itemVariants}
            className="flex-1 relative lg:max-w-[55%]"
          >
            <div className="relative w-full mx-auto">
              <motion.div
                className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/15 blur-3xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <AsciiDonut />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 mb-12"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a href="#about" className="flex flex-col items-center text-dark-100 hover:text-primary-500 transition-colors">
          <span className="text-xs ">Scroll Down</span>
          <FaChevronDown className="text-lg" />
        </a>
      </motion.div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

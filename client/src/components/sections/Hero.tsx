import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaChevronDown } from 'react-icons/fa';
import gsap from 'gsap';
import { personalInfo, socialLinks } from '../../data';
import { useTypewriter } from '../../hooks/useTypewriter';

// Animated profile image with modern effects
const ProfileHero = () => {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Animated gradient ring  outer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #D32F2F, #FFC107, #1976D2, #D32F2F)',
          padding: '4px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full rounded-full bg-light-200" />
      </motion.div>

      {/* Pulsing glow behind the image */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(211,47,47,0.3) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Profile image */}
      <motion.div
        className="absolute inset-3 sm:inset-4 rounded-full overflow-hidden shadow-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 120 }}
      >
        <img
          src={personalInfo.avatarUrl}
          alt={personalInfo.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="#D32F2F" width="400" height="400" rx="200"/><text x="200" y="230" fill="white" font-family="sans-serif" font-size="120" font-weight="bold" text-anchor="middle">IS</text></svg>`)}`;
          }}
        />
      </motion.div>

      {/* Floating orbit dots  hidden on mobile to prevent overflow */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full hidden sm:block"
          style={{
            background: i === 0 ? '#D32F2F' : i === 1 ? '#FFC107' : '#1976D2',
            boxShadow: `0 0 12px ${i === 0 ? '#D32F2F' : i === 1 ? '#FFC107' : '#1976D2'}80`,
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [
              Math.cos((i * 2 * Math.PI) / 3) * 150,
              Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 150,
              Math.cos((i * 2 * Math.PI) / 3) * 150,
            ],
            y: [
              Math.sin((i * 2 * Math.PI) / 3) * 150,
              Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 150,
              Math.sin((i * 2 * Math.PI) / 3) * 150,
            ],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Tech badge  bottom right */}
      <motion.div
        className="absolute -bottom-2 -right-2 bg-white rounded-xl shadow-card px-3 py-2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
      >
        <span className="text-xs font-bold text-primary-500">{personalInfo.yearsOfExperience}+ YRS EXP</span>
      </motion.div>

      {/* Status badge  top right */}
      <motion.div
        className="absolute -top-1 -right-1 bg-white rounded-xl shadow-card px-3 py-2 z-10 flex items-center gap-1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-semibold text-dark-500">Available</span>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { displayedText, isComplete } = useTypewriter({
    segments: ['Mohd', ' Ilyas Shaikh'],
    typingSpeed: 65,
    segmentDelay: 350,
    startDelay: 900,
  });

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
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left lg:max-w-[50%]">
            <motion.div variants={itemVariants} className="mb-3">
              <span className="inline-block px-3 py-1.5 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm">
                Welcome to my Portfolio!
              </span>
            </motion.div>

            <motion.h1
              ref={textRef}
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-500 mb-2 leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text">
                {displayedText.split(' ').slice(0, 1).join(' ')}
              </span>
              {displayedText.split(' ').length > 1 && (
                <>
                  <br />
                  <span className="gradient-text">
                    {displayedText.split(' ').slice(1).join(' ')}
                  </span>
                </>
              )}
              {!isComplete && (
                <span
                  className="inline-block ml-0.5 w-[3px] h-[0.85em] align-middle"
                  style={{
                    animation: 'blink 0.75s step-end infinite',
                    background: 'linear-gradient(to bottom, var(--color-primary), var(--color-accent))',
                  }}
                />
              )}
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

            {/* CTA Buttons + Social */}
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

          {/* Profile Image with modern animations */}
          <motion.div
            variants={itemVariants}
            className="flex-1 relative lg:max-w-[45%]"
          >
            <ProfileHero />
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
          <span className="text-xs">Scroll Down</span>
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

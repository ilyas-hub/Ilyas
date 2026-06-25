import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaDownload, FaMapMarkerAlt, FaEnvelope, FaWhatsapp, FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../../data';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        '.about-image',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const stats = [
    { label: 'Years Experience', value: `${personalInfo.yearsOfExperience}+`, color: 'primary' },
    { label: 'Projects Delivered', value: `${personalInfo.projectsCompleted}+`, color: 'secondary' },
    { label: 'GitHub contributions in the last year', value: '460+', color: 'accent' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-light-200 relative"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="block w-fit mx-auto px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            About Me
          </span>
          <h2 className="section-title">
            Know Me Better
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="about-image relative w-full max-w-md mx-auto mb-16">
              {/* Anime-style frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl transform rotate-6" />
              <div className="relative bg-light-200 rounded-2xl p-4 shadow-card transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-80 object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="#D32F2F" width="400" height="400" rx="16"/><text x="200" y="220" fill="white" font-family="sans-serif" font-size="120" font-weight="bold" text-anchor="middle">IS</text></svg>`)}`;
                  }}
                />
              </div>

              {/* Floating Title Card */}
              <motion.div
                className="absolute -right-4 -bottom-12 glass-card max-w-[240px] p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="font-heading font-bold text-base text-dark-500">{personalInfo.title}</div>
                  <div className="text-sm text-primary-500 font-medium mt-1">
                    {personalInfo.yearsOfExperience}+ Years of Experience
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-dark-500 mb-4">
              I'm <span className="gradient-text">{personalInfo.name}</span>, a {personalInfo.title}
            </h3>

            <p className="text-dark-100 text-lg leading-relaxed mb-6">
              {personalInfo.bio}
            </p>

            <p className="text-dark-100 leading-relaxed mb-8">
              I thrive on turning complex requirements into elegant, scalable solutions. My journey in tech
              has been driven by continuous learning, ownership, and a passion for building products that
              make a real impact. I believe in writing clean, maintainable code and creating experiences
              that delight users.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <FaEnvelope className="text-primary-500" />
                </div>
                <div>
                  <div className="text-sm text-dark-100">Email</div>
                  <div className="font-medium text-dark-500 text-sm">{personalInfo.email}</div>
                </div>
              </div>

              {personalInfo.location && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
                  <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-accent-500" />
                  </div>
                  <div>
                    <div className="text-sm text-dark-100">Location</div>
                    <div className="font-medium text-dark-500 text-sm">{personalInfo.location}</div>
                  </div>
                </div>
              )}

              {personalInfo.phone && (
                <a href="https://wa.me/918080611513" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <FaWhatsapp className="text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-dark-100">WhatsApp</div>
                    <div className="font-medium text-dark-500 text-sm">{personalInfo.phone}</div>
                  </div>
                </a>
              )}

              <a href="https://github.com/ilyas-hub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-dark-500/10 flex items-center justify-center">
                  <FaGithub className="text-dark-500" />
                </div>
                <div>
                  <div className="text-sm text-dark-100">GitHub</div>
                  <div className="font-medium text-dark-500 text-sm">ilyas-hub</div>
                </div>
              </a>
            </div>

            {/* Download CV Button */}
            <motion.a
              href={personalInfo.resumeUrl}
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              download="Ilyas_Sr_Software_Engineer_Resume.pdf"
            >
              <FaDownload />
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Stats Section  Staggered entry */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="glass-card text-center"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className={`text-5xl md:text-6xl font-heading font-bold mb-2 ${
                  stat.color === 'primary'
                    ? 'text-primary-500'
                    : stat.color === 'secondary'
                    ? 'text-secondary-500'
                    : 'text-accent-500'
                }`}
              >
                {stat.value}
              </div>
              <div className="text-dark-100 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default About;

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const certificates = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    short: 'DSA',
    image: '/assets/images/certificates/DSA.png',
    description:
      'In-depth problem solving with arrays, trees, graphs, dynamic programming, and greedy algorithms — rated among top performers.',
  },
  {
    id: 'lld',
    title: 'Low Level Design',
    short: 'LLD',
    image: '/assets/images/certificates/LLD.png',
    description:
      'Designed object-oriented systems using SOLID principles, design patterns, and UML modeling for production-grade architectures.',
  },
  {
    id: 'mern',
    title: 'MERN Stack Bootcamp',
    short: 'MERN',
    image: '/assets/images/certificates/MERN.png',
    description:
      'Built end-to-end full-stack applications with MongoDB, Express, React, and Node.js including deployment and CI/CD pipelines.',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="py-20 md:py-32 bg-light-200 relative overflow-x-clip"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center mb-16"
        >
          <div className="md:col-span-3">
            <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
              Achievements
            </span>
            <h2 className="section-title mb-4" style={{ marginLeft: 0, marginRight: 'auto' }}>
              Certifications
            </h2>
            <p className="text-dark-100 max-w-lg">
              These credentials represent hands-on mastery in data structures, system design,
              and full-stack development. Each one reflects hundreds of hours of structured
              practice and real-world application.
            </p>
          </div>
          <div className="md:col-span-2 hidden md:flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-40 h-40 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shadow-card"
            >
              <span className="text-6xl">🏆</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Certificates grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="group"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="glass-card p-0 overflow-hidden flex flex-col h-full">
                {/* Image area */}
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden w-full block"
                  aria-label={`Open ${cert.title} certificate in new tab`}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>

                {/* Content area */}
                <div className="p-6 text-center flex-1">
                  <h3 className="font-heading font-bold text-lg md:text-xl text-dark-500 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-dark-100 text-sm leading-relaxed mb-3">
                    {cert.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">
                    {cert.short}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;

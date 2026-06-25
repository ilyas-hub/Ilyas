import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';


const certificates = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    short: 'DSA',
    image: '/assets/images/certificates/DSA.png',
    description:
      'In-depth problem solving with arrays, trees, graphs, dynamic programming, and greedy algorithms  rated among top performers.',
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16"
        >
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
              Achievements
            </span>
            <h2 className="section-title mb-4" style={{ marginLeft: 0, marginRight: 'auto' }}>
              Certifications
            </h2>
            <p className="text-dark-100 max-w-lg">
              These certifications are not checkboxes  they represent hands-on mastery
              in data structures, system design, and full-stack development. Each one
              reflects hundreds of hours of structured practice and real-world application.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-card">
              <img
                src="/assets/images/avatar.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
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
                <div className="relative overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

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

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { experiences } from '../../data';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-32 bg-light-200 relative"
    >
      {/* Background - Grand Line Map Style */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="block w-fit mx-auto px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            My Journey
          </span>
          <h2 className="section-title">
            Work Experience
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            Every role has shaped my skills and perspective as an engineer.
            Here's a timeline of my professional growth.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line  draw-in animation */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center"
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-primary-500 shadow-glow-red' :
                      index === 1 ? 'bg-secondary-500 shadow-glow-gold' :
                      'bg-accent-500 shadow-glow-blue'
                    }`} />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-card group hover:shadow-card-hover"
                  >
                    {/* Duration Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                      index === 0 ? 'bg-primary-500/10 text-primary-500' :
                      index === 1 ? 'bg-secondary-500/10 text-secondary-600' :
                      'bg-accent-500/10 text-accent-500'
                    }`}>
                      <FaBriefcase className="text-xs" />
                      {exp.duration}
                    </div>

                    {/* Company & Role */}
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark-500 mb-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mb-4 text-dark-100">
                      <FaMapMarkerAlt className={`${
                        index === 0 ? 'text-primary-500' :
                        index === 1 ? 'text-secondary-500' :
                        'text-accent-500'
                      }`} />
                      <span className="font-medium">{exp.company}</span>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-6 text-left">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-dark-100 flex items-start gap-2">
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            index === 0 ? 'bg-primary-500' :
                            index === 1 ? 'bg-secondary-500' :
                            'bg-accent-500'
                          }`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            index === 0 ? 'bg-primary-500/10 text-primary-500' :
                            index === 1 ? 'bg-secondary-500/10 text-secondary-600' :
                            'bg-accent-500/10 text-accent-500'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>

          {/* Timeline End - Treasure */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: experiences.length * 0.2 }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 -bottom-8"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow-red flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-24"
        >
          <p className="text-dark-100 mb-4">
            Looking for my next challenge. Want to build something great together?
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

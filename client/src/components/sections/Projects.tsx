import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import { projects } from '../../data';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white relative"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 text-9xl font-heading font-bold text-primary-500 transform rotate-12">
          &lt;/&gt;
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="block w-fit mx-auto px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            My Work
          </span>
          <h2 className="section-title">
            Featured Projects
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            Production-grade applications I've built and shipped.
            Each project reflects real-world impact and technical depth.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                {/* Project Card */}
                <div className="glass-card h-full">
                  {/* Project Image */}
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect fill="#D32F2F" width="400" height="200"/><text x="200" y="105" fill="white" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">${project.title}</text></svg>`)}`;
                      }}
                    />

                    {/* Overlay on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                      className="absolute inset-0 bg-dark-500/80 flex items-center justify-center gap-4"
                    >
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEye />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-dark-500 flex items-center justify-center text-white hover:bg-dark-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-heading font-bold text-xl text-dark-500 text-center mb-2">
                    {project.title}
                  </h3>

                  {/* Highlight */}
                  {project.highlight && (
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">
                        {project.highlight}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-dark-100 text-sm text-center mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white rounded-full text-xs font-medium text-dark-500 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-primary-500/10 rounded-full text-xs font-medium text-primary-500">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex justify-center gap-4 pt-4 border-t border-light-400">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-dark-500 hover:text-dark-400 transition-colors"
                      >
                        <FaGithub />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/ilyas-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

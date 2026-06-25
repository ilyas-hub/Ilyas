import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data';

// Auto-scrolling image carousel with smooth crossfade + progress bar
const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const progressRef = useRef<ReturnType<typeof setInterval>>(null);
  const SLIDE_DURATION = 3500;
  const PROGRESS_INTERVAL = 30;

  const startAutoPlay = useCallback(() => {
    // Clear existing
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let p = 0;

    progressRef.current = setInterval(() => {
      p += (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
      setProgress(Math.min(p, 100));
    }, PROGRESS_INTERVAL);

    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
      p = 0;
      setProgress(0);
    }, SLIDE_DURATION);
  }, [images.length]);

  useEffect(() => {
    if (images.length > 1) startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [images.length, startAutoPlay]);

  const goTo = (i: number) => {
    setCurrent(i);
    startAutoPlay();
  };

  if (images.length <= 1) {
    return (
      <img
        src={images[0]}
        alt={title}
        className="w-full h-48 md:h-52 object-cover object-top"
      />
    );
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} - ${current + 1}`}
          className="w-full h-48 md:h-52 object-cover object-top"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Image count badge */}
      <div className="absolute top-3 right-3 px-2 py-1 bg-dark-500/70 backdrop-blur-sm rounded-md text-white text-xs font-medium z-10">
        {current + 1} / {images.length}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className="relative w-6 h-1.5 rounded-full overflow-hidden bg-white/30 transition-all"
          >
            {i === current ? (
              <div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{ width: `${progress}%`, transition: 'width 30ms linear' }}
              />
            ) : i < current ? (
              <div className="absolute inset-0 bg-white/70 rounded-full" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};

const useTilt = () => {
  const [style, setStyle] = useState({ transform: '' });
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`,
    });
  }, []);
  const onMouseLeave = useCallback(() => {
    setStyle({ transform: '' });
  }, []);
  return { style, onMouseMove, onMouseLeave };
};

const ProjectCard = ({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) => {
  const tilt = useTilt();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseLeave={tilt.onMouseLeave}
      onMouseMove={tilt.onMouseMove}
      className="group"
      style={{ ...tilt.style, transition: 'transform 0.2s ease-out' }}
    >
      <div className="glass-card h-full overflow-hidden">
        {/* Project Image  auto-scrolling carousel */}
        <div className="relative rounded-lg overflow-hidden mb-4">
          {project.images && project.images.length > 0 ? (
            <ImageCarousel images={project.images} title={project.title} />
          ) : (
            <div
              className="w-full h-48 md:h-52 flex items-center justify-center text-white font-heading font-bold text-lg"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              }}
            >
              {project.title}
            </div>
          )}
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
              className="flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors font-medium"
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
              className="flex items-center gap-2 text-sm text-dark-500 hover:text-dark-400 transition-colors font-medium"
            >
              <FaGithub />
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
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

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FaComments, FaPaintBrush, FaUsersCog, FaBullseye } from 'react-icons/fa';

const roles = [
  {
    id: 'client-bridge',
    icon: FaComments,
    title: 'Client & Founder Bridge',
    paragraph:
      'I work directly with founders to understand their vision and translate it into technical execution. Requirements, roadmaps, and sprint priorities stay aligned from day one. I turn unclear briefs into clear deliverables.',
    accent: 'primary',
  },
  {
    id: 'design-bridge',
    icon: FaPaintBrush,
    title: 'UI/UX to Engineering Bridge',
    paragraph:
      'I sit between design and engineering, ensuring the final product matches the designer\'s intent while staying feasible, performant, and scalable under real-world load. Every pixel and every endpoint is accounted for.',
    accent: 'accent',
  },
  {
    id: 'team-lead',
    icon: FaUsersCog,
    title: 'Engineering Team Lead',
    paragraph:
      'I have led and managed a team of 6 developers  code reviews, task delegation, and project management. Ownership doesn\'t stop at my own tasks. I ship the product, not just my tickets.',
    accent: 'secondary',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const TeamLeadClientBridge = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="team-lead"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white relative overflow-x-clip"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="block w-fit mx-auto px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            Leadership
          </span>
          <h2 className="section-title">
            Team Lead & Client Bridge
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            I operate beyond just writing code. I own delivery end to end  from founder
            conversations to shipped production features.
          </p>
        </motion.div>

        {/* Big ownership statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="glass-card text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
            <div className="w-14 h-14 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <FaBullseye className="text-primary-500 text-2xl" />
            </div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark-500 mb-3">
              Ownership End to End
            </h3>
            <p className="text-dark-100 leading-relaxed max-w-xl mx-auto">
              I act as the bridge between clients, UI/UX designers, and the engineering team.
              I gather requirements, translate them into technical features, and make roadmap
              and sprint decisions that keep everyone aligned.
            </p>
          </div>
        </motion.div>

        {/* Role cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            const accentColor =
              role.accent === 'primary'
                ? 'text-primary-500 bg-primary-500/10 group-hover:bg-primary-500/20'
                : role.accent === 'accent'
                ? 'text-accent-500 bg-accent-500/10 group-hover:bg-accent-500/20'
                : 'text-secondary-500 bg-secondary-500/10 group-hover:bg-secondary-500/20';

            const borderColor =
              role.accent === 'primary'
                ? 'border-primary-500'
                : role.accent === 'accent'
                ? 'border-accent-500'
                : 'border-secondary-500';

            return (
              <motion.div
                key={role.id}
                variants={itemVariants}
                className="glass-card relative overflow-hidden group transition-all duration-300 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${borderColor}`} />
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${accentColor}`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-dark-500 mb-3">
                    {role.title}
                  </h3>
                  <p className="text-dark-100 leading-relaxed text-sm">
                    {role.paragraph}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamLeadClientBridge;

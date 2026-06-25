import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FaSitemap, FaProjectDiagram, FaHandshake } from 'react-icons/fa';

const pillars = [
  {
    id: 'architecture',
    icon: FaSitemap,
    title: 'Architecture Design',
    description:
      'Designing scalable production-grade architecture that requires deep context, business understanding, and experience-based tradeoffs no AI can make alone. I shape systems that last, not just code that compiles.',
    accent: 'primary',
  },
  {
    id: 'system-design',
    icon: FaProjectDiagram,
    title: 'System Design',
    description:
      'End-to-end system design accounting for real-world constraints: latency, scale, cost, team structure. AI assists, humans decide. I own the outcomes that show up in production dashboards.',
    accent: 'accent',
  },
  {
    id: 'business-tech',
    icon: FaHandshake,
    title: 'Business Requirements → Technical Solutions',
    description:
      'Taking what a non-technical founder or client truly needs and translating it into the right technical solution. Pure human judgment backed by shipping experience.',
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const WhatAICantReplace = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="what-ai-cant-replace"
      ref={sectionRef}
      className="py-20 md:py-32 bg-light-200 relative overflow-x-clip"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="block w-fit mx-auto px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            Human Judgment
          </span>
          <h2 className="section-title">
            What AI Can&apos;t Replace
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            Three pillars of work that require deep context, business understanding,
            and experience-based tradeoffs  the kind of judgment only a human can deliver.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const accentColor =
              pillar.accent === 'primary'
                ? 'text-primary-500 bg-primary-500/10 group-hover:bg-primary-500/20'
                : pillar.accent === 'accent'
                ? 'text-accent-500 bg-accent-500/10 group-hover:bg-accent-500/20'
                : 'text-secondary-500 bg-secondary-500/10 group-hover:bg-secondary-500/20';

            const borderColor =
              pillar.accent === 'primary'
                ? 'border-primary-500'
                : pillar.accent === 'accent'
                ? 'border-accent-500'
                : 'border-secondary-500';

            return (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                className={`glass-card relative overflow-hidden group transition-all duration-300 hover:-translate-y-2`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Colored top border accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${borderColor}`} />

                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${accentColor}`}
                  >
                    <Icon className="text-2xl" />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-dark-500 mb-4">
                    {pillar.title}
                  </h3>

                  <p className="text-dark-100 leading-relaxed text-sm">
                    {pillar.description}
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

export default WhatAICantReplace;

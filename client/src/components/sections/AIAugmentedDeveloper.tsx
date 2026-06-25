import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FaBolt, FaRobot, FaCodeBranch } from 'react-icons/fa';

const stats = [
  {
    value: '41%',
    label: 'AI-generated code globally',
    source: 'JetBrains Developer Ecosystem 2025',
    detail: '256 billion lines of code analyzed',
    icon: FaCodeBranch,
  },
  {
    value: '46%',
    label: 'Copilot-generated code for users',
    source: 'GitHub 2025',
    detail: 'Java developers reach 61%',
    icon: FaRobot,
  },
  {
    value: '30%+',
    label: "Google's new code is AI-generated",
    source: 'Sundar Pichai',
    detail: 'Alphabet Q1 2025 earnings call',
    icon: FaBolt,
  },
  {
    value: '25%',
    label: 'YC W’25 batch 95%+ AI-gen codebases',
    source: 'Garry Tan',
    detail: 'CEO, Y Combinator',
    icon: FaRobot,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

const AIAugmentedDeveloper = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="ai-developer"
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
            AI-Native Workflow
          </span>
          <h2 className="section-title">
            AI-Augmented Developer
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            I don&apos;t just use AI  I&apos;ve rebuilt my entire development workflow around it.
            From architecture decisions to code generation and testing, AI tooling is embedded
            in every step. This is how I ship production code today, not tomorrow.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="glass-card text-center group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <Icon className="text-primary-500 text-xl" />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-dark-500 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-primary-500 font-medium">
                  {stat.source}
                </div>
                <div className="text-xs text-dark-100 mt-1">
                  {stat.detail}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Personal statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14"
        >
          <div className="glass-card max-w-3xl mx-auto text-center">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-dark-500 mb-4">
              My Current Edge
            </h3>
            <p className="text-dark-100 leading-relaxed">
              I use <span className="text-primary-500 font-semibold">Claude Code</span>,{' '}
              <span className="text-primary-500 font-semibold">Cursor</span>, and a suite of AI tooling
              to ship <span className="gradient-text font-bold">4–5x faster</span> than traditional
              development cycles. This means tighter feedback loops, fewer bugs in production,
              and the ability to iterate on features in hours instead of days.
            </p>
            <p className="text-dark-100 leading-relaxed mt-4">
              This isn&apos;t the future  it&apos;s my present workflow, and I&apos;m already
              ahead of the curve.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAugmentedDeveloper;

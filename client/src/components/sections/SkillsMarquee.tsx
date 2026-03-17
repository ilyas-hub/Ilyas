import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillRows = [
  {
    direction: 'left' as const,
    skills: [
      'JavaScript (ES6+)', 'TypeScript', 'React.js', 'TanStack (Query/Router)',
      'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Web Design',
      'Node.js', 'Express.js', 'RESTful API Development',
    ],
  },
  {
    direction: 'right' as const,
    skills: [
      'MVC Architecture', 'AuthN/AuthZ', 'RBAC', 'Razorpay Payment Gateway',
      'BullMQ', 'MongoDB', 'PostgreSQL', 'Prisma ORM',
      'Database Schema Design & Optimization', 'Redis',
    ],
  },
  {
    direction: 'left' as const,
    skills: [
      'n8n Workflow Automation', 'AI Agents', 'AI SDK Integration',
      'Vector Databases', 'AI-Powered Chatbot Development',
      'Docker', 'Docker Compose', 'Coolify', 'CI/CD Pipelines',
      'Cloudflare (CDN, DNS)', 'Render',
    ],
  },
  {
    direction: 'right' as const,
    skills: [
      'LLD', 'OOPs', 'Modular & Scalable Architecture',
      'Performance Optimization', 'Git & GitHub', 'Code Reviews',
      'Postman', 'MERN Stack', 'Full Stack Development', 'System Design',
    ],
  },
];

const categoryColors = [
  'from-primary-500 to-primary-600',
  'from-accent-500 to-accent-600',
  'from-secondary-500 to-secondary-600',
  'from-dark-300 to-dark-500',
];

const categoryBorders = [
  'border-primary-500/30',
  'border-accent-500/30',
  'border-secondary-500/30',
  'border-dark-300/30',
];

const MarqueeRow = ({
  skills,
  direction,
  colorIndex,
  speed = 30,
}: {
  skills: string[];
  direction: 'left' | 'right';
  colorIndex: number;
  speed?: number;
}) => {
  // Duplicate skills for seamless loop
  const duplicated = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-2" style={{ touchAction: 'pan-y' }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-4 w-max"
        style={{ touchAction: 'pan-y' }}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((skill, i) => (
          <div
            key={`${skill}-${i}`}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full border ${categoryBorders[colorIndex]} bg-white shadow-sm hover:shadow-md transition-shadow cursor-default group`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[colorIndex]}`} />
              <span className="text-sm font-medium text-dark-500 whitespace-nowrap">
                {skill}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SkillsMarquee = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const categories = ['Frontend & UI', 'Backend & APIs', 'AI & DevOps', 'Engineering'];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary-500/5 rounded-full floating" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-accent-500/5 rounded-full floating delay-300" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            My Toolkit
          </span>
          <h2 className="section-title">
            Skills & Technologies
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            The technologies I use to build scalable, production-ready applications from frontend to deployment.
          </p>
        </motion.div>

        {/* Category Labels + Marquee Rows */}
        <div className="space-y-6">
          {skillRows.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-2 px-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[index]}`} />
                <span className="text-xs font-semibold uppercase tracking-wider text-dark-100">
                  {categories[index]}
                </span>
              </div>
              <MarqueeRow
                skills={row.skills}
                direction={row.direction}
                colorIndex={index}
                speed={row.skills.length * 3}
              />
            </motion.div>
          ))}
        </div>

   
      </div>
    </section>
  );
};

export default SkillsMarquee;

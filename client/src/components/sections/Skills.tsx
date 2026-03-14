import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaGit, FaDocker, FaAws,
  FaCode, FaServer, FaDatabase, FaTools
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiTailwindcss, SiNextdotjs, SiRedux,
  SiExpress, SiGraphql, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiVercel
} from 'react-icons/si';
import { skills, skillCategories } from '../../data';

const iconComponents: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaGit, FaDocker, FaAws,
  SiTypescript, SiJavascript, SiTailwindcss, SiNextdotjs, SiRedux,
  SiExpress, SiGraphql, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiVercel,
  FaCode, FaServer, FaDatabase, FaTools,
};

const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FaCode, FaServer, FaDatabase, FaTools, FaDocker,
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white relative"
    >
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/5 rounded-full floating" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary-500/5 rounded-full floating delay-300" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent-500/5 rounded-full floating delay-500" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            My Toolkit
          </span>
          <h2 className="section-title">
            Skills & Technologies
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            The technologies and tools I use to build scalable, production-ready applications from frontend to deployment.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {skillCategories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(skill => skill.category === category.id);
            const CategoryIcon = categoryIcons[category.icon];

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="glass-card p-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-card ${
                    categoryIndex === 0 ? 'bg-primary-500' :
                    categoryIndex === 1 ? 'bg-accent-500' :
                    categoryIndex === 2 ? 'bg-secondary-500' :
                    'bg-dark-500'
                  }`}>
                    {CategoryIcon && <CategoryIcon className="text-white text-xl" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-dark-500">
                      {category.name}
                    </h3>
                    <p className="text-dark-100 text-sm">
                      {categorySkills.length} Technologies
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categorySkills.map((skill, index) => {
                    const IconComponent = iconComponents[skill.icon];
                    return (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + categoryIndex * 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group"
                      >
                        <div className="bg-white rounded-xl p-4 shadow-card border-2 border-transparent hover:border-primary-500 transition-all duration-300 hover:shadow-glow-red">
                          <div className="flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                              categoryIndex === 0 ? 'bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white' :
                              categoryIndex === 1 ? 'bg-accent-500/10 text-accent-500 group-hover:bg-accent-500 group-hover:text-white' :
                              categoryIndex === 2 ? 'bg-secondary-500/10 text-secondary-600 group-hover:bg-secondary-500 group-hover:text-dark-500' :
                              'bg-dark-500/10 text-dark-500 group-hover:bg-dark-500 group-hover:text-white'
                            }`}>
                              {IconComponent && <IconComponent className="text-2xl" />}
                            </div>

                            {/* Name */}
                            <h4 className="font-medium text-dark-500 text-sm mb-2">
                              {skill.name}
                            </h4>

                            {/* Progress Bar */}
                            <div className="w-full h-1.5 bg-light-400 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full rounded-full ${
                                  categoryIndex === 0 ? 'bg-primary-500' :
                                  categoryIndex === 1 ? 'bg-accent-500' :
                                  categoryIndex === 2 ? 'bg-secondary-500' :
                                  'bg-dark-500'
                                }`}
                              />
                            </div>
                            <span className="text-xs text-dark-100 mt-1">{skill.level}%</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* MERN Stack Highlight */}
     
      </div>
    </section>
  );
};

export default Skills;

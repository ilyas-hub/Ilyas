import type {
  NavLink,
  SocialLink,
  Skill,
  Experience,
  Project,
  Testimonial,
  PersonalInfo,
} from '../types';

// ==========================================
// PERSONAL INFO
// ==========================================
export const personalInfo: PersonalInfo = {
  name: "Mohd Ilyas Shaikh",
  title: "Sr. Software Engineer | Tech Lead",
  bio: "Senior Full Stack Engineer & Technical Lead with 3+ years of experience owning features end-to-end across scalable SaaS platforms. Acts as a bridge between clients, UI/UX, and development teams driving requirements clarity, structured planning, and on-time delivery. Strong in backend systems, multi-tenant architecture, and AI-based development.",
  email: "shaikhilyas387@gmail.com",
  phone: "8080611513",
  location: "Mumbai, India",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/assets/images/avatar.png",
  yearsOfExperience: 3,
  projectsCompleted: 20,
};

// ==========================================
// NAVIGATION LINKS
// ==========================================
export const navLinks: NavLink[] = [
  { id: "home", title: "Home", href: "#home" },
  { id: "about", title: "About", href: "#about" },
  { id: "stack", title: "Skills", href: "#stack" },
  { id: "experience", title: "Experience", href: "#experience" },
  { id: "projects", title: "Projects", href: "#projects" },
  { id: "contact", title: "Contact", href: "#contact" },
];

// ==========================================
// SOCIAL LINKS
// ==========================================
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/ilyas-hub",
    icon: "FaGithub",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shaikh-mohd-ilyas-09990b164/",
    icon: "FaLinkedin",
  },
];

// ==========================================
// SKILLS
// ==========================================
export const skills: Skill[] = [
  // Frontend
  { id: "javascript", name: "JavaScript (ES6+)", icon: "SiJavascript", category: "frontend", level: 95 },
  { id: "typescript", name: "TypeScript", icon: "SiTypescript", category: "frontend", level: 90 },
  { id: "react", name: "React.js", icon: "FaReact", category: "frontend", level: 95 },
  { id: "tanstack", name: "TanStack", icon: "FaCode", category: "frontend", level: 85 },
  { id: "redux", name: "Redux", icon: "SiRedux", category: "frontend", level: 88 },
  { id: "html", name: "HTML5", icon: "FaHtml5", category: "frontend", level: 95 },
  { id: "css", name: "CSS3", icon: "FaCss3Alt", category: "frontend", level: 90 },
  { id: "tailwind", name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend", level: 92 },

  // Backend
  { id: "nodejs", name: "Node.js", icon: "FaNodeJs", category: "backend", level: 92 },
  { id: "express", name: "Express.js", icon: "SiExpress", category: "backend", level: 90 },
  { id: "rest", name: "RESTful APIs", icon: "FaServer", category: "backend", level: 92 },
  { id: "razorpay", name: "Razorpay", icon: "FaServer", category: "backend", level: 85 },
  { id: "bullmq", name: "BullMQ", icon: "FaServer", category: "backend", level: 80 },

  // Database
  { id: "mongodb", name: "MongoDB", icon: "SiMongodb", category: "database", level: 92 },
  { id: "postgresql", name: "PostgreSQL", icon: "SiPostgresql", category: "database", level: 85 },
  { id: "prisma", name: "Prisma ORM", icon: "FaDatabase", category: "database", level: 85 },
  { id: "redis", name: "Redis", icon: "SiRedis", category: "database", level: 75 },

  // AI & Automation
  { id: "ai-agents", name: "AI Agents", icon: "FaTools", category: "ai", level: 80 },
  { id: "ai-sdk", name: "AI SDK", icon: "FaTools", category: "ai", level: 82 },
  { id: "vector-db", name: "Vector Databases", icon: "FaDatabase", category: "ai", level: 78 },
  { id: "n8n", name: "n8n Automation", icon: "FaTools", category: "ai", level: 80 },

  // DevOps & Cloud
  { id: "docker", name: "Docker", icon: "FaDocker", category: "devops", level: 85 },
  { id: "cicd", name: "CI/CD Pipelines", icon: "FaTools", category: "devops", level: 80 },
  { id: "cloudflare", name: "Cloudflare", icon: "FaTools", category: "devops", level: 82 },
  { id: "coolify", name: "Coolify", icon: "FaServer", category: "devops", level: 78 },

  // Engineering Practices
  { id: "git", name: "Git & GitHub", icon: "FaGit", category: "practices", level: 92 },
  { id: "lld", name: "LLD & OOPs", icon: "FaCode", category: "practices", level: 85 },
  { id: "architecture", name: "Scalable Architecture", icon: "FaCode", category: "practices", level: 88 },
  { id: "postman", name: "Postman", icon: "FaTools", category: "practices", level: 90 },
];

// ==========================================
// EXPERIENCE
// ==========================================
export const experiences: Experience[] = [
  {
    id: "exp1",
    company: "AdsCult",
    role: "Senior Software Engineer (Full Stack)",
    duration: "Mar 2025 - Present",
    description: [
      "Built and scaled multiple production-grade, multi-tenant SaaS platforms from scratch with secure RBAC and modular architecture",
      "Designed and delivered complex domain modules including Digital Vault, wills, contacts, family hierarchies, HRMS, and business workflows",
      "Implemented hierarchical admin systems enabling super-admin, org admin, and member-level feature control across tenants",
      "Developed a modular HRMS platform covering attendance, payroll, reimbursements, employee loans, and KPI management",
      "Integrated subscription billing and webhook automation using Razorpay",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Razorpay", "Docker", "RBAC"],
    logo: "/assets/images/company1.png",
  },
  {
    id: "exp2",
    company: "Techplus Media",
    role: "Senior Full Stack Developer",
    duration: "Jul 2023 - Jan 2025",
    description: [
      "Built and owned multiple production platforms from scratch, delivering scalable backend and frontend systems",
      "Developed an AI-driven B2B lead management platform with intent data, ABM workflows, and automated lead qualification",
      "Built a CXO mentor-mentee marketplace connecting fractional CXOs and mentees with onboarding and engagement features",
      "Delivered a CMS-driven media platform with admin-controlled content, media, and ad management using Strapi",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Strapi", "TanStack", "Tailwind"],
    logo: "/assets/images/company2.png",
  },
  {
    id: "exp3",
    company: "Trackk",
    role: "Full Stack Developer",
    duration: "Sep 2022 - May 2023",
    description: [
      "Built a stock market learning and analytics platform covering Stocks, FnO, IPOs, portfolios, and screeners",
      "Implemented simulated trading with virtual coins to help users practice trading strategies safely",
      "Delivered courses, notes, and real-time research insights to support informed, data-driven trading decisions",
    ],
    technologies: ["React", "Express.js", "MongoDB", "Redux", "Tailwind"],
    logo: "/assets/images/company3.png",
  },
];

// ==========================================
// PROJECTS
// ==========================================
export const projects: Project[] = [
  {
    id: "proj1",
    title: "Multi-Tenant SaaS Platform",
    description: "Production-grade multi-tenant SaaS with secure RBAC, modular architecture, HRMS, Digital Vault, and subscription billing.",
    longDescription: "Built and scaled multiple production-grade, multi-tenant SaaS platforms from scratch with secure RBAC and modular architecture. Features include Digital Vault (assets & liabilities), wills, contacts, family hierarchies, HRMS with attendance, payroll, reimbursements, and KPI management. Integrated Razorpay subscription billing with webhook automation.",
    image: "/assets/images/project1.png",
    technologies: ["React", "Node.js", "MongoDB", "Razorpay", "Docker", "Redis"],
    githubUrl: "https://github.com/ilyas-hub",
    liveUrl: "",
    featured: true,
    highlight: "Multi-Tenant, RBAC, Subscription Billing",
  },
  {
    id: "proj2",
    title: "RAG AI Chatbot",
    description: "AI-powered chatbot using Retrieval-Augmented Generation (RAG) with document ingestion, vector embeddings, and context-aware conversational AI.",
    longDescription: "An intelligent chatbot built with RAG architecture that ingests documents, creates vector embeddings for semantic search, and generates context-aware responses. Features document upload and processing, vector store integration for efficient retrieval, and a conversational interface powered by LLM with grounded, accurate answers from your own knowledge base.",
    image: "/assets/images/project2.png",
    technologies: ["TypeScript", "RAG", "AI/ML", "Vector DB", "LLM"],
    githubUrl: "https://github.com/ilyas-hub/RAG-AI-Chatbot",
    liveUrl: "",
    featured: true,
    highlight: "RAG Architecture, Vector Search, Context-Aware AI",
  },
];

// ==========================================
// TESTIMONIALS
// ==========================================
export const testimonials: Testimonial[] = [
  {
    id: "test1",
    name: "Techplus Media",
    role: "Engineering Team",
    company: "Techplus Media",
    content: "Ilyas built and owned multiple production platforms from scratch. His ability to deliver scalable backend and frontend systems with full ownership made him an invaluable asset to our team.",
    avatar: "/assets/images/testimonial1.png",
    rating: 5,
  },
  {
    id: "test2",
    name: "AdsCult Team",
    role: "Management",
    company: "AdsCult",
    content: "An exceptional tech lead who scaled our multi-tenant SaaS platforms with secure RBAC and modular architecture. His work on HRMS and subscription billing systems was outstanding.",
    avatar: "/assets/images/testimonial2.png",
    rating: 5,
  },
  {
    id: "test3",
    name: "Trackk Team",
    role: "Product Team",
    company: "Trackk",
    content: "Ilyas delivered a comprehensive stock market analytics platform with simulated trading features. His full-stack expertise and attention to detail consistently exceeded our expectations.",
    avatar: "/assets/images/testimonial3.png",
    rating: 5,
  },
];

// ==========================================
// SKILL CATEGORIES
// ==========================================
export const skillCategories = [
  { id: "frontend", name: "Frontend", icon: "FaCode" },
  { id: "backend", name: "Backend", icon: "FaServer" },
  { id: "database", name: "Databases", icon: "FaDatabase" },
  { id: "ai", name: "AI & Automation", icon: "FaTools" },
  { id: "devops", name: "DevOps & Cloud", icon: "FaDocker" },
  { id: "practices", name: "Engineering Practices", icon: "FaCode" },
];

// ==========================================
// PROFESSIONAL QUOTES
// ==========================================
export const professionalQuotes = [
  "Clean code is not written by following rules. It is written by crafting.",
  "First, solve the problem. Then, write the code.",
  "Simplicity is the soul of efficiency.",
  "Building solutions that scale, one commit at a time.",
];

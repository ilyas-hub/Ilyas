// Type definitions for the portfolio

export interface NavLink {
  id: string;
  title: string;
  href: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'practices';
  level: number; // 1-100
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlight?: string; // Key feature or impact highlight
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  avatarUrl?: string;
  yearsOfExperience: number;
  projectsCompleted: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

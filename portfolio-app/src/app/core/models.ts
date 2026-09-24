// Shared content shapes stored in Firestore and edited from the admin panel.

export interface HomeContent {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  cvUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  note?: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  bio: string;
  skills: string[];
  location?: string;
  availability?: string;
  highlights: string[];
  education: EducationItem[];
  stats?: AboutStat[];
}

export interface ExperienceItem {
  id?: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  employmentType?: string;
  description: string;
  order: number;
  tech: string[];
  current?: boolean;
}

export interface ProjectItem {
  id?: string;
  title: string;
  demo: string;
  demoVideoUrl?: string;
  problem: string;
  approach: string;
  solution: string;
  link?: string;
  order: number;
  tech: string[];
  category?: string;
  status?: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface SkillLanguage {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface PrincipleItem {
  icon: string;
  title: string;
  desc: string;
}

export interface SkillsContent {
  languages: SkillLanguage[];
  categories: SkillCategory[];
  concepts: string[];
  principles: PrincipleItem[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: number;
}

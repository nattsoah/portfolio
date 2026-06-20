export interface HeroData {
  tagline: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  profileImage: string;
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutData {
  title: string;
  description: string[];
  stats: AboutStat[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface ProjectPreviewImageCategory {
  category: string;
  images: string[];
}

export interface ProjectItem {
  title: string;
  type: string;
  description: string;
  image?: string;
  tags: string[];
  github?: string;
  demo?: string;
  previewImages?: string[] | ProjectPreviewImageCategory[];
  previewImage?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  image?: string;
}

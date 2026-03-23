import projectsData from '@/data/projectsCache.json';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  gallery: string[];
  subtitle?: string;
  year?: string;
  location?: string;
  details?: string;
}

export function getProjects(): Project[] {
  return projectsData.projects || [];
}

export function getApplications(): Project[] {
  return projectsData.applications || [];
}

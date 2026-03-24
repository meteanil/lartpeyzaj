import { client } from '@/sanity/lib/client';

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

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    "gallery": gallery[].asset->url,
    location,
    year
  }`;
  
  const projects = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return projects.map((p: any) => ({
    id: p._id,
    title: p.title,
    slug: p.slug || '#',
    category: "Projelerimiz",
    description: p.description || "",
    coverImage: p.coverImage || "/placeholder.jpg",
    gallery: p.gallery || [],
    location: p.location || "Konya",
    year: p.year || new Date().getFullYear().toString()
  }));
}

export async function getApplications(): Promise<Project[]> {
  const query = `*[_type == "application"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    "gallery": gallery[].asset->url,
    location,
    year
  }`;
  
  const applications = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return applications.map((p: any) => ({
    id: p._id,
    title: p.title,
    slug: p.slug || '#',
    category: "Uygulamalar",
    description: p.description || "",
    coverImage: p.coverImage || "/placeholder.jpg",
    gallery: p.gallery || [],
    location: p.location || "Konya",
    year: p.year || new Date().getFullYear().toString()
  }));
}

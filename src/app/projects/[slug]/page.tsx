import { getProjects, getApplications } from "@/lib/projects";
import ProjectDetail from "./ProjectDetail";
import { notFound } from "next/navigation";
import { use } from "react";

export function generateStaticParams() {
  const projects = getProjects();
  const applications = getApplications();
  return [...projects, ...applications].map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const projects = getProjects();
  const applications = getApplications();
  const allItems = [...projects, ...applications];
  const project = allItems.find((p) => p.slug === slug);
  if (!project) notFound();

  const mappedProject: any = { 
    ...project, 
    image: project.coverImage || '/placeholder.jpg',
    subtitle: project.subtitle || '',
    year: project.year || '2025',
    location: project.location || 'Konya, Türkiye',
    details: project.details || project.description || ''
  };

  return <ProjectDetail project={mappedProject} />;
}

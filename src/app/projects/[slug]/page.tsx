import { getProjects, getApplications } from "@/lib/projects";
import ProjectDetail from "./ProjectDetail";
import { notFound } from "next/navigation";
import { use } from "react";

export async function generateStaticParams() {
  const projects = await getProjects();
  const applications = await getApplications();
  return [...projects, ...applications].map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const applications = await getApplications();
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

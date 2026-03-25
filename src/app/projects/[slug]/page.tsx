import { getProjects, getApplications } from "@/lib/projects";
import ProjectDetail from "./ProjectDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const applications = await getApplications();
  const allItems = [...projects, ...applications];
  const project = allItems.find((p) => p.slug === slug);

  if (!project) return { title: "Proje Bulunamadı | L'art Peyzaj" };

  return {
    title: `${project.title} - Projelerimiz | L'art Peyzaj Mimarlık`,
    description: project.description?.substring(0, 160) || "L'art Peyzaj özel mimari projesi tasarımı ve uygulaması.",
    openGraph: {
      title: `${project.title} | L'art Peyzaj`,
      description: project.description?.substring(0, 160) || "L'art Peyzaj özel mimari projesi tasarımı ve uygulaması.",
      images: project.coverImage ? [project.coverImage] : ["/og-image.png"],
    },
  };
}

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

import { getProjects, getApplications } from "@/lib/projects";
import ProjectsPageClient from "./ProjectsPageClient";

export default function ProjectsPage() {
  const projects = getProjects();
  const applications = getApplications();
  
  const safeProjects = projects.length > 0 ? projects : [
    {
      id: "00",
      title: "Henüz Proje Eklenmedi",
      slug: "#",
      category: "Sistem Mesajı",
      description: "public/Projeler_ içerisine lütfen klasör oluşturup resim ekleyin.",
      coverImage: "/placeholder.jpg",
      gallery: []
    }
  ];

  const safeApps = applications.length > 0 ? applications : [
    {
      id: "00",
      title: "Henüz Uygulama Eklenmedi",
      slug: "#",
      category: "Sistem Mesajı",
      description: "public/Uygulamalar içerisine lütfen klasör oluşturup resim ekleyin.",
      coverImage: "/placeholder.jpg",
      gallery: []
    }
  ];

  return (
    <main style={{ minHeight: "100vh" }}>
      <ProjectsPageClient projects={safeProjects} applications={safeApps} />
    </main>
  );
}

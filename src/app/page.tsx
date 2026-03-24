import { getProjects } from "@/lib/projects";
import HomeClient from "@/components/home/HomeClient";

export default async function Home() {
  // Sunucu tarafında (Server-side) klasörleri ve içindeki detayları dinamik oku
  const projects = await getProjects();

  // İstemci tarafı (Client-side) animasyonlara ve arayüze aktar
  return <HomeClient projects={projects} />;
}

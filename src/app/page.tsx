import { getProjects, getSiteSettings } from "@/lib/projects";
import HomeClient from "@/components/home/HomeClient";

export default async function Home() {
  // Sunucu tarafında (Server-side) klasörleri ve içindeki detayları dinamik oku
  const projects = await getProjects();
  const settings = await getSiteSettings();

  // İstemci tarafı (Client-side) animasyonlara ve arayüze aktar
  return <HomeClient projects={projects} settings={settings} />;
}

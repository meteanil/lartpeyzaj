import { getProjects, getHomePageSettings, getAboutPageSettings, getContactPageSettings } from "@/lib/projects";
import HomeClient from "@/components/home/HomeClient";

export default async function Home() {
  const projects = await getProjects();
  const home = await getHomePageSettings();
  const about = await getAboutPageSettings();
  const contact = await getContactPageSettings();

  return <HomeClient projects={projects} home={home} about={about} contact={contact} />;
}

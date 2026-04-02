import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import TeamSection from "@/components/about/TeamSection";
import ContactSection from "@/components/home/ContactSection";
import { getAboutPageSettings, getContactPageSettings, getTeamMembers } from "@/lib/projects";

export const metadata = {
  title: "Hakkımızda | L'art Peyzaj Mimarlık",
  description: "L'art Peyzaj Mimarlık firmasının kuruluş hikayesi, misyonu, vizyonu ve uzman tasarım ekibi.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const about = await getAboutPageSettings();
  const contact = await getContactPageSettings();
  const team = await getTeamMembers();

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <AboutHero about={about} />
      <MissionVision about={about} />
      <TeamSection team={team} />
      {/* İletişim Formunu ve Footer'ı Ana Sayfadan Aynen Kullanıyoruz */}
      <ContactSection contact={contact} />
    </main>
  );
}

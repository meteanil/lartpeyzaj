import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import TeamSection from "@/components/about/TeamSection";
import ContactSection from "@/components/home/ContactSection";
import { getSiteSettings } from "@/lib/projects";

export const metadata = {
  title: "Hakkımızda | L'art Peyzaj Mimarlık",
  description: "L'art Peyzaj Mimarlık firmasının kuruluş hikayesi, misyonu, vizyonu ve uzman tasarım ekibi.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

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
      <AboutHero />
      <MissionVision />
      <TeamSection />
      {/* İletişim Formunu ve Footer'ı Ana Sayfadan Aynen Kullanıyoruz */}
      <ContactSection settings={settings} />
    </main>
  );
}

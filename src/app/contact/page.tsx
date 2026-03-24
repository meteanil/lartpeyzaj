import ContactInfoGrid from "@/components/contact/ContactInfoGrid";
import FAQ from "@/components/contact/FAQ";
import ContactSection from "@/components/home/ContactSection";
import { getSiteSettings } from "@/lib/projects";

export const metadata = {
  title: "İletişim | L'art Peyzaj Mimarlık",
  description: "L'art Peyzaj Mimarlık ofis adresi, çalışma saatleri, direkt iletişim kanalları ve sıkça sorulan sorular.",
};

export default async function ContactPage() {
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
      <ContactInfoGrid settings={settings} />
      <FAQ />
      
      {/* İletişim Formunu ve Mega Footer'ı sayfanın en sonuna doğrudan entegre ediyoruz */}
      <div style={{ marginTop: "4rem" }}>
        <ContactSection settings={settings} />
      </div>
    </main>
  );
}

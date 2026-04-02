import ContactInfoGrid from "@/components/contact/ContactInfoGrid";
import FAQ from "@/components/contact/FAQ";
import ContactSection from "@/components/home/ContactSection";
import { getContactPageSettings } from "@/lib/projects";

export const metadata = {
  title: "İletişim | L'art Peyzaj Mimarlık",
  description: "L'art Peyzaj Mimarlık ofis adresi, çalışma saatleri, direkt iletişim kanalları ve sıkça sorulan sorular.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const contact = await getContactPageSettings();

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
      <ContactInfoGrid contact={contact} />
      <FAQ title={contact.faqTitle} faqs={contact.faqs} />
      
      {/* İletişim Formunu ve Mega Footer'ı sayfanın en sonuna doğrudan entegre ediyoruz */}
      <div style={{ marginTop: "4rem" }}>
        <ContactSection contact={contact} />
      </div>
    </main>
  );
}

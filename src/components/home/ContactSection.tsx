"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactPageSettings } from "@/lib/projects";

export default function ContactSection({ contact }: { contact?: ContactPageSettings }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("GÖNDERİLİYOR...");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "1b21be87-68fc-4c52-93b1-99f069cfa05b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("Mesajınız başarıyla iletildi! En kısa sürede dönüş yapacağız. ✨");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("Bir hata oluştu. Lütfen doğrudan e-posta ile ulaşın.");
      }
    } catch (error) {
      setStatus("Bağlantı hatası, lütfen tekrar deneyin.");
    }
    
    setIsSubmitting(false);
    setTimeout(() => setStatus(""), 8000);
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        ".contact-reveal",
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#080908", position: "relative", overflow: "hidden", paddingTop: "8rem" }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6vw; align-items: center; position: relative; z-index: 1; }
        .contact-reveal { opacity: 0; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}} />

      {/* Background Subtle Glow */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(163,204,57,0.05) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      
      <div className="contact-grid" style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5vw" }}>
        
        {/* Left Side: General Info & Contact Details */}
        <div style={{ paddingBottom: "2rem" }}>
          <span className="contact-reveal" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", display: "block", marginBottom: "1.5rem" }}>
            İletişime Geçin
          </span>
          <h2 className="contact-reveal" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", fontFamily: "var(--font-heading), sans-serif", fontWeight: 800, color: "var(--foreground)", lineHeight: 1.1, marginBottom: "2rem" }}>
            Yeni Bir Hikaye <br/><span style={{ color: "var(--accent)" }}>Yazalım.</span>
          </h2>
          <p className="contact-reveal" style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "500px", marginBottom: "3.5rem" }}>
            Arazinizin potansiyelini birlikte keşfetmek ve vizyonunuzu eşsiz bir esere dönüştürmek için buradayız. Projeniz hakkında detaylı konuşmak isterseniz lütfen bir kahvemizi içmeye gelin.
          </p>

          <div className="contact-reveal" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(163,204,57,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", border: "1px solid rgba(163,204,57,0.2)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "1px" }}>Ofisimiz</p>
                <p style={{ color: "var(--foreground)", fontWeight: 600, fontSize: "1.1rem" }}>{contact?.address || "Konya, Türkiye"}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(163,204,57,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", border: "1px solid rgba(163,204,57,0.2)" }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "1px" }}>Telefon</p>
                <p style={{ color: "var(--foreground)", fontWeight: 600, fontSize: "1.1rem" }}>{contact?.phone || "053X XXX XX XX"}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(163,204,57,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", border: "1px solid rgba(163,204,57,0.2)" }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "1px" }}>E-Posta</p>
                <p style={{ color: "var(--foreground)", fontWeight: 600, fontSize: "1.1rem" }}>{contact?.email || "info@lartpeyzaj.com"}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Glassmorphism Functional Form */}
        <div className="contact-reveal" style={{ backgroundColor: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "32px", padding: "4rem 3rem", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "2rem" }} onSubmit={handleSubmit}>
            <input type="hidden" name="subject" value="L'art Peyzaj - Yeni İletişim Formu Mesajı" />
            <input type="hidden" name="from_name" value="L'art Peyzaj Web Sitesi" />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: "1px" }}>Ad Soyad</label>
              <input name="name" required type="text" placeholder="İsminizi girin" style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.2rem", color: "var(--foreground)", outline: "none", transition: "border-color 0.3s, background-color 0.3s" }} 
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.backgroundColor = "rgba(0,0,0,0.6)"; }} 
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.backgroundColor = "rgba(0,0,0,0.4)"; }} 
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: "1px" }}>E-Posta Adresiniz</label>
              <input name="email" required type="email" placeholder="ornek@sirket.com" style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.2rem", color: "var(--foreground)", outline: "none", transition: "border-color 0.3s, background-color 0.3s" }} 
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.backgroundColor = "rgba(0,0,0,0.6)"; }} 
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.backgroundColor = "rgba(0,0,0,0.4)"; }} 
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: "1px" }}>Proje Detayları</label>
              <textarea name="message" required placeholder="Hayalinizdeki projeden biraz bahsedin..." rows={4} style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.2rem", color: "var(--foreground)", outline: "none", resize: "none", transition: "border-color 0.3s, background-color 0.3s", fontFamily: "inherit" }} 
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.backgroundColor = "rgba(0,0,0,0.6)"; }} 
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.backgroundColor = "rgba(0,0,0,0.4)"; }} 
              />
            </div>

            {status && (
              <div style={{ padding: "1rem", backgroundColor: status.includes("başarı") ? "rgba(163,204,57,0.1)" : "rgba(255,0,0,0.1)", color: status.includes("başarı") ? "var(--accent)" : "#ff4444", border: `1px solid ${status.includes("başarı") ? "rgba(163,204,57,0.3)" : "rgba(255,0,0,0.3)"}`, borderRadius: "8px", textAlign: "center", fontWeight: 600, fontSize: "0.95rem" }}>
                {status}
              </div>
            )}

            <button disabled={isSubmitting} type="submit" style={{ marginTop: "1rem", width: "100%", backgroundColor: "var(--accent)", color: "#000", fontWeight: 800, padding: "1.3rem", borderRadius: "12px", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, transition: "all 0.3s ease", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px" }} 
              onMouseEnter={(e) => { if(!isSubmitting) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(163,204,57,0.25)"; } }} 
              onMouseLeave={(e) => { if(!isSubmitting) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; } }} 
            >
              {isSubmitting ? "MESAJ İLETİLİYOR..." : "MESAJI İLET"}
            </button>
            
          </form>
        </div>

      </div>

      {/* Yeni Nesil Profesyonel Mega Footer */}
      <footer style={{ width: "100%", backgroundColor: "#060706", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "8rem", paddingTop: "5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 5vw", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "4rem", paddingBottom: "4rem" }}>
          
          {/* Logo & Marka Vizyonu */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <img src="/lart-Logo3.png" alt="L'art Logo Master" style={{ height: "45px", objectFit: "contain", filter: "brightness(2) grayscale(1) opacity(0.9)", width: "max-content" }} />
            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "350px", marginTop: "1rem" }}>
              Beton yığınları arasında kaybettiğimiz yeşili geri çağırıyoruz. Şehrin merkezinden doğanın kalbine uzanan nefes kesici organik yaşam alanları ve lüks peyzaj projeleri tasarlıyoruz.
            </p>
          </div>

          {/* Menü & Hızlı Bağlantılar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h4 style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "1px" }}>Keşfet</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
              <a href="/" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.3s", fontSize: "0.95rem" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>Ana Sayfa</a>
              <a href="/about" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.3s", fontSize: "0.95rem" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>Hakkımızda</a>
              <a href="/projects" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.3s", fontSize: "0.95rem" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>Projelerimiz</a>
              <a href="/contact" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.3s", fontSize: "0.95rem" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>İletişim & Randevu</a>
            </div>
          </div>

          {/* Uzmanlıklar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h4 style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "1px" }}>Uzmanlıklarımız</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Peyzaj Tasarımı</span>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Akıllı Sert Zemin</span>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>3D Gerçekçi Modelleme</span>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Botanik Uygulama</span>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Otonom Sulama Sistemleri</span>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Eko Restorasyon</span>
            </div>
          </div>

          {/* Bülten (Newsletter) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h4 style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "1px" }}>Aylık Mimari Bülten</h4>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>Son tasarım trendleri ve tamamlanan dev projelerimizden haberdar olmak için e-posta listemize katılın.</p>
            <div style={{ display: "flex", width: "100%", marginTop: "0.5rem" }}>
              <input type="email" placeholder="E-posta adresiniz" style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", borderRadius: "8px 0 0 8px", padding: "1rem", color: "var(--foreground)", outline: "none" }} />
              <button style={{ backgroundColor: "var(--accent)", color: "#000", border: "none", borderRadius: "0 8px 8px 0", padding: "0 1.5rem", fontWeight: 800, cursor: "pointer", transition: "background-color 0.3s" }}>
                GÖNDER
              </button>
            </div>
          </div>

        </div>

        {/* En Alt Yasal Uyarı Çizgisi (Copyright & Legal) */}
        <div style={{ width: "100%", backgroundColor: "#040504", borderTop: "1px solid rgba(255,255,255,0.03)", padding: "1.5rem 5vw" }}>
          <div style={{ maxWidth: "1600px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 500 }}>
              © {new Date().getFullYear()} L'art Peyzaj Mimarlık. Tüm hakları saklıdır.
            </p>
            
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <a href="/kvkk" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color="var(--accent)"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>KVKK Aydınlatma Metni</a>
              <a href="/cerez-politikasi" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color="var(--accent)"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>Çerez Politikası</a>
              <div style={{ width: "1px", height: "15px", backgroundColor: "rgba(255,255,255,0.1)" }} />
              
              <a href={contact?.instagramUrl || "https://www.instagram.com/lartpeyzajmimarlik/"} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.3s", display: "flex", alignItems: "center", gap: "0.4rem" }} onMouseEnter={e => e.currentTarget.style.color="var(--accent)"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

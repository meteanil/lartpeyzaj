"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        ".mv-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "8rem 5vw", backgroundColor: "#060706", position: "relative" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
        
        {/* MİSYON */}
        <div className="mv-card" style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: "clamp(2.5rem, 5vw, 4rem)", borderRadius: "32px", border: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
          <div style={{ position: "absolute", top: "2rem", right: "2rem", opacity: 0.05, fontSize: "6rem", fontWeight: 900, lineHeight: 0.8, color: "var(--foreground)"}}>M</div>
          <span style={{ fontSize: "1rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px" }}>Misyonumuz</span>
          <h3 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontFamily: "var(--font-heading)", fontWeight: 800, marginTop: "1.5rem", marginBottom: "1.5rem", color: "var(--foreground)" }}>
            Mimariyi Doğayla Barıştırıyoruz.
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            Mimari yapıların gri soğukluğunu, doğanın canlı renkleriyle dengeliyoruz. Bireye özel fonksiyonel peyzaj çözümleri üretirken, ekolojik dengeyi koruyan, su ayak izini düşüren ve doğanın iyileştirici gücünü insanla buluşturan kusursuz bir mühendislik ortaya koyuyoruz.
          </p>
        </div>

        {/* VİZYON */}
        <div className="mv-card" style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: "clamp(2.5rem, 5vw, 4rem)", borderRadius: "32px", border: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
          <div style={{ position: "absolute", top: "2rem", right: "2rem", opacity: 0.05, fontSize: "6rem", fontWeight: 900, lineHeight: 0.8, color: "var(--foreground)"}}>V</div>
          <span style={{ fontSize: "1rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px" }}>Vizyonumuz</span>
          <h3 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontFamily: "var(--font-heading)", fontWeight: 800, marginTop: "1.5rem", marginBottom: "1.5rem", color: "var(--foreground)" }}>
            Ölümsüz Ekosistemler.
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            Ulusal ve uluslararası ölçekte, peyzaj mimarlığının kurallarını sürdürülebilir bir eksende yeniden yazmak. 50 yıl sonra bile kendi kendine yetebilen, zamana meydan okuyan ve sonraki nesillere nefes olacak referans statüsünde doğal yaşam harikaları bırakmak.
          </p>
        </div>

      </div>
    </section>
  );
}

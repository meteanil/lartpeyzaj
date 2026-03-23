"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

// İlk 3 projeyi alacağız
const featured = projects.slice(0, 3);

// Süreç adımları (ProcessSection'dan alındı)
const processSteps = [
  {
    id: "01",
    title: "Tasarım & Planlama",
    desc: "Arazinin ruhunu okur, modern beklentilere uygun premium konsept projeleri çizeriz. Her çizgi sürdürülebilir bir nefesi hedefler.",
  },
  {
    id: "02",
    title: "Sert & Yumuşak Uygulama",
    desc: "Dayanıklı materyallerle yolları kurarken, en canlı bitkilerle arazinize hayat kaynağı naklederiz.",
  },
  {
    id: "03",
    title: "Sürdürülebilirlik & Bakım",
    desc: "Geleceğin mirasını yaşatmak için su yönetimi ve gübreleme planlarını tasarlarız. Profesyonel bakımımızla ilk günkü parıltıyı koruruz.",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  // Process kutularının animasyonu için ref
  const processBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Toplam Panel: 3 Proje + 1 Kapanış
    const totalPanels = panelsRef.current.length;
    
    // Yatay Kaydırma Timeline'ı
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1, // Yumuşatılmış tekerlek kaymasi
        snap: 1 / (totalPanels - 1), // Panellerde tam durma
        // Toplam genişliğe orantılı bir kaydırma alanı
        end: () => `+=${scrollContainerRef.current?.offsetWidth || window.innerWidth * totalPanels}`,
      },
    });

    // Ana kaydırma
    tl.to(panelsRef.current, {
      xPercent: -100 * (totalPanels - 1),
      ease: "none",
    });

    // Her projede adımın (Process) aşağıdan belirmesi/fade in olması için ek scrub animasyonu
    processBoxesRef.current.forEach((box, i) => {
      if (!box) return;
      
      // İlk box zaten ekranda, animasyona gerek yok. 2v e 3. box'lar kaydırma ile hizalanınca belirmeli
      // Ancak xPercent animasyonunda scroll container zaten kaydığı için parent üzerinden hesaplama yapılır
      // Veya direkt CSS ile görünebilir de bırakabiliriz çünkü zaten panel gelene kadar görünmüyor.
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ width: "100%", height: "100vh", position: "relative", backgroundColor: "var(--background)", overflow: "hidden" }}>
      
      <div 
        ref={scrollContainerRef}
        style={{
          display: "flex",
          width: `${(featured.length + 1) * 100}vw`, // Projeler + 1 Bitiş paneli
          height: "100%",
        }}
      >
        {featured.map((proj, idx) => (
          <div
            key={proj.slug}
            ref={(el) => { panelsRef.current[idx] = el; }}
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              padding: "5vw 8vw",
              gap: "4vw",
            }}
          >
            {/* SOL: Proje Görseli ve Detayları */}
            <div style={{ flex: "1 1 auto", width: "50%", height: "80vh", position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
              <Image 
                src={proj.image} 
                alt={proj.title} 
                fill 
                style={{ objectFit: "cover", transform: "scale(1.05)" }} // Parallax payı
                unoptimized={proj.image.startsWith("http")}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,18,13,0.95) 0%, transparent 60%)", pointerEvents: "none" }} />
              
              {/* Proje Yazıları */}
              <div style={{ position: "absolute", bottom: "3rem", left: "3rem", zIndex: 10 }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "2px", textTransform: "uppercase" }}>{proj.category}</span>
                <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", fontWeight: 800, margin: "0.5rem 0", color: "#fff", fontFamily: "var(--font-heading)" }}>{proj.title}</h2>
                <Link 
                  href={`/projects/${proj.slug}`} 
                  style={{ 
                    display: "inline-block", 
                    marginTop: "1rem", 
                    color: "var(--background)", 
                    backgroundColor: "var(--accent)", 
                    padding: "0.8rem 2rem", 
                    borderRadius: "30px", 
                    fontWeight: 700, 
                    transition: "all 0.3s ease" 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--foreground)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--accent)"}
                >
                  Detayları İncele
                </Link>
              </div>
            </div>

            {/* SAĞ: Çalışma Süreci (O anki projenin adımı) */}
            <div 
              ref={(el) => { processBoxesRef.current[idx] = el; }}
              style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div style={{ padding: "3rem", backgroundColor: "rgba(244, 246, 240, 0.03)", borderRadius: "16px", border: "1px solid rgba(244, 246, 240, 0.1)" }}>
                <span style={{ color: "var(--accent)", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                  Sürecimiz — {idx + 1}/3
                </span>
                
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "2px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "var(--accent)",
                    fontFamily: "var(--font-heading)",
                    margin: "2rem 0 1rem",
                  }}
                >
                  {processSteps[idx].id}
                </div>

                <h3 style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", color: "var(--foreground)", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>
                  {processSteps[idx].title}
                </h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.6, fontSize: "1rem" }}>
                  {processSteps[idx].desc}
                </p>
              </div>
            </div>

          </div>
        ))}
        
        {/* Son Panel: Daha Fazlasını Keşfet */}
        <div
          ref={(el) => { panelsRef.current[featured.length] = el; }}
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--background)",
            flexDirection: "column",
            position: "relative"
          }}
        >
          {/* Arkaplan Şık Detay */}
          <div style={{ position: "absolute", fontSize: "20vw", fontWeight: 800, opacity: 0.02, color: "var(--accent)", pointerEvents: "none", whiteSpace: "nowrap" }}>
            PORTFOLIO
          </div>

          <h2 style={{ fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 800, color: "var(--foreground)", fontFamily: "var(--font-heading)", marginBottom: "2rem", textAlign: "center", zIndex: 1 }}>
            Daha Fazlasını <br/><span style={{ color: "var(--accent)" }}>Keşfet</span>
          </h2>
          <Link
            href="/projects"
            style={{
              padding: "1rem 3rem",
              border: "2px solid var(--accent)",
              color: "var(--accent)",
              borderRadius: "40px",
              fontSize: "1.2rem",
              fontWeight: 700,
              transition: "all 0.3s ease",
              zIndex: 1
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; e.currentTarget.style.color = "var(--background)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
          >
            Tüm Projelerimiz →
          </Link>
        </div>

      </div>
    </section>
  );
}

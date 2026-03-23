"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    id: "01",
    title: "Tasarım & Planlama",
    desc: "Arazinin ruhunu okur, iklim dinamiğine ve modern beklentilere uygun premium konsept projeleri çizeriz. Her çizgi sürdürülebilir bir nefesi hedefler.",
  },
  {
    id: "02",
    title: "Sert & Yumuşak Uygulama",
    desc: "En dayanıklı materyallerle yürüyüş yolları ve oturma alanlarını kurarken, en canlı renkleri barındıran bitkilerle arazinize hayat kaynağı naklederiz.",
  },
  {
    id: "03",
    title: "Sürdürülebilirlik & Bakım",
    desc: "Geleceğin mirasını yaşatmak için su yönetimi ve gübreleme planlarını tasarlarız. Organik formların ilk günkü parıltısını kaybetmemesi için profesyonelce bakarız.",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 80%",
        scrub: 1.5, // Scrolla duyarlı yavaş/kademeli ilerleme
      },
    });

    // 1. Ortadaki yatay çizginin dolması
    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 2, ease: "none" });

    // 2. Her bir process item'in sırayla netleşmesi/yukarı çıkması
    itemsRef.current.forEach((item, i) => {
      // Çizgi dolarken o noktaya geldiğinde item da belirmesin diye ufak formüllü bir timeline
      gsap.fromTo(
        item,
        { opacity: 0.2, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%", // Kendi item'ı ekrana girince tetiklenir
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        padding: "10vw 8vw 15vw",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "8vw" }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 800,
            color: "var(--accent)", 
          }}
        >
          Sürecimiz
        </h2>
        <p style={{ marginTop: "1rem", color: "var(--muted)", maxWidth: "500px", margin: "1rem auto" }}>
          Her projede aynı profesyonel adımları atarak kalitemizi standartlaştırıyoruz.
        </p>
      </div>

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Yatay İlerleme Çizgisi (Sadece masaüstünde görülür) */}
        <div 
          className="desktop-line"
          style={{
            position: "absolute",
            top: "60px", 
            left: "5%",
            width: "90%",
            height: "2px",
            background: "rgba(244, 246, 240, 0.1)", // Koyu taban
            zIndex: 1,
          }}
        >
          <div
            ref={lineRef}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "var(--accent)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Adımlar (Grid) */}
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "4rem", 
            position: "relative", 
            zIndex: 2 
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.id}
              ref={(el) => { itemsRef.current[idx] = el; }}
              style={{ padding: "2rem 1rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              {/* Sayı Yuvarlağı (Çizgi hizasında duracak) */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "var(--background)",
                  border: "2px solid var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "2rem",
                }}
              >
                {step.id}
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: 700 }}>
                {step.title}
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
{/* Stil yamasını buraya da atabiliriz ufak CSS eksiği için (Eğer line mobilde gizlenmek istenirse) */}
<style dangerouslySetInnerHTML={{__html: `
@media (max-width: 768px) {
  .desktop-line { display: none !important; }
}
`}} />

    </section>
  );
}

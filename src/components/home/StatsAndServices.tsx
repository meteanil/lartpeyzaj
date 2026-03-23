"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { label: "Tamamlanan Proje", value: 120, suffix: "+" },
  { label: "Yıllık Tecrübe", value: 15, suffix: "+" },
  { label: "Müşteri Memnuniyeti", value: 100, suffix: "%" },
  { label: "Uzman Ekip Üyesi", value: 25, suffix: "+" },
];

const services = [
  {
    title: "Peyzaj Tasarım",
    desc: "Arazinin karakterine uygun, estetik ve fonksiyonel konsept projeler.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    ),
  },
  {
    title: "Sert Zemin Uygulama",
    desc: "Yürüyüş yolları, istinat duvarları, ahşap deck ve pergola sistemleri.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
  },
  {
    title: "Bitkisel Uygulama",
    desc: "İklim şartlarına dayanıklı ağaçlandırma, çim ekimi ve aranjmanlar.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    ),
  },
  {
    title: "Periyodik Bakım",
    desc: "Budama, gübreleme, ilaçlama ve uzun vadeli alan koruma hizmetleri.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    ),
  },
];

export default function StatsAndServices() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!wrapperRef.current || !prismRef.current) return;

    // Timeline for 3D flip (Stats -> Services)
    const flipTl = gsap.to(prismRef.current, {
      rotationX: 90,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=150%", // 1.5 ekran kaydırma süresi boyunca takla atar
        scrub: 1,
        pin: true,
      },
    });

    // Counters Animation when Stats face is in view
    const triggerStats = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top 80%",
      onEnter: () => {
        numberRefs.current.forEach((el, index) => {
          if (!el) return;
          const target = { val: 0 };
          gsap.to(target, {
            val: stats[index].value,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: function () {
              el.innerText = Math.floor(target.val).toString() + stats[index].suffix;
            },
          });
        });
      },
      once: true,
    });

    return () => {
      // Clean up specific triggers
      if (flipTl.scrollTrigger) flipTl.scrollTrigger.kill();
      triggerStats.kill();
    };
  }, []);

  return (
    <section 
      ref={wrapperRef} 
      style={{ 
        width: "100%", 
        height: "100vh", 
        position: "relative", 
        perspective: "2500px", 
        overflow: "hidden", 
        backgroundColor: "var(--background)",
        borderTop: "1px solid rgba(255,255,255,0.02)"
      }}
    >
      {/* 50vh geriye itilmiş merkez kutu (Böylece ön yüzey ekranla sıfır olur) */}
      <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: "translateZ(-50vh)" }}>
        
        {/* Dönen Prizma */}
        <div ref={prismRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          
          {/* YÜZ 1: STATS (ÖN YÜZ) */}
          <div style={{ position: "absolute", width: "100%", height: "100%", transform: "translateZ(50vh)", backgroundColor: "var(--background)", backfaceVisibility: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", marginBottom: "5rem", padding: "0 4vw" }}>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase" }}>Rakamlarla Biz</span>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "var(--font-heading), sans-serif", fontWeight: 800, color: "var(--foreground)", marginTop: "1rem" }}>
                Zamanın Ötesinde <span style={{ color: "var(--accent)" }}>Eserler.</span>
              </h2>
              <p style={{ color: "var(--muted)", marginTop: "1.5rem", fontSize: "1.1rem", maxWidth: "600px", margin: "1.5rem auto 0" }}>
                Her projeye bir tablo gibi yaklaşıyor, organik dokuları betonla ustalıkla yoğuruyoruz.
              </p>
            </div>

            <div style={{ width: "100%", maxWidth: "1200px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "4rem", textAlign: "center", padding: "0 5vw" }}>
              {stats.map((stat, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3
                    ref={(el) => {
                      numberRefs.current[index] = el;
                    }}
                    style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-heading), sans-serif", lineHeight: 1 }}
                  >
                    0{stat.suffix}
                  </h3>
                  <p style={{ fontSize: "1.1rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 600 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* YÜZ 2: SERVICES (ALT YÜZ - TAKLA İLE ÖNE ÇIKAR) */}
          <div style={{ position: "absolute", width: "100%", height: "100%", transform: "rotateX(-90deg) translateZ(50vh)", backgroundColor: "var(--background)", backfaceVisibility: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 4vw" }}>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase" }}>Hizmetlerimiz</span>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "var(--font-heading), sans-serif", fontWeight: 800, color: "var(--foreground)", marginTop: "1rem" }}>
                Size Nasıl <span style={{ color: "var(--accent)" }}>Yardımcı Olabiliriz?</span>
              </h2>
            </div>
            
            <div style={{ width: "100%", maxWidth: "1400px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", padding: "0 5vw" }}>
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="service-card"
                  style={{ 
                    padding: "3rem 2rem", 
                    backgroundColor: "rgba(255,255,255,0.03)", 
                    borderRadius: "24px", 
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                  }}
                >
                  <div style={{ color: "var(--accent)", transition: "transform 0.4s ease" }} className="service-icon">
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-heading), sans-serif", color: "var(--foreground)" }}>{service.title}</h3>
                  <p style={{ color: "var(--muted)", lineHeight: 1.6, fontSize: "1rem" }}>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        .service-card:hover {
          background-color: rgba(255,255,255,0.06) !important;
          border-color: var(--accent) !important;
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .service-card:hover .service-icon {
          transform: scale(1.1);
        }
      `}} />
    </section>
  );
}

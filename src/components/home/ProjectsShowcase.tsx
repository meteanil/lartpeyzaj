"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/lib/projects";

// Type definitions for GSAP events
interface GSAPEvent {
  progress: number;
  direction: number;
}

const processSteps = [
  { id: "01", title: "Tasarım & Planlama", desc: "Arazinin ruhunu okur, vizyoner konseptler çizeriz." },
  { id: "02", title: "Sert & Yumuşak Uygulama", desc: "Dayanıklı materyaller ve canlı bitkilerle sahaya ineriz." },
  { id: "03", title: "Sürdürülebilirlik & Bakım", desc: "İlk günkü parıltıyı koruyacak bakım planları sunarız." },
];

const CUBE = 380;
const HALF = CUBE / 2;

export default function ProjectsShowcase({
  preloaderDone,
  projects
}: {
  preloaderDone?: boolean;
  projects: Project[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const foldRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Safe project access
  const defaultProjects: Project[] = [
    {
      id: "00",
      title: "Henüz Proje Eklenmedi",
      slug: "#",
      category: "Sistem Mesajı",
      description: "public/projects içerisine lütfen klasör oluşturup resim ekleyin.",
      coverImage: "/placeholder.jpg",
      gallery: []
    }
  ];

  const safeProjects = projects && projects.length > 0 ? projects : defaultProjects;
  
  // Ana sayfada sergilenecek özel 3 projenin sistem path'leri (slug)
  const desiredSlugs = [
    "hilton-garden-inn-konya",
    "halka-sitesi",
    "arslanturk-insaat-villa"
  ];

  // Sistemden bu projeleri bul
  const customFeatured = desiredSlugs
    .map(slug => safeProjects.find(p => p.slug === slug))
    .filter(Boolean) as Project[];
    
  // Klasör silinmesi veya isim değişikliğine karşı güvenlik duvarı (bulamazsa ilk 3'ü al)
  const baseFeatured = customFeatured.length === 3 ? customFeatured : [
    safeProjects[0],
    safeProjects[1 % safeProjects.length],
    safeProjects[2 % safeProjects.length],
  ];

  // Küpün 4 vizyonu için (3 proje + 1 boşluk rotasyonu)
  const featured = [
    baseFeatured[0],
    baseFeatured[1],
    baseFeatured[2],
    baseFeatured[0],
  ].map(p => ({ ...p, image: p.coverImage || p.gallery?.[0] || "/placeholder.jpg" }));

  useEffect(() => {
    // Hero'nun pin trigger'ı preloaderDone olunca oluşuyor.
    // Bu bileşen de aynı şekilde beklemeli ki pozisyonlar doğru hesaplansın.
    if (!preloaderDone) return;
    gsap.registerPlugin(ScrollTrigger);

    // İlk defa giriliyorsa 3000ms bekle (preloader süresi), yoksa 50ms (scroll koruması için hızlı mount)
    const delay = sessionStorage.getItem("lart_preloader_seen") ? 50 : 3000;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh(); // Hero pin spacer pozisyonlarını yeniden hesapla

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=600%", // Kapı kapanması için %100 daha alan ekledik
          scrub: 1,
          pin: true,
        },
      });

      // Faz 1: Sayfa katlanma geçişi
      tl.fromTo(foldRef.current, { rotateY: 0 }, { rotateY: -90, duration: 1, ease: "power2.inOut" });
      tl.fromTo(contentRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.5);

      // Kapı dısarı açıldıktan sonra içindeki yazıyı yavaşça silelim ki geri kapandığında siyah düz ekran olsun
      tl.to("#foldContent", { opacity: 0, duration: 0.5 }, 1.0);

      // Faz 2-4: Küp dönüşü
      tl.to(cubeRef.current, { rotateY: -90, duration: 1, ease: "power2.inOut" }, 1.5);
      tl.to(cubeRef.current, { rotateY: -180, duration: 1, ease: "power2.inOut" }, 2.5);
      tl.to(cubeRef.current, { rotateY: -270, duration: 1, ease: "power2.inOut" }, 3.5);

      // Faz 5: Kapağı Geri Kapatma
      tl.to(foldRef.current, { rotateY: 0, duration: 1, ease: "power2.inOut" }, 4.5);
      tl.to(contentRef.current, { opacity: 0, scale: 0.9, duration: 0.5 }, 4.5);

      // Süreç adımı güncelleme (Toplam duration = 5.5, end = +=600%)
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=600%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Midpoints for 5.5 duration:
          // Center 1: t=1.5 (p=0.27) -> Mid 1-2: t=2.0 (p=0.36)
          // Center 2: t=2.5 (p=0.45) -> Mid 2-3: t=3.0 (p=0.54)
          // Center 3: t=3.5 (p=0.63) -> Mid 3-4: t=4.0 (p=0.72)
          // Center 4: t=4.5 (p=0.81)
          if (p < 0.36) setActiveStep(0);
          else if (p < 0.54) setActiveStep(1);
          else if (p < 0.72) setActiveStep(2);
          else setActiveStep(3);
        },
      });

      // Pin spacer eklendikten resresh atmak scroll korumasını kalibre eder
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, delay);

    return () => clearTimeout(timer);
  }, [preloaderDone]);

  const face: React.CSSProperties = {
    position: "absolute",
    width: `${CUBE}px`,
    height: `${CUBE}px`,
    borderRadius: "16px",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background)",
      }}
    >
      {/* FOLD PANEL */}
      <div style={{ position: "absolute", inset: 0, perspective: "1500px", zIndex: 20, pointerEvents: "none" }}>
        <div
          ref={foldRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--background)",
            transformOrigin: "right center",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
          }}
        >
          <div id="foldContent" style={{ textAlign: "center", maxWidth: "700px", padding: "0 4vw" }}>
            <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase" }}>Projelerimiz</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", fontFamily: "var(--font-heading), sans-serif", fontWeight: 800, lineHeight: 1.1, color: "var(--foreground)", marginTop: "1rem" }}>
              Doğaya Bıraktığımız <span style={{ color: "var(--accent)" }}>İmzalar.</span>
            </h2>
            <p style={{ color: "var(--muted)", marginTop: "1.5rem", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.6 }}>
               Her projemiz, doğanın ve mimarinin birlikte nefes aldığı bir hikâye.
            </p>
          </div>
        </div>
      </div>

      {/* PROJECTS CONTENT */}
      <div ref={contentRef} className="mobile-col mobile-padding" style={{ width: "100%", height: "100%", position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6vw", gap: "5vw", opacity: 0, zIndex: 10, pointerEvents: "none" }}>
        {/* 3D Küp */}
        <div className="mobile-cube" style={{ width: `${CUBE}px`, height: `${CUBE}px`, perspective: "1200px", flexShrink: 0, position: "relative" }}>
          <div ref={cubeRef} style={{ width: `${CUBE}px`, height: `${CUBE}px`, position: "absolute", inset: 0, transformStyle: "preserve-3d", pointerEvents: "none" }}>
            {/* Yüz 1 */}
            <div style={{ ...face, transform: `translateZ(${HALF}px)`, pointerEvents: "none" }}>
              <Image src={featured[0].image} alt={featured[0].title} fill style={{ objectFit: "cover", pointerEvents: "none" }} unoptimized={featured[0].image.startsWith("http")} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,18,13,0.95) 0%, transparent 50%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", display: "flex", flexDirection: "column", pointerEvents: "none" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", pointerEvents: "none" }}>{featured[0].category}</span>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-heading)", margin: "0.3rem 0", pointerEvents: "none" }}>{featured[0].title}</h3>
                <div style={{ pointerEvents: "none", display: "inline-block", alignSelf: "flex-start" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", display: "inline-block", padding: "10px 10px 10px 0" }}>Detayları İncele →</span>
                </div>
              </div>
            </div>
            {/* Yüz 2 */}
            <div style={{ ...face, transform: `rotateY(90deg) translateZ(${HALF}px)`, pointerEvents: "none" }}>
              <Image src={featured[1].image} alt={featured[1].title} fill style={{ objectFit: "cover", pointerEvents: "none" }} unoptimized={featured[1].image.startsWith("http")} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,18,13,0.95) 0%, transparent 50%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", display: "flex", flexDirection: "column", pointerEvents: "none" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", pointerEvents: "none" }}>{featured[1].category}</span>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-heading)", margin: "0.3rem 0", pointerEvents: "none" }}>{featured[1].title}</h3>
                <div style={{ pointerEvents: "none", display: "inline-block", alignSelf: "flex-start" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", display: "inline-block", padding: "10px 10px 10px 0" }}>Detayları İncele →</span>
                </div>
              </div>
            </div>
            {/* Yüz 3 */}
            <div style={{ ...face, transform: `rotateY(180deg) translateZ(${HALF}px)`, pointerEvents: "none" }}>
              <Image src={featured[2].image} alt={featured[2].title} fill style={{ objectFit: "cover", pointerEvents: "none" }} unoptimized={featured[2].image.startsWith("http")} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,18,13,0.95) 0%, transparent 50%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", display: "flex", flexDirection: "column", pointerEvents: "none" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", pointerEvents: "none" }}>{featured[2].category}</span>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-heading)", margin: "0.3rem 0", pointerEvents: "none" }}>{featured[2].title}</h3>
                <div style={{ pointerEvents: "none", display: "inline-block", alignSelf: "flex-start" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", display: "inline-block", padding: "10px 10px 10px 0" }}>Detayları İncele →</span>
                </div>
              </div>
            </div>
            {/* Yüz 4: Daha Fazlası (Zemin) */}
            <div style={{ ...face, transform: `rotateY(270deg) translateZ(${HALF}px)`, background: "linear-gradient(135deg, rgba(192,215,52,0.12), rgba(13,18,13,0.95))", border: "1px solid rgba(192,215,52,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none" }}>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--foreground)", fontFamily: "var(--font-heading)", marginBottom: "1.5rem", textAlign: "center", pointerEvents: "none" }}>
                  Daha Fazlasını<br /><span style={{ color: "var(--accent)" }}>Keşfet</span>
                </h3>
                <div style={{ pointerEvents: "none", display: "inline-block" }}>
                  <span style={{ padding: "0.8rem 2.2rem", border: "2px solid var(--accent)", color: "var(--accent)", borderRadius: "40px", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                    Tüm Projelerimiz →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SIFIR 3D - 100% 2D GÖRÜNMEZ TIKLAMA KATMANI (KULLANICI HARİKA FİKRİ) */}
          <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 9999, pointerEvents: "none", transform: `translateZ(${HALF + 1}px)` }}>
            {activeStep < 3 ? (
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", visibility: "hidden" }}>{featured[activeStep].category}</span>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", margin: "0.3rem 0", visibility: "hidden" }}>{featured[activeStep].title}</h3>
                <div style={{ display: "inline-block", alignSelf: "flex-start" }}>
                  <Link href={`/projects/${featured[activeStep].slug}`} style={{ fontSize: "0.85rem", fontWeight: 600, display: "inline-block", padding: "10px 10px 10px 0", cursor: "pointer", pointerEvents: "auto", opacity: 0 }}>
                    Detayları İncele →
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: "1.5rem", textAlign: "center", visibility: "hidden" }}>
                  Daha Fazlasını<br />Keşfet
                </h3>
                <div style={{ display: "inline-block" }}>
                  <Link href="/projects" style={{ padding: "0.8rem 2.2rem", border: "2px solid transparent", borderRadius: "40px", fontSize: "0.95rem", fontWeight: 700, display: "inline-block", cursor: "pointer", pointerEvents: "auto", opacity: 0 }}>
                    Tüm Projelerimiz →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Süreç Adımları */}
        <div style={{ flex: "0 0 35%", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ marginBottom: "0.8rem" }}>
            <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase" }}>Çalışma Sürecimiz</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--foreground)", marginTop: "0.5rem", lineHeight: 1.1 }}>
              Her Proje Bir<br /><span style={{ color: "var(--accent)" }}>Yolculuktur.</span>
            </h2>
          </div>
          {processSteps.map((step, idx) => (
            <div key={step.id} style={{
              padding: "1.2rem 1.5rem", borderRadius: "12px",
              border: `1px solid ${activeStep === idx ? "rgba(192,215,52,0.4)" : "rgba(244,246,240,0.06)"}`,
              backgroundColor: activeStep === idx ? "rgba(192,215,52,0.08)" : "rgba(244,246,240,0.02)",
              transition: "all 0.5s ease",
              transform: activeStep === idx ? "translateX(10px)" : "translateX(0)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: `2px solid ${activeStep === idx ? "var(--accent)" : "rgba(244,246,240,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, color: activeStep === idx ? "var(--accent)" : "var(--muted)", fontFamily: "var(--font-heading)", transition: "all 0.5s ease" }}>{step.id}</div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: activeStep === idx ? "var(--foreground)" : "var(--muted)", transition: "color 0.5s ease" }}>{step.title}</h4>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5, opacity: activeStep === idx ? 1 : 0.5, transition: "opacity 0.5s ease", paddingLeft: "44px" }}>{step.desc}</p>
            </div>
          ))}
          <div style={{ marginTop: "0.5rem", paddingLeft: "4px", display: "flex", gap: "6px", alignItems: "center" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: activeStep === i ? "28px" : "8px", height: "6px", borderRadius: "3px", backgroundColor: activeStep === i ? "var(--accent)" : "rgba(244,246,240,0.15)", transition: "all 0.4s ease" }} />
            ))}
            <span style={{ marginLeft: "10px", color: "var(--muted)", fontSize: "0.75rem", fontWeight: 600 }}>
              {activeStep < 3 ? `${activeStep + 1} / 3 Proje` : "Portfolyo"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

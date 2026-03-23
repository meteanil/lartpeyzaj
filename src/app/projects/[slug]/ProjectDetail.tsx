"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectVideos } from "@/lib/projectVideos";

export default function ProjectDetail({ project }: { project: any }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();

    // Hero image parlama / büyüme efekti
    tl.fromTo(
      heroRef.current,
      { scale: 1.1, filter: "brightness(0.5)" },
      { scale: 1, filter: "brightness(1)", duration: 1.6, ease: "power2.out" }
    )
      // Bilgi Bloğu yukarı kayma
      .fromTo(
        infoRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

    // Galeri resimleri ScrollTrigger ile sırayla fade-in
    if (galleryRef.current && galleryRef.current.children) {
      gsap.fromTo(
        galleryRef.current.children,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* 1. KISIM: DEV HERO KAPAK (1. Resim) */}
      <div
        style={{
          width: "100%",
          height: "85vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div ref={heroRef} style={{ width: "100%", height: "100%" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
            priority
          />
        </div>
        {/* Lüks Karartma (Gradient Overlay) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(6,7,6,0.2) 0%, var(--background) 100%)",
          }}
        />
        {/* Geri Butonu Düzenlemesi */}
        <Link
          href="/projects"
          style={{
            position: "absolute",
            top: "clamp(100px, 12vh, 140px)",
            left: "5vw",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8rem",
            fontSize: "0.95rem",
            color: "var(--foreground)",
            fontWeight: 600,
            padding: "0.8rem 1.5rem",
            borderRadius: "100px",
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            zIndex: 10,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent)";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "var(--foreground)";
          }}
        >
          ← Master Galeriye Dön
        </Link>
      </div>

      {/* 2. KISIM: PROJE BİLGİLERİ VE METİNLER */}
      <div
        ref={infoRef}
        style={{
          maxWidth: "1400px",
          margin: "-20vh auto 0",
          padding: "0 5vw",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div style={{ 
          backgroundColor: "#060706", 
          borderRadius: "32px", 
          padding: "4rem 5%", 
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
        }}>
          {/* Üst Etiketler */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", color: "#000", backgroundColor: "var(--accent)", fontWeight: 700, padding: "0.5rem 1.2rem", borderRadius: "100px" }}>
              {project.category}
            </span>
            <span style={{ fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--muted)", padding: "0.5rem 1.2rem", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)" }}>
              {project.year}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
             <div>
               <h1 style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--foreground)"}}>
                 {project.title}
               </h1>
               <p style={{ fontSize: "1.1rem", color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                 {project.location}
               </p>
             </div>
             <div style={{ display: "flex", alignItems: "center" }}>
               <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", lineHeight: 1.8, color: "var(--muted)" }}>
                 {project.details || project.description}
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* VIDEO BÖLÜMÜ */}
      {projectVideos[project.slug] && projectVideos[project.slug].length > 0 && (
        <div style={{ maxWidth: "1600px", margin: "6rem auto", padding: "0 5vw" }}>
          <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: "3rem", color: "var(--foreground)", textAlign: "center" }}>
            Proje <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Videoları.</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
            {projectVideos[project.slug].map((videoUrl: string, index: number) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: videoUrl.includes("shorts") ? "177%" : "56.25%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: "#060706",
                }}
              >
                <iframe
                  src={videoUrl}
                  title={`${project.title} Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "24px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOTOĞRAF GALERİSİ */}
      <div style={{ maxWidth: "1600px", margin: "6rem auto", padding: "0 5vw" }}>
        <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: "3rem", color: "var(--foreground)", textAlign: "center" }}>
          Proje <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Görselleri.</span>
        </h3>
        
        {project.gallery && project.gallery.length > 0 ? (
          <div 
            ref={galleryRef}
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
              gap: "2rem" 
            }}
          >
            {project.gallery.map((imgUrl: string, index: number) => {
              // Eğer 4 resim varsa 2x2 harika durur. Sadece indexlerine göre asimetrik yükseklik verebiliriz.
              // Tek sayı resimler daha uzun (700px), çift sayılar daha kısa (500px) estetik bir masonry hissi verir.
              const height = index % 2 === 0 ? "600px" : "450px";
              
              return (
                <div 
                  key={index} 
                  style={{ 
                    position: "relative", 
                    width: "100%", 
                    height: height, 
                    borderRadius: "24px", 
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} Galeri ${index + 1}`}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                    unoptimized
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "var(--muted)", padding: "4rem 0", fontStyle: "italic" }}>
            Bu projeye ait ekstra detay görseli bulunamadı. Klasöre fazladan resim atarak burayı doldurabilirsiniz.
          </div>
        )}
      </div>

      {/* 4. KISIM: ÇAĞRI (CTA) */}
      <div style={{ textAlign: "center", padding: "6rem 5vw", marginTop: "4rem", borderTop: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#040504" }}>
        <h3 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: "1.5rem" }}>
          Sizin Projenizi Tasarlamaya <span style={{ color: "var(--accent)" }}>Hazırız.</span>
        </h3>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
          L'art Peyzaj Mimarlık kalitesiyle arazinizi zamansız bir sanat eserine dönüştürün. Ücretsiz ön keşif için ofisimizle doğrudan iletişime geçin.
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            padding: "1.2rem 3rem",
            backgroundColor: "var(--accent)",
            color: "#000",
            borderRadius: "100px",
            fontWeight: 800,
            fontSize: "1.1rem",
            fontFamily: "var(--font-heading), sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            boxShadow: "0 10px 30px rgba(163,204,57,0.2)"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Ofisi Arayın
        </Link>
      </div>

    </main>
  );
}

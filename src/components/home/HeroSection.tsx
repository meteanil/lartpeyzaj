"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomePageSettings } from "@/lib/projects";

export default function HeroSection({ preloaderDone, home }: { preloaderDone: boolean, home: HomePageSettings }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  const geoBoxRef = useRef<HTMLDivElement>(null);
  const geoBoxInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderDone) return;
    gsap.registerPlugin(ScrollTrigger);

    // Sayfa her yüklendiğinde metinlerin başlangıç pozisyonunu gizli tut ki aniden gelmesin.
    gsap.set(heroRef.current, { visibility: "visible" });
    gsap.set(title1Ref.current, { yPercent: 100 });
    gsap.set(title2Ref.current, { yPercent: 100 });
    
    // geoBox class bazlı responsive yönetildiği için sadece gereksiz scale ve translate komutunu varsayılan yaparız.
    if (geoBoxRef.current) {
        gsap.set(geoBoxRef.current, { opacity: 0, transform: "translateY(-50%) rotate(-45deg)" });
    }

    // Basit ve Smooth Tanıtım Animasyonları
    const heroTl = gsap.timeline();
    heroTl
      .to(title1Ref.current, { yPercent: 0, duration: 1.2, ease: "power4.out", delay: 0.1 })
      .to(title2Ref.current, { yPercent: 0, duration: 1.2, ease: "power4.out" }, "-=0.9")
      .to(geoBoxRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.8");

    // Scroll Pin / Expand Animation
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    pinTl
      .to(geoBoxRef.current, {
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: "auto",
        xPercent: 0,
        yPercent: 0,
        borderRadius: "0px",
        transform: "translateY(0%) rotate(0deg)", // inline inline property overriding
        duration: 1,
        ease: "power2.inOut",
      })
      .fromTo(
        [title1Ref.current, title2Ref.current],
        { opacity: 1, y: 0 },
        { opacity: 0, y: -60, duration: 0.5, stagger: 0.05, ease: "power2.in" },
        0
      )
      .fromTo(
        geoBoxInnerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        geoBoxInnerRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.3 }
      )
      .fromTo(
        geoBoxRef.current,
        { scale: 1, borderRadius: "0px", opacity: 1 },
        { scale: 0.15, borderRadius: "50%", opacity: 0, duration: 0.5, ease: "power2.in" }
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [preloaderDone]);

  return (
    <>
      <style>{`
        .hero-geo-box {
          position: absolute;
          right: 8vw;
          top: 50%;
          transform: translateY(-50%) rotate(-45deg);
        }
        @media (max-width: 768px) {
          .hero-geo-box {
            right: -25vw;
            top: 85%;
          }
        }
      `}</style>
      
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 8vw",
          position: "relative",
          overflow: "hidden",
          visibility: "hidden",
        }}
      >
        {/* Z-Index 10 ve Position Relative ekleyerek her daim en üstte (yeşil kutudan önde) olmasını garantiliyoruz */}
        <div style={{ flex: 1, zIndex: 10, position: "relative" }}>
          <div style={{ overflow: "hidden", paddingBottom: "10px" }}>
            <h1
              ref={title1Ref}
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                lineHeight: 1,
                fontWeight: 800,
                fontFamily: "var(--font-heading), sans-serif",
              }}
            >
              {home.heroTitle.split(" ")[0]}
            </h1>
          </div>
          <div style={{ overflow: "hidden", paddingBottom: "10px" }}>
            <h1
              ref={title2Ref}
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                lineHeight: 1,
                fontWeight: 800,
                fontFamily: "var(--font-heading), sans-serif",
                color: "var(--accent)",
              }}
            >
              {home.heroTitle.split(" ").slice(1).join(" ")}
            </h1>
          </div>
        </div>

        <div
          ref={geoBoxRef}
          className="hero-geo-box"
          style={{
            width: "clamp(250px, 35vw, 450px)",
            height: "clamp(250px, 35vw, 450px)",
            backgroundColor: "var(--accent)",
            borderRadius: "24px",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            boxShadow: "0 0 120px rgba(192, 215, 52, 0.15)",
          }}
        >
          <div
            ref={geoBoxInnerRef}
            style={{
              opacity: 0,
              textAlign: "center",
              padding: "3rem",
              color: "var(--background)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 4rem)",
                fontWeight: 800,
                fontFamily: "var(--font-heading), sans-serif",
                lineHeight: 1.2,
              }}
            >
              {home.heroSubtitle.split(". ")[0]}.
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                opacity: 0.7,
                maxWidth: "500px",
                margin: "1.5rem auto 0",
              }}
            >
              {home.heroSubtitle.split(". ").slice(1).join(". ")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

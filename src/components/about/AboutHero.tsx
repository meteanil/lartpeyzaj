"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { y: 100, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out", delay: 0.5 }
    );

    tl.fromTo(
      pRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    // Subtle parallax on scroll
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        gsap.to(containerRef.current, { y: scrolled * 0.3, ease: "none", duration: 0 });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", padding: "0 5vw" }}>
      {/* Background Ambience */}
      <div 
        style={{ 
          position: "absolute", 
          inset: 0, 
          background: "radial-gradient(circle at 70% 30%, rgba(163,204,57,0.06) 0%, rgba(0,0,0,0) 60%)",
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      <div ref={containerRef} style={{ position: "relative", zIndex: 1, maxWidth: "1200px", marginTop: "5rem" }}>
        <span style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase", display: "block", marginBottom: "1.5rem" }}>
          Hikayemiz
        </span>
        
        <h1 
          ref={textRef}
          style={{ 
            fontSize: "clamp(3rem, 7vw, 6.5rem)", 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: 800, 
            lineHeight: 1.1, 
            color: "var(--foreground)",
            marginBottom: "2.5rem",
            opacity: 0
          }}
        >
          Doğanın İzini<br />
          Şehre <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Kazıyoruz.</span>
        </h1>

        <p 
          ref={pRef}
          style={{ 
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)", 
            color: "var(--muted)", 
            maxWidth: "600px", 
            lineHeight: 1.8,
            opacity: 0
          }}
        >
          Mekanın kendi ruhunu dinleyerek, estetikle mühendisliğin birleştiği o altın noktayı buluyoruz. Her bahçe bir şiir, her peyzaj projesi yaşam boyu nefes alan bir ekosistemdir.
        </p>
      </div>

      {/* GSAP Native Scroll Indicator */}
      <div style={{ position: "absolute", bottom: "4rem", left: "5vw", display: "flex", alignItems: "center", gap: "1rem", zIndex: 2 }}>
        <div style={{ width: "1px", height: "60px", backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden", position: "relative" }}>
           <div style={{ width: "100%", height: "30%", backgroundColor: "var(--accent)", animation: "scrollDown 2s infinite ease-in-out" }} />
        </div>
        <span style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--muted)", transform: "rotate(-90deg)", transformOrigin: "left center", marginBottom: "-40px" }}>Keşfet</span>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
      `}} />
    </section>
  );
}

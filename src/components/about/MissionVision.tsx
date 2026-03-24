"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutPageSettings } from "@/lib/projects";

export default function MissionVision({ about }: { about: AboutPageSettings }) {
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
            {about.missionTitle}
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            {about.missionText}
          </p>
        </div>

        {/* VİZYON */}
        <div className="mv-card" style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: "clamp(2.5rem, 5vw, 4rem)", borderRadius: "32px", border: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
          <div style={{ position: "absolute", top: "2rem", right: "2rem", opacity: 0.05, fontSize: "6rem", fontWeight: 900, lineHeight: 0.8, color: "var(--foreground)"}}>V</div>
          <span style={{ fontSize: "1rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px" }}>Vizyonumuz</span>
          <h3 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontFamily: "var(--font-heading)", fontWeight: 800, marginTop: "1.5rem", marginBottom: "1.5rem", color: "var(--foreground)" }}>
            {about.visionTitle}
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            {about.visionText}
          </p>
        </div>

      </div>
    </section>
  );
}

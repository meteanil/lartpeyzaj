"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutPageSettings } from "@/lib/projects";

export default function AboutSection({ about }: { about: AboutPageSettings }) {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRefs.current.length > 0) {
      gsap.fromTo(
        textRefs.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10vw 8vw",
        backgroundColor: "var(--background)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "800px", textAlign: "center" }}>
        <h2
          ref={(el) => { textRefs.current[0] = el; }}
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "var(--foreground)",
            marginBottom: "2rem",
          }}
        >
          {about.aboutTitle.split(" ")[0]} <span style={{ color: "var(--accent)" }}>{about.aboutTitle.split(" ")[1]}</span> {about.aboutTitle.split(" ").slice(2).join(" ")}
        </h2>
        
        <p
          ref={(el) => { textRefs.current[1] = el; }}
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
            lineHeight: 1.6,
            color: "var(--muted)",
            fontWeight: 400,
            marginBottom: "3rem",
          }}
        >
          {about.aboutText1}
        </p>

        <p
          ref={(el) => { textRefs.current[2] = el; }}
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            lineHeight: 1.8,
            color: "var(--foreground)",
            opacity: 0.8,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {about.aboutText2}
        </p>
      </div>
    </section>
  );
}

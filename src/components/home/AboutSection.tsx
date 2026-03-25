"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomePageSettings } from "@/lib/projects";

export default function AboutSection({ home }: { home: HomePageSettings }) {
  const sectionRef = useRef<HTMLElement>(null);
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
            trigger: sectionRef.current,
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
      ref={sectionRef}
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
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontFamily: "var(--font-heading), sans-serif", fontWeight: 800, lineHeight: 1.2, color: "var(--foreground)", marginBottom: "2rem" }}
        >
           {home.aboutTitle?.split(" ").slice(0, -1).join(" ")} <br />
           <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{home.aboutTitle?.split(" ").slice(-1)}</span>
        </h2>
        <p
          ref={(el) => { textRefs.current[1] = el; }}
          style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}
        >
          {home.aboutText1}
        </p>
        <p
          ref={(el) => { textRefs.current[2] = el; }}
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            lineHeight: 1.8,
            color: "var(--foreground)",
            opacity: 0.8,
            maxWidth: "600px",
          }}
        >
          {home.aboutText2}
        </p>
      </div>
    </section>
  );
}

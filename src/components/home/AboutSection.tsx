"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
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
          Form ile <span style={{ color: "var(--accent)" }}>Fonksiyonu</span> Birleştiriyoruz.
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
          Sadece bitki dikmiyoruz; yaşayan, nefes alan ve zamanla olgunlaşan ekosistemler kuruyoruz. Peşinde olduğumuz şey doğanın kendi mükemmelliğini modern insanın yaşam alanlarına saygıyla taşıyabilmek.
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
          Konya merkezli firmamızda, hem bireysel ölçekli teras ve villalar hem de endüstriyel devasa ölçekli fabrikalar için prestij odaklı anahtar teslim proje hizmeti veriyoruz. Keşiften son çim biçmeye kadar sürecin her saniyesinde yanınızdayız.
        </p>
      </div>
    </section>
  );
}

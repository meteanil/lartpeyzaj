"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FAQ({ title, faqs }: { title: string, faqs: { q: string, a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // İlk baştaki açık
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(
        ".faq-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  // Split title manually slightly if needed, or simply render it.
  const titleWords = title?.split(" ") || ["Sıkça Sorulan", "Sorular."];
  const firstPart = titleWords.length > 1 ? titleWords.slice(0, -1).join(" ") : titleWords[0];
  const lastPart = titleWords.length > 1 ? titleWords[titleWords.length - 1] : "";

  return (
    <section ref={sectionRef} style={{ padding: "6rem 5vw 10rem 5vw", backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: "4rem", textAlign: "center", color: "var(--foreground)"}}>
          {firstPart} <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{lastPart}</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="faq-item"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                style={{ 
                  backgroundColor: isOpen ? "rgba(255,255,255,0.02)" : "transparent",
                  border: "1px solid", 
                  borderColor: isOpen ? "rgba(163,204,57,0.3)" : "rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "all 0.4s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: isOpen ? "var(--accent)" : "var(--foreground)", paddingRight: "2rem", margin: 0, lineHeight: 1.4 }}>
                     {faq.q}
                   </h4>
                   <div style={{ 
                     width: "40px", 
                     height: "40px", 
                     flexShrink: 0, 
                     borderRadius: "50%", 
                     border: "1px solid", 
                     borderColor: isOpen ? "var(--accent)" : "rgba(255,255,255,0.2)",
                     display: "flex", 
                     alignItems: "center", 
                     justifyContent: "center",
                     color: isOpen ? "var(--accent)" : "rgba(255,255,255,0.5)",
                     transition: "all 0.3s ease"
                   }}>
                     <span style={{ fontSize: "1.5rem", fontWeight: 300, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.4s ease" }}>
                       +
                     </span>
                   </div>
                </div>
                
                <div style={{ 
                  maxHeight: isOpen ? "300px" : "0", 
                  overflow: "hidden", 
                  transition: "max-height 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease", 
                  opacity: isOpen ? 1 : 0 
                }}>
                  <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, marginTop: "1.5rem", margin: "1.5rem 0 0 0", paddingRight: "10%" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

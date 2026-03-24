"use client";

import { useState } from "react";
import { HomePageSettings } from "@/lib/projects";

export default function ServicesSection({ home }: { home: HomePageSettings }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .services-container {
            padding: 4rem 5vw !important;
          }
          .services-accordion {
            flex-direction: column !important;
            height: 90vh !important; /* Dikeyde yer aç */
          }
          .accordion-item {
            /* Dikey akordiyonda esneme oranı */
            min-height: 60px !important;
          }
          .accordion-inactive-text {
            flex-direction: row !important;
            align-items: center !important;
            padding: 0 1.5rem !important;
            justify-content: flex-start !important;
          }
          .accordion-inactive-title {
            writing-mode: horizontal-tb !important;
            transform: none !important;
            margin-top: 0 !important;
            margin-left: 1rem !important;
          }
          .accordion-active-content {
            bottom: 2rem !important;
            left: 1.5rem !important;
            right: 1.5rem !important;
          }
          .accordion-active-title {
            font-size: 1.8rem !important;
            margin-bottom: 0.5rem !important;
          }
          .accordion-active-desc {
            font-size: 0.95rem !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
      <section className="services-container" style={{ backgroundColor: "var(--background)", padding: "8rem 5vw", overflow: "hidden" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          
          <div style={{ marginBottom: "5rem", textAlign: "center" }}>
             <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase" }}>Hizmetlerimiz</span>
             <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "var(--font-heading), sans-serif", fontWeight: 800, color: "var(--foreground)", marginTop: "1rem" }}>
               Mükemmelliği <span style={{ color: "var(--accent)" }}>İnşa Ediyoruz.</span>
             </h2>
          </div>

          {/* Accordion Container */}
          <div 
             className="services-accordion"
             style={{ 
               display: "flex", 
               height: "60vh", 
               minHeight: "500px",
               width: "100%", 
               gap: "1.5rem" 
             }}
          >
            {home.services.map((srv, index) => {
              const isActive = active === index;
              
              return (
                <div
                  key={srv.id}
                  className="accordion-item"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                  style={{
                    flex: isActive ? 6 : 1,
                    background: srv.bg,
                    borderRadius: "32px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "flex 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
                    opacity: isActive ? 1 : 0.5,
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive ? "0 30px 60px rgba(0,0,0,0.6)" : "none",
                  }}
                >
                  {/* INACTIVE STATE */}
                  <div 
                    className="accordion-inactive-text"
                    style={{
                      position: "absolute", 
                      inset: 0,
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center", 
                      justifyContent: "flex-start",
                      paddingTop: "2.5rem",
                      opacity: isActive ? 0 : 1,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none"
                    }}
                  >
                     <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "rgba(255,255,255,0.2)" }}>
                       {srv.id}
                     </span>
                     <div 
                       className="accordion-inactive-title"
                       style={{ 
                         marginTop: "2.5rem", 
                         writingMode: "vertical-rl", 
                         transform: "rotate(180deg)", 
                         fontWeight: 700, 
                         letterSpacing: "4px", 
                         textTransform: "uppercase", 
                         color: "rgba(255,255,255,0.6)", 
                         whiteSpace: "nowrap" 
                       }}
                     >
                       {srv.title}
                     </div>
                  </div>

                  {/* ACTIVE STATE */}
                  <div style={{ position: "absolute", top: "2.5rem", right: "3rem" }}>
                     <span style={{ 
                       fontSize: "clamp(4rem, 8vw, 6rem)", 
                       fontWeight: 900, 
                       color: "var(--background)", 
                       WebkitTextStroke: "1px var(--accent)", 
                       opacity: isActive ? 0.2 : 0,
                       transition: "opacity 0.5s ease"
                     }}>
                       {srv.id}
                     </span>
                  </div>

                  <div 
                    className="accordion-active-content"
                    style={{ 
                      position: "absolute", 
                      bottom: "3rem", 
                      left: "3rem", 
                      right: "3rem",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(20px)",
                      transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.2s",
                      pointerEvents: isActive ? "auto" : "none"
                    }}
                  >
                    <h3 
                      className="accordion-active-title"
                      style={{ 
                        fontSize: "clamp(2rem, 3.5vw, 3rem)", 
                        fontWeight: 800, 
                        fontFamily: "var(--font-heading)", 
                        marginBottom: "1.5rem", 
                        color: "var(--foreground)" 
                      }}
                    >
                      {srv.title}
                    </h3>
                    <p 
                      className="accordion-active-desc"
                      style={{ 
                        color: "rgba(255,255,255,0.7)", 
                        fontSize: "clamp(1rem, 1.2vw, 1.25rem)", 
                        lineHeight: 1.6, 
                        maxWidth: "600px" 
                      }}
                    >
                      {srv.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

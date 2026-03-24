"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ContactPageSettings } from "@/lib/projects";

export default function ContactInfoGrid({ contact }: { contact?: ContactPageSettings }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".contact-grid-item",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.1 }
      );
    }
  }, []);

  return (
    <section style={{ paddingTop: "14rem", paddingBottom: "8rem", paddingLeft: "5vw", paddingRight: "5vw", position: "relative" }}>
      <style>{`.contact-grid-item { opacity: 0; }`}</style>
      {/* Ambient Glow */}
      <div style={{ position: "absolute", top: 0, left: "20%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(163,204,57,0.04) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      
      <div ref={containerRef} style={{ maxWidth: "1600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h1 className="contact-grid-item" style={{ fontSize: "clamp(3.5rem, 6vw, 6.5rem)", fontFamily: "var(--font-heading)", fontWeight: 800, lineHeight: 1.1, marginBottom: "5rem", color: "var(--accent)"}}>
          Buradayız.<br/>
          <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", display: "block", marginTop: "1rem", letterSpacing: "1px" }}>Sıcacık kahvemizi içmeye bekleriz.</span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem" }}>
          
          {/* Merkez Ofis Kartı */}
          <div className="contact-grid-item" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "32px", padding: "4rem 3rem", transition: "transform 0.4s, border-color 0.4s", cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
             <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent)", marginBottom: "2rem", fontFamily: "var(--font-heading)" }}>Merkez Ofisimiz</h3>
             <p style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>L'art Peyzaj Mimarlık</p>
             <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
                {contact?.address || "Nişantaş, İkra Sk. Nasip Sit. No:1/c B Blok, 42090 Selçuklu / Konya"}
             </p>
             <a href={contact?.mapLink || "https://maps.app.goo.gl/xDZ6jpDK7W6NJdpF6"} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: "1rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", borderBottom: "2px solid var(--accent)", paddingBottom: "0.3rem" }}>Yol Tarifi Al</a>
          </div>

          {/* Çalışma Saatleri Kartı */}
          <div className="contact-grid-item" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "32px", padding: "4rem 3rem", transition: "transform 0.4s, border-color 0.4s", cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
             <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent)", marginBottom: "2.5rem", fontFamily: "var(--font-heading)" }}>Çalışma Saatleri</h3>
             
             {contact?.workingHours?.map((wh, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1.2rem", marginBottom: "1.2rem" }}>
                  <span style={{ color: "var(--muted)", fontSize: "1.1rem" }}>{wh.days}</span>
                  <span style={{ color: wh.hours.toLowerCase().includes("kapalı") ? "var(--accent)" : "var(--foreground)", fontWeight: 700, fontSize: "1.1rem" }}>{wh.hours}</span>
                </div>
             ))}
          </div>

          {/* Aksiyon Çağrısı (Call to Action) */}
          <div className="contact-grid-item" style={{ backgroundColor: "var(--accent)", borderRadius: "32px", padding: "4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "0 30px 60px rgba(163,204,57,0.15)", transition: "transform 0.4s, boxShadow 0.4s", cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 40px 80px rgba(163,204,57,0.25)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 30px 60px rgba(163,204,57,0.15)"; }}>
             <h3 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#000", marginBottom: "1.5rem", fontFamily: "var(--font-heading)", lineHeight: 1.1 }}>Hemen Bizi<br/>Arayın.</h3>
             <p style={{ color: "rgba(0,0,0,0.7)", fontSize: "1.15rem", marginBottom: "2.5rem", fontWeight: 500, lineHeight: 1.6 }}>
               Projeleriniz hakkında detaylı görüşmek veya arazinizde keşif planlamak için doğrudan merkez ofisimizi arayabilirsiniz.
             </p>
             <a href={`tel:${contact?.phone?.replace(/\\s/g, '') || "+905313436612"}`} style={{ color: "#000", textDecoration: "none", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, fontFamily: "var(--font-heading)", display: "block" }}>
               {contact?.phone || "0531 343 66 12"}
             </a>
          </div>

        </div>
      </div>
    </section>
  );
}

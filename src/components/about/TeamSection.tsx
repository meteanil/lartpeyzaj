"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const team = [
  {
    id: 1,
    name: "Mete Anıl Küçük",
    role: "Kurucu & Peyzaj Mimarı",
    desc: "7 yıllık tecrübesiyle L'art Peyzaj'ın vizyonunu şekillendiriyor. Modern ve sürdürülebilir tasarımların baş mimarı olarak doğaya estetik dokunuşlar katıyor.",
    bg: "linear-gradient(to top, rgba(163,204,57,0.1), rgba(0,0,0,0.5))",
    image: "/ekip/mete-anil.jpeg"
  },
  {
    id: 2,
    name: "Berkan Koca",
    role: "Kurucu & Peyzaj Mimarı",
    desc: "7 yıllık saha ve tasarım tecrübesiyle projelerin kusursuz uygulanmasına liderlik ediyor. Estetik vizyonu, mühendislik disipliniyle harmanlıyor.",
    bg: "linear-gradient(to top, rgba(255,255,255,0.05), rgba(0,0,0,0.5))",
    image: "/ekip/berkan.jpeg"
  },
  {
    id: 3,
    name: "Mehmet Ozan Aktürk",
    role: "Peyzaj Mimarı & Tasarım Müdürü",
    desc: "7 yıllık tecrübesiyle yenilikçi peyzaj konseptlerine hayat veriyor. Tasarım sürecinin her aşamasında sanatsal yaklaşımıyla ekibe ilham kaynağı oluyor.",
    bg: "linear-gradient(to top, rgba(255,255,255,0.05), rgba(0,0,0,0.5))",
    image: "/ekip/ozan-akturk.jpg"
  }
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(
        ".team-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "10rem 5vw", backgroundColor: "var(--background)", overflow: "hidden" }}>
      
      <div style={{ textAlign: "center", marginBottom: "6rem" }}>
         <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase" }}>Ekibimiz</span>
         <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontFamily: "var(--font-heading), sans-serif", fontWeight: 800, color: "var(--foreground)", marginTop: "1rem" }}>
           Yaratıcı <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Zihinler.</span>
         </h2>
      </div>

      <div style={{ maxWidth: "1600px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
        
        {team.map((member) => (
           <div 
             key={member.id} 
             className="team-card"
             style={{ 
               backgroundColor: "#060706", 
               borderRadius: "24px", 
               padding: "3rem 2rem", 
               border: "1px solid rgba(255,255,255,0.04)",
               position: "relative",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               textAlign: "center",
               transition: "transform 0.4s, border-color 0.4s",
               cursor: "pointer"
             }}
             onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.borderColor = "rgba(163,204,57,0.3)";
             }}
             onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
             }}
           >
             {/* Profil Çerçevesi */}
             <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: member.bg, marginBottom: "2rem", border: "2px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} unoptimized />
                ) : (
                  <span style={{ fontSize: "2rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)" }}>
                     {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                )}
             </div>
             
             <h4 style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--foreground)", marginBottom: "0.5rem" }}>
               {member.name}
             </h4>
             <span style={{ color: "var(--accent)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
               {member.role}
             </span>
             <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
               {member.desc}
             </p>
           </div>
        ))}
        
      </div>
    </section>
  );
}

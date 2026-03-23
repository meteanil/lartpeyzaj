"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { label: "Tamamlanan Proje", value: 20, suffix: "+", prefix: "" },
  { label: "Yıllık Tecrübe", value: 7, suffix: "+", prefix: "" },
  { label: "Müşteri Memnuniyeti", value: 100, suffix: "", prefix: "%" },
  { label: "Uzman Ekip Üyesi", value: 3, suffix: "+", prefix: "" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        numberRefs.current.forEach((el, index) => {
          if (!el) return;
          const target = { val: 0 };
          gsap.to(target, {
            val: stats[index].value,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: function () {
              // SADECE RAKAMI DEĞİŞTİRİYORUZ (React'in DOM ağacını bozmamak için)
              el.innerText = Math.floor(target.val).toString();
            },
          });
        });
      },
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "10rem 5vw",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderTop: "1px solid rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "4rem",
          textAlign: "center",
        }}
      >
        {stats.map((stat, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3
              style={{
                fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                fontWeight: 800,
                color: "var(--accent)",
                fontFamily: "var(--font-heading), sans-serif",
                lineHeight: 1,
              }}
            >
              {/* React DOM'u bozmamak için string manipülasyonu parçalara ayrıldı */}
              {stat.prefix}
              <span
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
              >
                0
              </span>
              {stat.suffix}
            </h3>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontWeight: 600,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("lart_cookie_consent");
    if (!consent) {
      // Small delay to not overwhelm the initial load sequence
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        "#cookie-banner",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem("lart_cookie_consent", "accepted");
    gsap.to("#cookie-banner", {
      yPercent: 120,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => setIsVisible(false)
    });
  };

  const handleReject = () => {
    localStorage.setItem("lart_cookie_consent", "rejected");
    gsap.to("#cookie-banner", {
      yPercent: 120,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => setIsVisible(false)
    });
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-banner"
      style={{
        position: "fixed",
        bottom: "2vw",
        left: "2vw",
        right: "2vw",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "rgba(10, 11, 10, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(163, 204, 57, 0.2)",
        borderRadius: "20px",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        zIndex: 99999,
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h4 style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700 }}>
          Çerez (Cookie) Kullanımı
        </h4>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
          Web sitemizde, size en iyi ve kişiselleştirilmiş dijital deneyimi sunabilmek için çerezler (cookies) kullanıyoruz. 
          Kişisel verileriniz, 6698 Sayılı KVKK kapsamında işlenmektedir. Detaylı bilgi için <Link href="/cerez-politikasi" style={{ color: "var(--accent)", textDecoration: "underline" }}>Çerez Politikamızı</Link> ve <Link href="/kvkk" style={{ color: "var(--accent)", textDecoration: "underline" }}>Aydınlatma Metnimizi</Link> inceleyebilirsiniz.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "flex-end" }}>
        <button
          onClick={handleReject}
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "var(--foreground)",
            borderRadius: "10px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        >
          Sadece Zorunlular
        </button>

        <button
          onClick={handleAccept}
          style={{
            padding: "0.8rem 2rem",
            backgroundColor: "var(--accent)",
            border: "1px solid var(--accent)",
            color: "#000",
            borderRadius: "10px",
            fontWeight: 800,
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(163,204,57,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Tümünü Kabul Et
        </button>
      </div>
    </div>
  );
}

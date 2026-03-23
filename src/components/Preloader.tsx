"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false); // Animasyonun sadece 1 kez çalışmasını garantiler

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Zaten çalıştıysa tekrar çalıştırma
    if (hasRun.current) return;
    hasRun.current = true;

    // Anasayfaya "Geri" tuşuyla dönüldüğünde tekrar preloader izletmemek için:
    if (sessionStorage.getItem("lart_preloader_seen")) {
      onCompleteRef.current();
      return;
    }
    sessionStorage.setItem("lart_preloader_seen", "true");

    const tl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current();
      },
    });

    // 1. Küp dönme animasyonu
    tl.to(cubeRef.current, {
      rotation: 360,
      duration: 1.5,
      ease: "power2.inOut",
    })
      // 2. Küp küçülerek kaybolur
      .to(cubeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      })
      // 3. Logo yazısı aşağıdan maskelenerek belirir
      .fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      // Biraz bekle (kullanıcı okusun diye)
      .to({}, { duration: 0.5 })
      // 4. Tüm preloader ekranı yukarı kayarak ana sayfayı gösterir
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []); // Boş dependency - sadece mount'ta çalış

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--background)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "var(--foreground)",
      }}
    >
      <div
        ref={cubeRef}
        style={{
          width: "50px",
          height: "50px",
          border: "2px solid var(--accent)",
          position: "absolute",
        }}
      />
      <div style={{ overflow: "hidden" }}>
        <div
          ref={textRef}
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: "bold",
            letterSpacing: "0.2em",
            opacity: 0,
            color: "var(--accent)",
          }}
        >
          L&apos;ART PEYZAJ
        </div>
      </div>
    </div>
  );
}

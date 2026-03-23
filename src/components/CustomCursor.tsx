"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickTo for better performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add pointer hover logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        gsap.to(cursor, {
          scale: 2.5,
          backgroundColor: "transparent",
          border: "1px solid var(--accent)",
          duration: 0.3,
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "var(--accent)",
          border: "none",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block" // Hide on mobile where cursor is not needed
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "var(--accent)",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference", // Gives cool contrast on dark/light backgrounds
      }}
    />
  );
}

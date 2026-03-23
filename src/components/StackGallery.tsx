"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/projects";

/*
  3D Cascading Image Stack - MOBILE RESPONSIVE
  - Interactive: Native horizontal/vertical swiping + scroll matching
  - Auto-Scaling: Uses vw and innerWidth to perfectly fit mobile screens
  - Touch Tap: Uses custom event mapping for routing
*/

export default function ProjectGallery3D({ projects: rawProjects }: { projects: Project[] }) {
  const router = useRouter();
  
  const projects = rawProjects.map(p => ({ ...p, image: p.coverImage || p.gallery?.[0] || "/placeholder.jpg" }));

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevSlotsRef = useRef<number[]>(new Array(projects.length).fill(0));
  const scrollOffset = useRef(0);
  const hoveredIdxRef = useRef<number | null>(null);
  const introComplete = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const totalCards = projects.length;

  const updatePositions = useCallback(() => {
    const offset = scrollOffset.current;
    const isMobile = window.innerWidth < 768;
    const stepX = isMobile ? window.innerWidth * 0.18 : 190;
    const offsetX = isMobile ? window.innerWidth * 0.40 : 380;
    const stepY = isMobile ? -50 : -80;
    const offsetY = isMobile ? 80 : 160;
    const stepZ = isMobile ? -180 : -250;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      let rawI = index - offset;
      let i = ((rawI % totalCards) + totalCards) % totalCards;
      
      if (i > totalCards - 2) i -= totalCards; 

      const prevI = prevSlotsRef.current[index] !== undefined ? prevSlotsRef.current[index] : i;
      const isWrapping = Math.abs(i - prevI) > totalCards / 2;
      
      let opacity = 1;
      if (i > 8.5) {
        opacity = Math.max(0, 1 - (i - 8.5) / 2);
      } else if (i < -0.5) {
        opacity = Math.max(0, 1 - Math.abs(i + 0.5));
      }
      if (i < -1.5 || i > 10.5) opacity = 0;

      const pEvents = opacity === 1 ? "auto" : "none";
      const brightness = 0.85; 

      const isHovered = hoveredIdxRef.current === index;
      const hoverY = isHovered ? -40 : 0;
      const targetY = i * stepY + offsetY + hoverY;

      if (isWrapping) {
        gsap.killTweensOf(card);
        gsap.set(card, {
          x: i < 0 ? -1500 : 2500,
          y: targetY,
          z: i * stepZ,
          rotationY: -40,
          rotationX: -10, 
          rotationZ: 4,  
          zIndex: 0,
          autoAlpha: 0, 
          filter: `brightness(${brightness})`,
          pointerEvents: "none"
        });
        
        gsap.to(card, {
          x: i * stepX - offsetX,
          y: targetY,
          z: i * stepZ,
          rotationY: -40,
          rotationX: -10,
          rotationZ: 4,
          zIndex: Math.round(100 - i * 10),
          autoAlpha: opacity,
          pointerEvents: pEvents,
          duration: 0.1,
          ease: "none",
          delay: 0.05
        });
      } else {
        gsap.to(card, {
          x: i * stepX - offsetX, 
          y: targetY, 
          z: i * stepZ,
          rotationY: -40,
          rotationX: -10, 
          rotationZ: 4,  
          zIndex: Math.round(100 - i * 10),
          filter: `brightness(${brightness})`,
          autoAlpha: opacity,
          pointerEvents: pEvents,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      prevSlotsRef.current[index] = i;
    });
  }, [totalCards]);

  useEffect(() => {
    if (!ready) return;

    if (!introComplete.current) {
      const isMobile = window.innerWidth < 768;
      const stepX = isMobile ? window.innerWidth * 0.18 : 190;
      const offsetX = isMobile ? window.innerWidth * 0.40 : 380;
      const stepY = isMobile ? -50 : -80;
      const offsetY = isMobile ? 80 : 160;
      const stepZ = isMobile ? -180 : -250;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        let destI = index - scrollOffset.current;
        while (destI < -2) destI += totalCards;
        while (destI > totalCards - 2) destI -= totalCards;
        
        prevSlotsRef.current[index] = destI;

        const targetX = destI * stepX - offsetX;
        const targetY = destI * stepY + offsetY;
        const targetZ = destI * stepZ;
        const targetZIndex = Math.round(100 - destI * 10);
        
        let targetOpacity = 1;
        if (destI > 8.5) targetOpacity = Math.max(0, 1 - (destI - 8.5) / 2);
        else if (destI < -0.5) targetOpacity = Math.max(0, 1 - Math.abs(destI + 0.5));
        if (destI < -1.5 || destI > 10.5) targetOpacity = 0;

        gsap.set(card, {
          x: targetX + (isMobile ? 200 : 400),
          y: targetY + (isMobile ? 150 : 300),
          z: targetZ - 1000,
          rotationY: -10,
          rotationX: 10,
          rotationZ: 0,
          zIndex: targetZIndex,
          filter: `brightness(0.85)`,
          autoAlpha: 0, 
        });

        gsap.to(card, {
          x: targetX,
          y: targetY,
          z: targetZ,
          rotationY: -40,
          rotationX: -10,
          rotationZ: 4,
          autoAlpha: targetOpacity,
          duration: 1.4,
          ease: "power4.out",
          delay: index * 0.08,
        });
      });

      setTimeout(() => {
        introComplete.current = true;
        updatePositions(); 
      }, totalCards * 80 + 1400);
    } else {
      updatePositions();
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!introComplete.current) return; 
      scrollOffset.current += e.deltaY * 0.003; 
      updatePositions();
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); 
      if (!introComplete.current) return; 
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      
      const deltaX = touchStartX - touchX; 
      const deltaY = touchStartY - touchY; 
      
      // Mobilde parmağı sola çekmek (deltaX > 0) galeriyi ileri sarsın 
      // Veya aşağı çekmek (deltaY > 0) yine ileri sarsın.
      const movement = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
      
      scrollOffset.current += movement * 0.01; 
      
      touchStartX = touchX;
      touchStartY = touchY;
      updatePositions();
    };

    const handleResize = () => {
       updatePositions();
    };

    // Passive false is needed to prevent native scrolling (prevent default)
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false }); 
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [ready, updatePositions, totalCards]);

  if (!ready) return <div style={{ width: "100%", height: "100vh", backgroundColor: "var(--background)" }} />;

  const handleMouseMove = (e: React.MouseEvent) => {
    // Mobilde mouse move algılanmaz, masaüstü hover logiki:
    let bestIdx: number | null = null;
    let highestZ = -Infinity;

    cardsRef.current.forEach((el, idx) => {
      if (!el) return;
      
      const isHidden = el.style.visibility === "hidden" || el.style.opacity === "0";
      if (isHidden) return;

      const rect = el.getBoundingClientRect();
      const shrinkX = 25; 
      const shrinkY = 25;

      if (
        e.clientX >= rect.left + shrinkX &&
        e.clientX <= rect.right - shrinkX &&
        e.clientY >= rect.top + shrinkY &&
        e.clientY <= rect.bottom - shrinkY
      ) {
        const z = parseInt(el.style.zIndex || "0", 10);
        if (z > highestZ) {
          highestZ = z;
          bestIdx = idx;
        }
      }
    });

    if (hoveredIdxRef.current !== bestIdx) {
      hoveredIdxRef.current = bestIdx;
      updatePositions();
    }
  };

  const handleGlobalLeave = () => {
    if (hoveredIdxRef.current !== null) {
      hoveredIdxRef.current = null;
      updatePositions();
    }
  };

  const handleGlobalClick = () => {
    // Masaüstünde global tıklama
    if (hoveredIdxRef.current !== null) {
      router.push(`/projects/${projects[hoveredIdxRef.current].slug}`);
    }
  };

  const handleCardClick = (e: React.MouseEvent, slug: string) => {
    // Mobilde karta direkt dokunulduğunda çalışması için (Mouse move olmadığından zIndex tespiti yok)
    e.stopPropagation(); 
    router.push(`/projects/${slug}`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleGlobalLeave}
      onClick={handleGlobalClick}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "var(--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: "1500px", 
        cursor: "none", 
        touchAction: "none" // Mobile native scroll engeli
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          width: "clamp(260px, 70vw, 800px)", 
          aspectRatio: "16 / 9", 
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.slug}
            ref={(el) => { cardsRef.current[idx] = el; }}
            onClick={(e) => handleCardClick(e, project.slug)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: "12px", 
              borderRight: "4px solid rgba(255, 255, 255, 0.6)", 
              borderBottom: "1.5px solid rgba(255, 255, 255, 0.4)",
              overflow: "hidden",
              boxShadow: "-8px 12px 30px rgba(0,0,0,0.6)", 
              pointerEvents: "auto", // Mobilde doğrudan z-index sırasına göre resim tıklama eylemi tetikler
              opacity: 0, 
            }}
          >
            <div 
              style={{ width: "100%", height: "100%", position: "relative", pointerEvents: "none", transform: "translateZ(1px)", borderRadius: "12px", overflow: "hidden" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px" 
                style={{ objectFit: "cover", pointerEvents: "none" }}
              />
              
              <div
                style={{
                  position: "absolute",
                  top: "clamp(1rem, 2vw, 1.5rem)",
                  left: "clamp(1rem, 2vw, 1.5rem)",
                  pointerEvents: "none", 
                  zIndex: 2,
                  backgroundColor: "rgba(13, 18, 13, 0.85)", 
                  padding: "0.5rem 1rem",
                  borderRadius: "6px", 
                }}
              >
                <h3
                  style={{
                    color: "#ffffff", 
                    fontFamily: "var(--font-heading), sans-serif",
                    fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {project.title}
                </h3>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "clamp(1rem, 2vw, 1.5rem)",
                  right: "clamp(1rem, 2vw, 1.5rem)",
                  pointerEvents: "none",
                  backgroundColor: "var(--accent)",
                  color: "#000",
                  padding: "0.5rem 1rem",
                  borderRadius: "100px",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span>İncele</span>
                <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

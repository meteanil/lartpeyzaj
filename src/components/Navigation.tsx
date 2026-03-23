"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/projects", label: "Projeler" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/contact", label: "İletişim" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Rota değişince mobil menüyü otomatik kapat
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{`
        .desktop-menu { display: flex; gap: 2rem; pointer-events: auto; }
        .mobile-btn { display: none; cursor: pointer; pointer-events: auto; z-index: 1000; padding: 10px; margin-right: -10px; }
        
        /* Şık Hamburger İkonu Animasyonları */
        .hamburger-line {
          width: 32px; height: 2px; background: var(--foreground); margin: 6px 0;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-origin: left center;
        }
        
        .hamburger-line.open-1 { transform: rotate(45deg); background: var(--accent); }
        .hamburger-line.open-2 { opacity: 0; width: 0; }
        .hamburger-line.open-3 { transform: rotate(-45deg); background: var(--accent); }

        /* Full Screen Menü Katmanı */
        .mobile-overlay {
          position: fixed; inset: 0; background: rgba(13, 18, 13, 0.95);
          backdrop-filter: blur(15px); z-index: 998;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          opacity: 0; pointer-events: none; transition: opacity 0.5s ease;
        }
        .mobile-overlay.open {
          opacity: 1; pointer-events: auto;
        }
        
        /* Aşağıdan Yukarı Zıplayan Linkler */
        .mobile-link {
          font-size: clamp(2rem, 8vw, 3rem); font-weight: 800; font-family: var(--font-heading);
          margin: 1.5rem 0; color: var(--foreground);
          transform: translateY(40px); opacity: 0; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .mobile-overlay.open .mobile-link {
          transform: translateY(0); opacity: 1;
        }

        /* 768px Altında Swap (Değişim) İşlemi */
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-btn { display: block !important; }
          .nav-wrapper { padding: 1rem 5vw !important; }
        }
      `}</style>
      
      <nav className="nav-wrapper" style={{ position: "fixed", top: 0, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 5vw", zIndex: 999, pointerEvents: "none", transition: "padding 0.3s" }}>
        
        {/* LOGO */}
        <div style={{ pointerEvents: "auto", zIndex: 1000 }}>
          <Link 
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsOpen(false);
              }
            }}
          >
            <Image
              src="/lart-Logo3.png"
              alt="L'art Peyzaj Mimarlık"
              width={140}
              height={79}
              unoptimized
              style={{ objectFit: "contain", transition: "transform 0.3s" }}
              priority
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div
          className="desktop-menu"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (pathname === link.href) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              style={{
                opacity: pathname === link.href ? 1 : 0.6,
                transition: "all 0.3s",
                fontWeight: pathname === link.href ? 700 : 400,
                borderBottom: pathname === link.href ? "2px solid var(--accent)" : "2px solid transparent",
                paddingBottom: "4px",
                color: pathname === link.href ? "var(--accent)" : "var(--foreground)"
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE BURGER BTN */}
        <div className="mobile-btn" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "hamburger-line open-1" : "hamburger-line"}></div>
          <div className={isOpen ? "hamburger-line open-2" : "hamburger-line"}></div>
          <div className={isOpen ? "hamburger-line open-3" : "hamburger-line"}></div>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN OVERLAY */}
      <div className={isOpen ? "mobile-overlay open" : "mobile-overlay"}>
         {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={(e) => {
                if (pathname === link.href) {
                  e.preventDefault();
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              style={{ 
                transitionDelay: isOpen ? `${0.1 + index * 0.1}s` : "0s", 
                color: pathname === link.href ? "var(--accent)" : "var(--foreground)" 
              }}
            >
              {link.label}
            </Link>
         ))}
      </div>
    </>
  );
}

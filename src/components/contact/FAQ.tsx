"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqs = [
  {
    q: "Konya dışında veya yurtdışında proje yapıyor musunuz?",
    a: "Evet, operasyon merkezimiz Konya'da olmasına rağmen tüm Türkiye'de ve yurt dışında otel, resort, fabrika ve büyük ölçekli malikane projelerinin konsept tasarım ve anahtar teslim uygulamalarını yürütüyoruz."
  },
  {
    q: "Bir projenin teslim süresi ortalama ne kadardır?",
    a: "Projelerin ölçeğine göre değişmekle birlikte, konsept tasarım süreci genellikle 2-4 hafta arası sürmektedir. Saha uygulama süreleri ise arazinin büyüklüğüne ve sert zemin yapı elemanlarının yoğunluğuna göre proje bazlı belirlenir."
  },
  {
    q: "Uzaktan tasarım ve 3D Modelleme hizmeti alabilir miyim?",
    a: "Kesinlikle. Sahayı biz bizzat ziyaret etmesek bile, tarafınızdan iletilecek drone görüntüleri, harita ölçümleri ve mimari kat planları üzerinden ultra-gerçekçi 3D mimari peyzaj modelleme ve online revizyonlu danışmanlık hizmeti sunmaktayız."
  },
  {
    q: "Sadece bitkisel uygulama mı yapıyorsunuz?",
    a: "Hayır, L'art Peyzaj Mimarlık olarak yalnızca yeşillendirme değil; arazinin altyapısı, drenaj sistemleri, otonom iklim duyarlı sulama ağları, yüzme havuzları, premium pergolalar, istinat duvarları ve tüm yapısal (sert) zemin mimarisini bizzat tasarlayıp uyguluyoruz."
  },
  {
    q: "Randevu almadan ofise gelebilir miyim?",
    a: "Ofisimiz hafta içi her gün 09:00 - 18:30 arası açıktır. Çat kapı bir kahve içmeye her zaman gelebilirsiniz; ancak projeniz üzerinde baş mimarımızla detaylı bir toplantı yapmak isterseniz öncesinde telefonla randevu oluşturmanızı tavsiye ederiz."
  }
];

export default function FAQ() {
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

  return (
    <section ref={sectionRef} style={{ padding: "6rem 5vw 10rem 5vw", backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: "4rem", textAlign: "center", color: "var(--foreground)"}}>
          Sıkça Sorulan <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Sorular.</span>
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

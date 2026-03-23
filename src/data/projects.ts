export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  location: string;
  description: string;
  image: string;
  details: string[];
}

export const projects: Project[] = [
  {
    slug: "villa-garden",
    title: "Doğanın Kalbi",
    subtitle: "Özel Villa Peyzajı",
    category: "Konut",
    year: "2025",
    location: "Konya, Selçuklu",
    description:
      "Modern mimari çizgileri doğayla buluşturan bu projede, taş yürüyüş yolları, süs çimleri ve ambiyans aydınlatması ile huzurlu bir yaşam alanı tasarladık.",
    image: "/projects/villa-garden.png",
    details: [
      "1.200 m² peyzaj alanı",
      "Otomatik sulama sistemi",
      "Doğal taş yürüyüş yolları",
      "LED ambiyans aydınlatma",
      "Yerli bitki türleri kullanımı",
    ],
  },
  {
    slug: "urban-park",
    title: "Urban Oasis",
    subtitle: "Şehir İçi Park Projesi",
    category: "Kamusal",
    year: "2025",
    location: "Konya, Meram",
    description:
      "Şehrin kalbinde nefes alabileceğiniz bir vaha yarattık. Geometrik bitki kasaları, ahşap oturma alanları ve su öğesi ile modern kent yaşamına doğa dokunuşu kattık.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920", // Placeholder Kent Parkı
    details: [
      "3.500 m² park alanı",
      "Interaktif su öğesi",
      "Sürdürülebilir malzeme kullanımı",
      "Erişilebilir tasarım",
      "Oturma ve dinlenme alanları",
    ],
  },
  {
    slug: "rooftop-garden",
    title: "Skyline Terrace",
    subtitle: "Teras Bahçe Tasarımı",
    category: "Ticari",
    year: "2025",
    location: "Konya, Karatay",
    description:
      "Şehir siluetine bakan bir çatı terasını, sarmaşıklar, pergola ve lounge mobilyalarla premium bir dinlenme alanına dönüştürdük.",
    image: "/projects/rooftop-garden.png",
    details: [
      "450 m² teras alanı",
      "Rüzgar dayanıklı bitki seçimi",
      "Özel ahşap pergola",
      "Drenaj ve sulama sistemi",
      "Gece aydınlatma tasarımı",
    ],
  },
  {
    slug: "zen-garden",
    title: "Zen Harmony",
    subtitle: "Meditasyon Bahçesi",
    category: "Kurumsal",
    year: "2025",
    location: "Konya, Selçuklu",
    description:
      "Japon bahçe felsefesinden ilham alarak tasarladığımız bu dinlenme alanı, tırmıklanmış çakıl, yosun kaplı basamak taşları ve bambu çit ile huzurun adresine dönüştü.",
    image: "/projects/zen-garden.png",
    details: [
      "800 m² bahçe alanı",
      "Doğal taş elementleri",
      "Bambu ve akçaağaç kullanımı",
      "Ses yalıtımlı tasarım",
      "Meditasyon platformu",
    ],
  },
  {
    slug: "lake-house",
    title: "Göl Kenarı",
    subtitle: "Göl Evi Dış Mekan",
    category: "Konut",
    year: "2025",
    location: "Beyşehir, Konya",
    description:
      "Göl kenarında doğal peyzaj tasarımı ile yaban çiçekleri, ahşap iskele ve süs çimleriyle huzurlu bir yaşam alanı oluşturduk.",
    image: "/projects/lake-house.png",
    details: [
      "2.800 m² doğal alan",
      "Ahşap iskele tasarımı",
      "Yerli yaban çiçekleri",
      "Doğal drenaj sistemi",
      "Gün batımı seyir noktası",
    ],
  },
  {
    slug: "commercial-green",
    title: "Green Campus",
    subtitle: "Kurumsal Yeşil Alan",
    category: "Ticari",
    year: "2025",
    location: "Konya, Selçuklu",
    description:
      "Kurumsal ofis binasının dış mekanını sürdürülebilir yeşil alanlar, geometrik çit tasarımları ve açık hava toplantı alanı ile modern bir çalışma ortamına kavuşturduk.",
    image: "/projects/commercial.png",
    details: [
      "5.000 m² yeşil alan",
      "Geometrik çit tasarımı",
      "Açık hava toplantı alanı",
      "Otopark peyzajı",
      "Enerji verimli aydınlatma",
    ],
  },
  {
    slug: "rooftop-lounge",
    title: "Çatı Bahçesi",
    subtitle: "Lüks Teras Peyzajı",
    category: "Konut",
    year: "2024",
    location: "Konya, Selçuklu",
    description:
      "Şehir manzaralı çatı terasını modern oturma alanları ve yeşil bitkilerle lüks bir yaşam alanına dönüştürdük.",
    image: "/projects/project-7.png",
    details: [
      "350 m² teras alanı",
      "Panoramik manzara",
      "Rüzgar bariyeri bitkilendirme",
      "Gece aydınlatma sistemi",
      "Özel mobilya tasarımı",
    ],
  },
  {
    slug: "mediterranean-courtyard",
    title: "Akdeniz Avlusu",
    subtitle: "Akdeniz Bahçe Tasarımı",
    category: "Konut",
    year: "2024",
    location: "Konya, Meram",
    description:
      "Zeytin ağaçları, taş yollar ve süs havuzuyla Akdeniz esintili bir avlu bahçesi tasarladık.",
    image: "/projects/project-8.png",
    details: [
      "600 m² avlu alanı",
      "Doğal taş döşeme",
      "Süs havuzu",
      "Zeytin ve lavanta dikimi",
      "Pergola ve gölge alanları",
    ],
  },
  {
    slug: "geometric-garden",
    title: "Geometrik Bahçe",
    subtitle: "Modern Minimalist Peyzaj",
    category: "Kurumsal",
    year: "2024",
    location: "Konya, Karatay",
    description:
      "Geometrik yollar, süs çimleri ve LED aydınlatmayla modern minimalist bir bahçe tasarımı gerçekleştirdik.",
    image: "/projects/project-9.png",
    details: [
      "1.500 m² bahçe alanı",
      "Geometrik yol tasarımı",
      "LED zemin aydınlatma",
      "Otomatik bakım sistemi",
      "Süs çimleri",
    ],
  },
  {
    slug: "tropical-paradise",
    title: "Tropik Cennet",
    subtitle: "Havuz Bahçe Tasarımı",
    category: "Konut",
    year: "2024",
    location: "Antalya",
    description:
      "Palmiyeler, sonsuzluk havuzu ve tropical bitkilerle cennet köşesi yarattık.",
    image: "/projects/project-10.png",
    details: [
      "2.000 m² bahçe alanı",
      "Sonsuzluk havuzu",
      "Tropik bitki seçimi",
      "Şelale ve su öğeleri",
      "Gece aydınlatma",
    ],
  },
  {
    slug: "city-park",
    title: "Kent Parkı",
    subtitle: "Şehir Parkı Projesi",
    category: "Kamusal",
    year: "2024",
    location: "Konya, Meram",
    description:
      "Yürüyüş köprüsü, yaban çiçekleri ve yetişkin ağaçlarla şehir parkı tasarladık.",
    image: "/projects/project-11.png",
    details: [
      "8.000 m² park alanı",
      "Yürüyüş köprüsü",
      "Yaban çiçeği alanı",
      "Çocuk oyun alanı",
      "Bisiklet yolu",
    ],
  },
  {
    slug: "meditation-garden",
    title: "Huzur Bahçesi",
    subtitle: "Zen Meditasyon Alanı",
    category: "Özel",
    year: "2024",
    location: "Konya, Selçuklu",
    description:
      "Tırmıklanmış kum desenleri, bambu çit ve yosun kaplı kayalarla huzurlu bir meditasyon bahçesi oluşturduk.",
    image: "/projects/project-12.png",
    details: [
      "400 m² bahçe alanı",
      "Zen kum bahçesi",
      "Bambu çit tasarımı",
      "Taş fener",
      "Meditasyon platformu",
    ],
  },
];

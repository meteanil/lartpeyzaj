import { client } from '@/sanity/lib/client';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  gallery: string[];
  youtubeVideos?: string[];
  subtitle?: string;
  year?: string;
  location?: string;
  details?: string;
}

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    "gallery": gallery[].asset->url,
    location,
    year,
    youtubeVideos
  }`;
  
  const projects = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return projects.map((p: any) => ({
    id: p._id,
    title: p.title,
    slug: p.slug || '#',
    category: "Projelerimiz",
    description: p.description || "",
    coverImage: p.coverImage || "/placeholder.jpg",
    gallery: p.gallery || [],
    youtubeVideos: p.youtubeVideos || [],
    location: p.location || "Konya",
    year: p.year || new Date().getFullYear().toString()
  }));
}

export async function getApplications(): Promise<Project[]> {
  const query = `*[_type == "application"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    "gallery": gallery[].asset->url,
    location,
    year,
    youtubeVideos
  }`;
  
  const applications = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return applications.map((p: any) => ({
    id: p._id,
    title: p.title,
    slug: p.slug || '#',
    category: "Uygulamalar",
    description: p.description || "",
    coverImage: p.coverImage || "/placeholder.jpg",
    gallery: p.gallery || [],
    youtubeVideos: p.youtubeVideos || [],
    location: p.location || "Konya",
    year: p.year || new Date().getFullYear().toString()
  }));
}

export interface HomePageSettings {
  heroTitle: string;
  heroSubtitle: string;
  stats: { label: string; value: number; prefix?: string; suffix?: string }[];
  services: { id: string; title: string; desc: string; bg?: string }[];
}

export async function getHomePageSettings(): Promise<HomePageSettings> {
  const query = `*[_type == "homePage"][0]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return {
    heroTitle: data?.heroTitle || "Doğayı Tasarlıyoruz.",
    heroSubtitle: data?.heroSubtitle || "Sürdürülebilir Ekosistemler. Her projede doğanın dilini konuşuyor, yaşam alanlarınızı dönüştürüyoruz.",
    stats: data?.stats || [
      { label: "Tamamlanan Proje", value: 20, suffix: "+", prefix: "" },
      { label: "Yıllık Tecrübe", value: 7, suffix: "+", prefix: "" },
      { label: "Müşteri Memnuniyeti", value: 100, suffix: "", prefix: "%" },
      { label: "Uzman Ekip Üyesi", value: 3, suffix: "+", prefix: "" },
    ],
    services: data?.services || [
      { id: "01", title: "Peyzaj Tasarımı", desc: "Arazinin ruhunu okuyarak, doğayla iç içe vizyoner ve estetik konsept projeler tasarlıyoruz.", bg: "linear-gradient(135deg, #1f291f 0%, #0a0d0a 100%)" },
      { id: "02", title: "Akıllı Sert Zemin", desc: "Ahşap, taş ve premium betonun kusursuz entegrasyonu ile dayanıklı mimari detaylar inşaa ediyoruz.", bg: "linear-gradient(135deg, #1D1C1B 0%, #0a0a09 100%)" },
      { id: "03", title: "3D Modelleme", desc: "Projenizi toprağa değmeden önce ultra-fotogerçekçi kalitede görün, VR desteğiyle içinde önce siz gezin.", bg: "linear-gradient(135deg, #191A1E 0%, #0c0d0e 100%)" },
      { id: "04", title: "Botanik Uygulama", desc: "İklime tam uyumlu endemik ağaçlandırma, özel ithal türler ve büyüleyici premium botanik aranjmanlar.", bg: "linear-gradient(135deg, #171816 0%, #080807 100%)" },
      { id: "05", title: "Otonom Sulama", desc: "Suyun her damlasını analiz edip koruyan, iklim okuyuculu akıllı sulama ve gizli drenaj sistemleri.", bg: "linear-gradient(135deg, #1B1E22 0%, #0d0f11 100%)" },
      { id: "06", title: "Eko Restorasyon", desc: "Bozulmuş coğrafyaları onarıp kendi kendine yetebilen, zamana meydan okuyan biyolojik yaşam alanları.", bg: "linear-gradient(135deg, #1E1B18 0%, #0f0d0c 100%)" },
    ]
  };
}

export interface AboutPageSettings {
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
}

export async function getAboutPageSettings(): Promise<AboutPageSettings> {
  const query = `*[_type == "aboutPage"][0]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return {
    aboutTitle: data?.aboutTitle || "Form ile Fonksiyonu Birleştiriyoruz.",
    aboutText1: data?.aboutText1 || "Sadece bitki dikmiyoruz; yaşayan, nefes alan ve zamanla olgunlaşan ekosistemler kuruyoruz. Peşinde olduğumuz şey doğanın kendi mükemmelliğini modern insanın yaşam alanlarına saygıyla taşıyabilmek.",
    aboutText2: data?.aboutText2 || "Konya merkezli firmamızda, hem bireysel ölçekli teras ve villalar hem de endüstriyel devasa ölçekli fabrikalar için prestij odaklı anahtar teslim proje hizmeti veriyoruz. Keşiften son çim biçmeye kadar sürecin her saniyesinde yanınızdayız.",
    missionTitle: data?.missionTitle || "Mimariyi Doğayla Barıştırıyoruz.",
    missionText: data?.missionText || "Mimari yapıların gri soğukluğunu, doğanın canlı renkleriyle dengeliyoruz. Bireye özel fonksiyonel peyzaj çözümleri üretirken, ekolojik dengeyi koruyan, su ayak izini düşüren ve doğanın iyileştirici gücünü insanla buluşturan kusursuz bir mühendislik ortaya koyuyoruz.",
    visionTitle: data?.visionTitle || "Ölümsüz Ekosistemler.",
    visionText: data?.visionText || "Ulusal ve uluslararası ölçekte, peyzaj mimarlığının kurallarını sürdürülebilir bir eksende yeniden yazmak. 50 yıl sonra bile kendi kendine yetebilen, zamana meydan okuyan ve sonraki nesillere nefes olacak referans statüsünde doğal yaşam harikaları bırakmak."
  };
}

export interface ContactPageSettings {
  address: string;
  phone: string;
  email: string;
  instagramUrl: string;
  whatsappNumber: string;
  mapLink: string;
  workingHours: { days: string; hours: string }[];
}

export async function getContactPageSettings(): Promise<ContactPageSettings> {
  const query = `*[_type == "contactPage"][0]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return {
    address: data?.address || "Nişantaş, İkra Sk. Nasip Sit. No:1/c B Blok, 42090 Selçuklu / Konya",
    phone: data?.phone || "0531 343 66 12",
    email: data?.email || "info@lartpeyzaj.com",
    instagramUrl: data?.instagramUrl || "https://www.instagram.com/lartpeyzajmimarlik/",
    whatsappNumber: data?.whatsappNumber || "+905313436612",
    mapLink: data?.mapLink || "https://maps.app.goo.gl/xDZ6jpDK7W6NJdpF6",
    workingHours: data?.workingHours || [
      { days: "Pzt - Cuma", hours: "09:00 — 18:30" },
      { days: "Cumartesi", hours: "09:00 — 14:00" },
      { days: "Pazar", hours: "Kapalı" }
    ]
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  desc: string;
  image: string;
  order: number;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    desc,
    "image": image.asset->url,
    order
  }`;
  
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  if (!data || data.length === 0) {
    return [
      {
        id: "1",
        name: "Mete Anıl Küçük",
        role: "Kurucu & Peyzaj Mimarı",
        desc: "7 yıllık tecrübesiyle L'art Peyzaj'ın vizyonunu şekillendiriyor. Modern ve sürdürülebilir tasarımların baş mimarı olarak doğaya estetik dokunuşlar katıyor.",
        image: "/Ekip/mete-anil.webp",
        order: 1
      },
      {
        id: "2",
        name: "Berkan Koca",
        role: "Kurucu & Peyzaj Mimarı",
        desc: "7 yıllık saha ve tasarım tecrübesiyle projelerin kusursuz uygulanmasına liderlik ediyor. Estetik vizyonu, mühendislik disipliniyle harmanlıyor.",
        image: "/Ekip/berkan.webp",
        order: 2
      },
      {
        id: "3",
        name: "Mehmet Ozan Aktürk",
        role: "Peyzaj Mimarı & Tasarımcı",
        desc: "7 yıllık tecrübesiyle yenilikçi peyzaj konseptlerine hayat veriyor. Tasarım sürecinin her aşamasında sanatsal yaklaşımıyla ekibe ilham kaynağı oluyor.",
        image: "/Ekip/ozan-akturk.webp",
        order: 3
      }
    ];
  }

  return data.map((item: any) => ({
    id: item._id,
    name: item.name,
    role: item.role,
    desc: item.desc,
    image: item.image || "",
    order: item.order || 99
  }));
}

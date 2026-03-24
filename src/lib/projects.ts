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

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  instagramUrl: string;
  whatsappNumber: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0]`;
  const settings = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return {
    heroTitle: settings?.heroTitle || "Doğayı Tasarlıyoruz.",
    heroSubtitle: settings?.heroSubtitle || "Sürdürülebilir Ekosistemler. Her projede doğanın dilini konuşuyor, yaşam alanlarınızı dönüştürüyoruz.",
    aboutTitle: settings?.aboutTitle || "Form ile Fonksiyonu Birleştiriyoruz.",
    aboutText: settings?.aboutText || "Sadece bitki dikmiyoruz; yaşayan, nefes alan ve zamanla olgunlaşan ekosistemler kuruyoruz. Peşinde olduğumuz şey doğanın kendi mükemmelliğini modern insanın yaşam alanlarına saygıyla taşıyabilmek.\\n\\nKonya merkezli firmamızda, hem bireysel ölçekli teras ve villalar hem de endüstriyel devasa ölçekli fabrikalar için prestij odaklı anahtar teslim proje hizmeti veriyoruz. Keşiften son çim biçmeye kadar sürecin her saniyesinde yanınızdayız.",
    contactPhone: settings?.contactPhone || "+90 53X XXX XX XX",
    contactEmail: settings?.contactEmail || "info@lartpeyzaj.com",
    contactAddress: settings?.contactAddress || "Konya, Türkiye",
    instagramUrl: settings?.instagramUrl || "https://www.instagram.com/lartpeyzaj",
    whatsappNumber: settings?.whatsappNumber || "+9053XXXXXXXX",
  };
}

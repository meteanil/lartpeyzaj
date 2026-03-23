import fs from 'fs';
import path from 'path';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  gallery: string[];
  subtitle?: string;
  year?: string;
  location?: string;
  details?: string;
}

export function getProjects(): Project[] {
  // `public/Projeler_` dizinini oku
  const projectsDir = path.join(process.cwd(), 'public', 'Projeler_');
  
  if (!fs.existsSync(projectsDir)) {
    return []; // Klasör henüz açılmadıysa boş dön
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  const folders = entries.filter(dirent => dirent.isDirectory());

  const projects: Project[] = folders.map((folder, index) => {
    const parentName = folder.name;
    const folderPath = path.join(projectsDir, parentName);
    const ObjectFiles = fs.readdirSync(folderPath);
    
    // Kullanıcının performans ve boyut avantajı için (sadece .webp uzantılı imajları) yakala ve alfabetik sırala (İlk sıradaki resim kapak olacak!)
    const imageFiles = ObjectFiles
      .filter(file => /\.webp$/i.test(file))
      .sort((a, b) => a.localeCompare(b));
    
    // Dosya URL'lerini public klasörüne göre hazırla
    const imageUrls = imageFiles.map(file => `/Projeler_/${encodeURIComponent(parentName)}/${file}`);
    
    // 5 Fotoğraf mantığı: 0. index Cover, kalanları Gallery
    const coverImageUrl = imageUrls.length > 0 ? imageUrls[0] : '/placeholder.jpg';
    const galleryArray = imageUrls.length > 1 ? imageUrls.slice(1) : [];
    
    // Klasör ismini slug yapısına çevir (örnek: "Özyurtlar Otel" -> "ozyurtlar-otel")
    const slugMap: { [key: string]: string } = {
      'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c', 'ı': 'i',
      'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c', 'İ': 'i'
    };
    
    let slug = parentName.replace(/[ğüşöçıĞÜŞÖÇİ]/g, match => slugMap[match] || match);
    slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Kullanıcıya kolaylık: detay.txt varsa oku
    let description = `${parentName} projesi, doğayla kusursuz bir uyum içerisinde fonksiyonel ve nefes kesici konsept peyzaj mimarisiyle L'art imzası taşıyor. Toplam 5 aşamalık görsel sunum.`;
    let category = "Peyzaj Projesi";
    
    const detayTxtPath = path.join(folderPath, "detay.txt");
    if (fs.existsSync(detayTxtPath)) {
      const content = fs.readFileSync(detayTxtPath, 'utf-8');
      const lines = content.split('\n').filter(l => l.trim() !== ''); // Boş satırları atla
      if (lines.length > 0) category = lines[0].trim();
      if (lines.length > 1) description = lines.slice(1).join(' ').trim();
    }

    return {
      id: String(index + 1).padStart(2, '0'),
      title: parentName,
      slug: slug,
      category: category,
      description: description,
      coverImage: coverImageUrl,
      gallery: galleryArray,
    };
  });

  return projects;
}

export function getApplications(): Project[] {
  const appsDir = path.join(process.cwd(), 'public', 'Uygulamalar');
  
  if (!fs.existsSync(appsDir)) {
    return [];
  }

  const entries = fs.readdirSync(appsDir, { withFileTypes: true });
  const folders = entries.filter(dirent => dirent.isDirectory());

  const apps: Project[] = folders.map((folder, index) => {
    const parentName = folder.name;
    const folderPath = path.join(appsDir, parentName);
    const objectFiles = fs.readdirSync(folderPath);
    
    const imageFiles = objectFiles
      .filter(file => /\.webp$/i.test(file))
      .sort((a, b) => a.localeCompare(b));
    
    const imageUrls = imageFiles.map(file => `/Uygulamalar/${encodeURIComponent(parentName)}/${file}`);
    
    const coverImageUrl = imageUrls.length > 0 ? imageUrls[0] : '/placeholder.jpg';
    const galleryArray = imageUrls.length > 1 ? imageUrls.slice(1) : [];
    
    const slugMap: { [key: string]: string } = {
      'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c', 'ı': 'i',
      'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c', 'İ': 'i'
    };
    
    let slug = parentName.replace(/[ğüşöçıĞÜŞÖÇİ]/g, match => slugMap[match] || match);
    slug = 'uyg-' + slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    let description = `${parentName} uygulama projesi, L'art Peyzaj Mimarlık tarafından sahada hayata geçirilmiş, doğayla bütünleşik kusursuz bir peyzaj uygulamasıdır.`;
    let category = "Peyzaj Uygulaması";
    
    const detayTxtPath = path.join(folderPath, "detay.txt");
    if (fs.existsSync(detayTxtPath)) {
      const content = fs.readFileSync(detayTxtPath, 'utf-8');
      const lines = content.split('\n').filter(l => l.trim() !== '');
      if (lines.length > 0) category = lines[0].trim();
      if (lines.length > 1) description = lines.slice(1).join(' ').trim();
    }

    return {
      id: String(index + 1).padStart(2, '0'),
      title: parentName,
      slug: slug,
      category: category,
      description: description,
      coverImage: coverImageUrl,
      gallery: galleryArray,
    };
  });

  return apps;
}

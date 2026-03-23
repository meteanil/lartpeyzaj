import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function getProjectsData() {
  const projectsDir = path.join(rootDir, 'public', 'Projeler_');
  if (!fs.existsSync(projectsDir)) return [];

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  const folders = entries.filter(dirent => dirent.isDirectory());

  return folders.map((folder, index) => {
    const parentName = folder.name;
    const folderPath = path.join(projectsDir, parentName);
    const objectFiles = fs.readdirSync(folderPath);
    
    const imageFiles = objectFiles
      .filter(file => /\.webp$/i.test(file))
      .sort((a, b) => a.localeCompare(b));
    
    const imageUrls = imageFiles.map(file => `/Projeler_/${encodeURIComponent(parentName)}/${file}`);
    
    const coverImageUrl = imageUrls.length > 0 ? imageUrls[0] : '/placeholder.jpg';
    const galleryArray = imageUrls.length > 1 ? imageUrls.slice(1) : [];
    
    const slugMap = {
      'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c', 'ı': 'i',
      'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c', 'İ': 'i'
    };
    
    let slug = parentName.replace(/[ğüşöçıĞÜŞÖÇİ]/g, match => slugMap[match] || match);
    slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    let description = `${parentName} projesi, doğayla kusursuz bir uyum içerisinde fonksiyonel ve nefes kesici konsept peyzaj mimarisiyle L'art imzası taşıyor.`;
    let category = "Peyzaj Projesi";
    
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
}

function getApplicationsData() {
  const appsDir = path.join(rootDir, 'public', 'Uygulamalar');
  if (!fs.existsSync(appsDir)) return [];

  const entries = fs.readdirSync(appsDir, { withFileTypes: true });
  const folders = entries.filter(dirent => dirent.isDirectory());

  return folders.map((folder, index) => {
    const parentName = folder.name;
    const folderPath = path.join(appsDir, parentName);
    const objectFiles = fs.readdirSync(folderPath);
    
    const imageFiles = objectFiles
      .filter(file => /\.webp$/i.test(file))
      .sort((a, b) => a.localeCompare(b));
    
    const imageUrls = imageFiles.map(file => `/Uygulamalar/${encodeURIComponent(parentName)}/${file}`);
    
    const coverImageUrl = imageUrls.length > 0 ? imageUrls[0] : '/placeholder.jpg';
    const galleryArray = imageUrls.length > 1 ? imageUrls.slice(1) : [];
    
    const slugMap = {
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
}

const data = {
  projects: getProjectsData(),
  applications: getApplicationsData()
};

fs.mkdirSync(path.join(rootDir, 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'projectsCache.json'), JSON.stringify(data, null, 2));

console.log('✅ projectsCache.json updated successfully.');

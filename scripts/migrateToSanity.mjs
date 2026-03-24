import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5unim43k',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-24',
  token: 'skvPKUy1J6ppvk8zgGbhOV10xsJ5SQun5nNSXoMy3kRwF6efNUqRYiycXJcGSyaqNlxvKLxlbGJ5jBKdQB4OVh18EfZB31eKcXZ3jJtuTAfw9yXnWpiuMpVwUslvzTZAxn5haS3YFLQg4Bj3LbvMnYm8Rzt3flKwloFxfPikIGPzU6xQbYwt',
});

const baseDir = path.resolve('public/Projeler_');

const trMap = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
};

function slugify(text) {
  let str = text.replace(/[çğıöşüÇĞİÖŞÜ]/g, match => trMap[match]);
  return str.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function findImagesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Thumbnail klasörlerini yüklemek istemiyoruz, gereksiz yer kaplamasın.
      if (file !== '_thumbnails_') {
        results = results.concat(findImagesRecursively(fullPath));
      }
    } else {
      if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function uploadImage(filePath) {
  console.log(`[Upload] Resim yükleniyor... -> ${path.basename(filePath)}`);
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath)
  });
  return asset;
}

async function migrate() {
  console.log('--- 🚀 SANITY MIGRATION BASLADI ---');
  const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
  
  for (const folder of folders) {
    console.log(`\n>> PROJE ISLENIYOR: ${folder}`);
    const projectDir = path.join(baseDir, folder);
    
    const allImgs = findImagesRecursively(projectDir);
    if (allImgs.length === 0) {
      console.log(`[Uyari] ${folder} atlandı. (Hiç resim bulunamadı)`);
      continue;
    }

    // İlk resmi kapak yap, kalanları galeri yap
    const coverImagePath = allImgs[0];
    const galleryImagePaths = allImgs.slice(1);

    try {
      const coverAsset = await uploadImage(coverImagePath);
      
      const galleryAssets = [];
      for (const galPath of galleryImagePaths) {
        const galAsset = await uploadImage(galPath);
        galleryAssets.push(galAsset);
      }
      
      const doc = {
        _type: 'project',
        title: folder,
        slug: { _type: 'slug', current: slugify(folder) },
        location: 'Konya',
        year: '2024',
        coverImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: coverAsset._id }
        },
        gallery: galleryAssets.map(a => ({
          _type: 'image',
          asset: { _type: 'reference', _ref: a._id }
        }))
      };
      
      await client.create(doc);
      console.log(`✔️ BASARILI: ${folder} tamamen buluta eklendi!`);
      
    } catch (e) {
      console.error(`❌ HATA: ${folder} yüklenemedi.`, e.message);
    }
  }
}

migrate().then(() => console.log('\n✅ MIGRATION TUM DOSYALAR ICIN BİTTI! ✅')).catch(console.error);

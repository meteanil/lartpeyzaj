import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const directoriesToScan = [
  path.join(rootDir, 'public', 'Projeler_'),
  path.join(rootDir, 'public', 'Uygulamalar')
];

async function optimizeImages() {
  console.log('🖼️  Başlıyor: Görseller taranıyor ve optimize ediliyor...');
  let totalSaved = 0;
  let optimizedCount = 0;

  for (const dir of directoriesToScan) {
    if (!fs.existsSync(dir)) continue;

    const projects = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());

    for (const project of projects) {
      const projectPath = path.join(dir, project.name);
      const ObjectFiles = fs.readdirSync(projectPath);

      for (const file of ObjectFiles) {
        if (!/\.(webp|jpg|jpeg|png)$/i.test(file)) continue;

        const filePath = path.join(projectPath, file);
        const stats = fs.statSync(filePath);
        const originalSize = stats.size;

        try {
          const inputBuffer = fs.readFileSync(filePath);
          const image = sharp(inputBuffer);
          const metadata = await image.metadata();

          // Optimize edilecek geçici yol
          const tempPath = filePath + '.tmp';
          
          let pipeline = image;
          
          if (metadata.width && metadata.width > 1920) {
              pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
          }

          // Kaliteyi düşürerek (%75) WebP formatında ez
          await pipeline
            .webp({ quality: 75, effort: 6 })
            .toFile(tempPath);

          const newStats = fs.statSync(tempPath);
          
          // Sadece daha küçükse üstüne yaz
          if (newStats.size < originalSize) {
            fs.renameSync(tempPath, filePath);
            const savedBytes = originalSize - newStats.size;
            totalSaved += savedBytes;
            optimizedCount++;
            console.log(`✅ Optimize edildi: ${project.name.substring(0, 15)}.../${file.substring(0, 15)} | Kazanç: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
          } else {
            fs.unlinkSync(tempPath);
          }
        } catch (error) {
          console.error(`❌ Hata: ${file} optimize edilemedi. ${error.message}`);
        }
      }
    }
  }

  console.log('\n=============================================');
  console.log(`🎉 Optimizasyon Tamamlandı!`);
  console.log(`📸 Toplam optimize edilen görsel: ${optimizedCount}`);
  console.log(`💾 Toplam kazanılan alan: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log('=============================================\n');
}

optimizeImages();

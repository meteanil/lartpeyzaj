import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const inputPath = path.join(rootDir, 'public', 'lart-Logo4.png');
const outputFavicon = path.join(rootDir, 'src', 'app', 'icon.png');
const outputAppleIcon = path.join(rootDir, 'public', 'apple-touch-icon.png');

async function roundCorners() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  // Yuvarlak köşe yarıçapı - boyutun ~20%'si güzel bir arc verir
  const radius = Math.round(Math.min(width, height) * 0.20);

  // SVG mask ile rounded corners
  const roundedMask = Buffer.from(
    `<svg width="${width}" height="${height}">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`
  );

  const roundedBuffer = await sharp(inputPath)
    .composite([{
      input: roundedMask,
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  // Favicon olarak kaydet
  await sharp(roundedBuffer).toFile(outputFavicon);
  console.log(`✅ Favicon saved: ${outputFavicon}`);

  // Apple touch icon olarak kaydet
  await sharp(roundedBuffer).toFile(outputAppleIcon);
  console.log(`✅ Apple touch icon saved: ${outputAppleIcon}`);

  console.log(`📐 Image: ${width}x${height}, Corner radius: ${radius}px`);
}

roundCorners().catch(console.error);

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOG() {
  const logoPath = 'public/lart-Logo3.png';
  if (!fs.existsSync(logoPath)) {
     console.error('Logo not found');
     return;
  }
  
  try {
    // 1- Mevcut saydam logonun alpha kanalını çıkar ve yeşil (#c0d734) yap
    const metadata = await sharp(logoPath).metadata();
    const width = metadata.width;
    const height = metadata.height;

    const solidAccent = await sharp({
      create: { width, height, channels: 3, background: '#c0d734' }
    }).raw().toBuffer();

    let alphaBuffer;
    if (metadata.hasAlpha) {
      alphaBuffer = await sharp(logoPath).extractChannel('alpha').raw().toBuffer();
    } else {
      console.error('No alpha channel found on logo!');
      return;
    }

    const coloredLogoBuffer = await sharp(solidAccent, {
        raw: { width, height, channels: 3 }
    })
    .joinChannel(Buffer.from(alphaBuffer), {
        raw: { width, height, channels: 1 }
    })
    .resize({ width: 600, height: 400, fit: 'inside', withoutEnlargement: true })
    .png()
    .toBuffer();

    // 2- 1200x630 px boyutlarında karanlık marka renginde bir zemin oluştur (#0d120d)
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 13, g: 18, b: 13, alpha: 1 }
      }
    })
    .composite([
      {
        input: coloredLogoBuffer,
        gravity: 'center'
      }
    ])
    .toFile('public/og-image.png');

    console.log('✅ Premium OG (Yepyeni sosyal medya önizleme) resmi oluşturuldu!');
  } catch (e) {
    console.error(e);
  }
}
generateOG();

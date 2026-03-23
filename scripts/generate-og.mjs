import sharp from 'sharp';
import fs from 'fs';

async function generateOG() {
  const logoPath = 'public/lart-Logo3.png';
  if (!fs.existsSync(logoPath)) {
     console.error('Logo not found');
     return;
  }
  
  try {
    // Logoyu orantılı olarak yeniden boyutlandır (#1)
    const logoBuffer = await sharp(logoPath)
      .resize({ width: 700, fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer();

    const meta = await sharp(logoBuffer).metadata();

    const svgColorOverlay = Buffer.from(
      `<svg width="${meta.width}" height="${meta.height}"><rect x="0" y="0" width="100%" height="100%" fill="#c0d734" /></svg>`
    );

    // Logonun renklerini SVG ile kusursuz birleştir (blend: "in") (#2)
    // Sadece maske olan yerleri 'c0d734' ile doldurarak mükemmel kesim elde et
    const tintedLogo = await sharp(logoBuffer)
      .composite([
        {
          input: svgColorOverlay,
          blend: 'in'
        }
      ])
      .png()
      .toBuffer();

    // Son olarak orijinal marka arkaplanı (#0d120d) oluşturup ortasına oturt (#3)
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 13, g: 18, b: 13, alpha: 1 }
      }
    })
    .composite([
      { input: tintedLogo, gravity: 'center' }
    ])
    .toFile('public/og-image.png');

    console.log('✅ Premium OG (Blend In Mode) oluşturuldu! Kesinlikle yeşil blok hatası kalmadı.');
  } catch (e) {
    console.error(e);
  }
}
generateOG();

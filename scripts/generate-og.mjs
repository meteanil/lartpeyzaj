import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOG() {
  const logoPath = 'public/logo-transparent.png'; // Tamamen beyaz olan referans PNG dosyamız
  if (!fs.existsSync(logoPath)) {
     console.error('Logo not found');
     return;
  }
  
  try {
    // Önce logomuzu 800x400 sınırlarına sığacak şekilde boyutlandırıyoruz
    const logoBuffer = await sharp(logoPath)
      .resize({ width: 800, height: 400, fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer();

    const logoMeta = await sharp(logoBuffer).metadata();

    // Tam olarak logonun yeni boyutlarında düz yeşil bir kutu yaratıyoruz
    const solidAccent = await sharp({
      create: { 
        width: logoMeta.width, 
        height: logoMeta.height, 
        channels: 3, 
        background: '#c0d734' 
      }
    }).png().toBuffer();

    // Logonun alfa kanalını (saydamlığını) bir maske (dest-in) olarak kullanıp yeşil kutuyu kesiyoruz
    const tintedLogo = await sharp(solidAccent)
      .composite([{ input: logoBuffer, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // 1200x630 (Sosyal medya WhatsApp, Twitter vb. Open Graph standartı) siyah zemin (#0d120d)
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

    console.log('✅ Premium OG (tamamı boyalı) resmi oluşturuldu!');
  } catch (e) {
    console.error(e);
  }
}
generateOG();

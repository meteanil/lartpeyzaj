import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOG() {
  const logoPath = 'public/lart-Logo3.png'; // Kesinlikle şeffaf PNG olan dosyayı geri seçiyoruz
  if (!fs.existsSync(logoPath)) {
     console.error('Logo not found');
     return;
  }
  
  try {
    // 1- Önce logomuzu 800x400 sınırlarına sığacak şekilde boyutlandırıyoruz (maske boyutumuz bu olacak)
    const logoBuffer = await sharp(logoPath)
      .resize({ width: 800, height: 400, fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer();

    const logoMeta = await sharp(logoBuffer).metadata();
    const width = logoMeta.width;
    const height = logoMeta.height;

    // 2- Tam olarak logonun yeni boyutlarında düz RGB yeşil bir kutu yaratıyoruz
    const solidAccent = await sharp({
      create: { 
        width, 
        height, 
        channels: 3, 
        background: '#c0d734' 
      }
    }).raw().toBuffer();

    // 3- Boyutlandırılmış logodan saydamlık (alpha) kanalını raw buffer olarak tek başına çekiyoruz
    const alphaBuffer = await sharp(logoBuffer).extractChannel('alpha').raw().toBuffer();

    // 4- Kusursuz maskeleme: RGB yeşil kutumuza, çektiğimiz Alpha kanalını 4. kanal (transparency) olarak ekliyoruz
    // Bu sayede solid kutumuz sadece orijinal logodaki piksellerin şeklinde var olmuş oluyor. Siyah blok hatası MÜMKÜN DEĞİL.
    const tintedLogo = await sharp(solidAccent, {
        raw: { width, height, channels: 3 }
    })
    .joinChannel(Buffer.from(alphaBuffer), {
        raw: { width, height, channels: 1 }
    })
    .png()
    .toBuffer();

    // 5- Arka plana o çok istenen marka koyu zeminini atıp 1200x630 (OG) ölçülerine merkezliyoruz
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

    console.log('✅ Premium OG (Raw Alpha Extraction - 100% Guaranteed) oluşturuldu!');
  } catch (e) {
    console.error(e);
  }
}
generateOG();

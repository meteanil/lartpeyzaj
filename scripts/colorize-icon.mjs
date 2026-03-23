import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function colorize() {
  const iconPath = 'src/app/icon.png';
  
  if (!fs.existsSync(iconPath)) {
    console.error('File not found:', iconPath);
    return;
  }

  try {
    const metadata = await sharp(iconPath).metadata();
    const width = metadata.width;
    const height = metadata.height;

    // Hedef renk: #c0d734
    const solidColor = await sharp({
      create: { width, height, channels: 3, background: '#c0d734' }
    }).raw().toBuffer();

    // Sadece alpha(saydamlık) kanalını al
    let alphaBuffer;
    if (metadata.hasAlpha) {
       alphaBuffer = await sharp(iconPath).extractChannel('alpha').raw().toBuffer();
    } else {
       console.log('Image has no alpha channel!');
       return;
    }

    // İkisini birleştirip yeni logo oluştur
    const tempPath = 'src/app/icon-colored.png';
    await sharp(solidColor, {
      raw: { width, height, channels: 3 }
    })
    .joinChannel(Buffer.from(alphaBuffer), {
        raw: { width, height, channels: 1 }
    })
    .png()
    .toFile(tempPath);

    fs.renameSync(tempPath, iconPath);
    console.log('✅ Icon successfully colorized to #c0d734!');
  } catch(e) {
    console.error(e);
  }
}

colorize();

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5unim43k',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-24',
  token: 'skvPKUy1J6ppvk8zgGbhOV10xsJ5SQun5nNSXoMy3kRwF6efNUqRYiycXJcGSyaqNlxvKLxlbGJ5jBKdQB4OVh18EfZB31eKcXZ3jJtuTAfw9yXnWpiuMpVwUslvzTZAxn5haS3YFLQg4Bj3LbvMnYm8Rzt3flKwloFxfPikIGPzU6xQbYwt',
});

async function run() {
  console.log("Varsayılan Site Ayarları yükleniyor...");

  const doc = {
    _type: 'siteSettings',
    heroTitle: 'Doğayı Tasarlıyoruz.',
    heroSubtitle: 'Sürdürülebilir Ekosistemler. Her projede doğanın dilini konuşuyor, yaşam alanlarınızı dönüştürüyoruz.',
    aboutTitle: 'Form ile Fonksiyonu Birleştiriyoruz.',
    aboutText: 'Sadece bitki dikmiyoruz; yaşayan, nefes alan ve zamanla olgunlaşan ekosistemler kuruyoruz. Peşinde olduğumuz şey doğanın kendi mükemmelliğini modern insanın yaşam alanlarına saygıyla taşıyabilmek.\\n\\nKonya merkezli firmamızda, hem bireysel ölçekli teras ve villalar hem de endüstriyel devasa ölçekli fabrikalar için prestij odaklı anahtar teslim proje hizmeti veriyoruz. Keşiften son çim biçmeye kadar sürecin her saniyesinde yanınızdayız.',
    contactPhone: '+905313436612',
    contactEmail: 'info@lartpeyzaj.com',
    contactAddress: 'Nişantaş, İkra Sk. Nasip Sit. No:1/c B Blok, 42090 Selçuklu / Konya',
    instagramUrl: 'https://www.instagram.com/lartpeyzajmimarlik/',
    whatsappNumber: '+905313436612'
  };

  try {
    const result = await client.create(doc);
    console.log("✔️ Site ayarları başarıyla oluşturuldu! Doküman ID:", result._id);
  } catch (error) {
    console.error("❌ Hata:", error.message);
  }
}

run();

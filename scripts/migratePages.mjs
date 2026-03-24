import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5unim43k',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-24',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function migrateData() {
  console.log('🔄 CMS Veri Göçü Başlatılıyor...');

  try {
    // 1. Ana Sayfa (Home Page) Settings
    console.log('📌 Ana Sayfa ayarları oluşturuluyor...');
    await client.createOrReplace({
      _id: 'homePage',
      _type: 'homePage',
      heroTitle: 'Doğayı Tasarlıyoruz.',
      heroSubtitle: 'Sürdürülebilir Ekosistemler. Her projede doğanın dilini konuşuyor, yaşam alanlarınızı dönüştürüyoruz.',
      stats: [
        { _key: '1', label: 'Tamamlanan Proje', value: 20, suffix: '+', prefix: '' },
        { _key: '2', label: 'Yıllık Tecrübe', value: 7, suffix: '+', prefix: '' },
        { _key: '3', label: 'Müşteri Memnuniyeti', value: 100, suffix: '', prefix: '%' },
        { _key: '4', label: 'Uzman Ekip Üyesi', value: 3, suffix: '+', prefix: '' },
      ],
      services: [
        { _key: '1', id: '01', title: 'Peyzaj Tasarımı', desc: 'Arazinin ruhunu okuyarak, doğayla iç içe vizyoner ve estetik konsept projeler tasarlıyoruz.', bg: 'linear-gradient(135deg, #1f291f 0%, #0a0d0a 100%)' },
        { _key: '2', id: '02', title: 'Akıllı Sert Zemin', desc: 'Ahşap, taş ve premium betonun kusursuz entegrasyonu ile dayanıklı mimari detaylar inşaa ediyoruz.', bg: 'linear-gradient(135deg, #1D1C1B 0%, #0a0a09 100%)' },
        { _key: '3', id: '03', title: '3D Modelleme', desc: 'Projenizi toprağa değmeden önce ultra-fotogerçekçi kalitede görün, VR desteğiyle içinde önce siz gezin.', bg: 'linear-gradient(135deg, #191A1E 0%, #0c0d0e 100%)' },
        { _key: '4', id: '04', title: 'Botanik Uygulama', desc: 'İklime tam uyumlu endemik ağaçlandırma, özel ithal türler ve büyüleyici premium botanik aranjmanlar.', bg: 'linear-gradient(135deg, #171816 0%, #080807 100%)' },
        { _key: '5', id: '05', title: 'Otonom Sulama', desc: 'Suyun her damlasını analiz edip koruyan, iklim okuyuculu akıllı sulama ve gizli drenaj sistemleri.', bg: 'linear-gradient(135deg, #1B1E22 0%, #0d0f11 100%)' },
        { _key: '6', id: '06', title: 'Eko Restorasyon', desc: 'Bozulmuş coğrafyaları onarıp kendi kendine yetebilen, zamana meydan okuyan biyolojik yaşam alanları.', bg: 'linear-gradient(135deg, #1E1B18 0%, #0f0d0c 100%)' },
      ]
    });
    console.log('✅ Ana Sayfa ayarları başarıyla aktarıldı.');

    // 2. Hakkımızda (About Page) Settings
    console.log('📌 Hakkımızda ayarları oluşturuluyor...');
    await client.createOrReplace({
      _id: 'aboutPage',
      _type: 'aboutPage',
      aboutTitle: 'Form ile Fonksiyonu Birleştiriyoruz.',
      aboutText1: 'Sadece bitki dikmiyoruz; yaşayan, nefes alan ve zamanla olgunlaşan ekosistemler kuruyoruz. Peşinde olduğumuz şey doğanın kendi mükemmelliğini modern insanın yaşam alanlarına saygıyla taşıyabilmek.',
      aboutText2: 'Konya merkezli firmamızda, hem bireysel ölçekli teras ve villalar hem de endüstriyel devasa ölçekli fabrikalar için prestij odaklı anahtar teslim proje hizmeti veriyoruz. Keşiften son çim biçmeye kadar sürecin her saniyesinde yanınızdayız.',
      missionTitle: 'Mimariyi Doğayla Barıştırıyoruz.',
      missionText: 'Mimari yapıların gri soğukluğunu, doğanın canlı renkleriyle dengeliyoruz. Bireye özel fonksiyonel peyzaj çözümleri üretirken, ekolojik dengeyi koruyan, su ayak izini düşüren ve doğanın iyileştirici gücünü insanla buluşturan kusursuz bir mühendislik ortaya koyuyoruz.',
      visionTitle: 'Ölümsüz Ekosistemler.',
      visionText: 'Ulusal ve uluslararası ölçekte, peyzaj mimarlığının kurallarını sürdürülebilir bir eksende yeniden yazmak. 50 yıl sonra bile kendi kendine yetebilen, zamana meydan okuyan ve sonraki nesillere nefes olacak referans statüsünde doğal yaşam harikaları bırakmak.'
    });
    console.log('✅ Hakkımızda ayarları başarıyla aktarıldı.');

    // 3. İletişim (Contact Page) Settings
    console.log('📌 İletişim ayarları oluşturuluyor...');
    await client.createOrReplace({
      _id: 'contactPage',
      _type: 'contactPage',
      address: 'Nişantaş, İkra Sk. Nasip Sit. No:1/c B Blok, 42090 Selçuklu / Konya',
      phone: '0531 343 66 12',
      email: 'info@lartpeyzaj.com',
      instagramUrl: 'https://www.instagram.com/lartpeyzajmimarlik/',
      whatsappNumber: '+905313436612',
      mapLink: 'https://maps.app.goo.gl/xDZ6jpDK7W6NJdpF6',
      workingHours: [
        { _key: '1', days: 'Pzt - Cuma', hours: '09:00 — 18:30' },
        { _key: '2', days: 'Cumartesi', hours: '09:00 — 14:00' },
        { _key: '3', days: 'Pazar', hours: 'Kapalı' },
      ]
    });
    console.log('✅ İletişim ayarları başarıyla aktarıldı.');

    // 4. Ekip Üyeleri (Team Members)
    console.log('📌 Ekip üyeleri aktarılıyor...');
    const members = [
      {
        _type: 'teamMember',
        name: 'Mete Anıl Küçük',
        role: 'Kurucu & Peyzaj Mimarı',
        desc: '7 yıllık tecrübesiyle L\'art Peyzaj\'ın vizyonunu şekillendiriyor. Modern ve sürdürülebilir tasarımların baş mimarı olarak doğaya estetik dokunuşlar katıyor.',
        order: 1
      },
      {
        _type: 'teamMember',
        name: 'Berkan Koca',
        role: 'Kurucu & Peyzaj Mimarı',
        desc: '7 yıllık saha ve tasarım tecrübesiyle projelerin kusursuz uygulanmasına liderlik ediyor. Estetik vizyonu, mühendislik disipliniyle harmanlıyor.',
        order: 2
      },
      {
        _type: 'teamMember',
        name: 'Mehmet Ozan Aktürk',
        role: 'Peyzaj Mimarı & Tasarımcı',
        desc: '7 yıllık tecrübesiyle yenilikçi peyzaj konseptlerine hayat veriyor. Tasarım sürecinin her aşamasında sanatsal yaklaşımıyla ekibe ilham kaynağı oluyor.',
        order: 3
      }
    ];

    for (const member of members) {
      await client.create(member);
      console.log(`- ${member.name} eklendi.`);
    }
    console.log('✅ Ekip başarıyla aktarıldı.');

    console.log('🎉 TÜM VERİ GÖÇÜ BAŞARIYLA TAMAMLANDI!');
  } catch (error) {
    console.error('❌ Hata oluştu:', error);
  }
}

migrateData();

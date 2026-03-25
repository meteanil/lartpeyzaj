import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

const client = createClient({
  projectId: '5unim43k',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skvPKUy1J6ppvk8zgGbhOV10xsJ5SQun5nNSXoMy3kRwF6efNUqRYiycXJcGSyaqNlxvKLxlbGJ5jBKdQB4OVh18EfZB31eKcXZ3jJtuTAfw9yXnWpiuMpVwUslvzTZAxn5haS3YFLQg4Bj3LbvMnYm8Rzt3flKwloFxfPikIGPzU6xQbYwt',
  useCdn: false,
});

async function main() {
  console.log("Starting Phase 4 Patch Migration...");

  // 1. Patch HomePage
  console.log("Patching homePage...");
  await client.createIfNotExists({ _id: 'homePage', _type: 'homePage' });
  await client.patch('homePage').set({
    aboutTitle: "Form ile Fonksiyonu Birleştiriyoruz.",
    aboutText1: "Sadece bitki dikmiyoruz; yaşayan, nefes alan ve zamanla olgunlaşan ekosistemler kuruyoruz. Peşinde olduğumuz şey doğanın kendi mükemmelliğini modern insanın yaşam alanlarına saygıyla taşıyabilmek.",
    aboutText2: "Konya merkezli firmamızda, hem bireysel ölçekli teras ve villalar hem de endüstriyel devasa ölçekli fabrikalar için prestij odaklı anahtar teslim proje hizmeti veriyoruz. Keşiften son çim biçmeye kadar sürecin her saniyesinde yanınızdayız.",
    projectsTitle: "Doğaya Bıraktığımız İmzalar.",
    projectsSubtitle: "Her projemiz, doğanın ve mimarinin birlikte nefes aldığı bir hikâye.",
    processTitle: "Her Proje Bir Yolculuktur.",
    processSubtitle: "Çalışma Sürecimiz",
    processSteps: [
      { id: "01", _key: "s1", title: "Tasarım & Planlama", desc: "Arazinin ruhunu okur, vizyoner konseptler çizeriz." },
      { id: "02", _key: "s2", title: "Sert & Yumuşak Uygulama", desc: "Dayanıklı materyaller ve canlı bitkilerle sahaya ineriz." },
      { id: "03", _key: "s3", title: "Sürdürülebilirlik & Bakım", desc: "İlk günkü parıltıyı koruyacak bakım planları sunarız." },
    ]
  }).commit();

  // 2. Patch AboutPage
  console.log("Patching aboutPage...");
  await client.createIfNotExists({ _id: 'aboutPage', _type: 'aboutPage' });
  await client.patch('aboutPage').set({
    heroTitle: "Doğanın İzini Şehre Kazıyoruz.",
    heroText: "Mekanın kendi ruhunu dinleyerek, estetikle mühendisliğin birleştiği o altın noktayı buluyoruz. Her bahçe bir şiir, her peyzaj projesi yaşam boyu nefes alan bir ekosistemdir.",
  }).commit();

  // 3. Patch ContactPage
  console.log("Patching contactPage for FAQs...");
  await client.createIfNotExists({ _id: 'contactPage', _type: 'contactPage' });
  await client.patch('contactPage').set({
    faqTitle: "Sıkça Sorulan Sorular.",
    faqs: [
      { _key: "q1", q: "Konya dışında veya yurtdışında proje yapıyor musunuz?", a: "Evet, operasyon merkezimiz Konya'da olmasına rağmen tüm Türkiye'de ve yurt dışında otel, resort, fabrika ve büyük ölçekli malikane projelerinin konsept tasarım ve anahtar teslim uygulamalarını yürütüyoruz." },
      { _key: "q2", q: "Bir projenin teslim süresi ortalama ne kadardır?", a: "Projelerin ölçeğine göre değişmekle birlikte, konsept tasarım süreci genellikle 2-4 hafta arası sürmektedir. Saha uygulama süreleri ise arazinin büyüklüğüne ve sert zemin yapı elemanlarının yoğunluğuna göre proje bazlı belirlenir." },
      { _key: "q3", q: "Uzaktan tasarım ve 3D Modelleme hizmeti alabilir miyim?", a: "Kesinlikle. Sahayı biz bizzat ziyaret etmesek bile, tarafınızdan iletilecek drone görüntüleri, harita ölçümleri ve mimari kat planları üzerinden ultra-gerçekçi 3D mimari peyzaj modelleme ve online revizyonlu danışmanlık hizmeti sunmaktayız." },
      { _key: "q4", q: "Sadece bitkisel uygulama mı yapıyorsunuz?", a: "Hayır, L'art Peyzaj Mimarlık olarak yalnızca yeşillendirme değil; arazinin altyapısı, drenaj sistemleri, otonom iklim duyarlı sulama ağları, yüzme havuzları, premium pergolalar, istinat duvarları ve tüm yapısal (sert) zemin mimarisini bizzat tasarlayıp uyguluyoruz." },
      { _key: "q5", q: "Randevu almadan ofise gelebilir miyim?", a: "Ofisimiz hafta içi her gün 09:00 - 18:30 arası açıktır. Çat kapı bir kahve içmeye her zaman gelebilirsiniz; ancak projeniz üzerinde baş mimarımızla detaylı bir toplantı yapmak isterseniz öncesinde telefonla randevu oluşturmanızı tavsiye ederiz." }
    ]
  }).commit();

  // 4. Upload Team Members Images
  console.log("Uploading Team Member Images...");
  
  const teamMembersRaw = [
    { name: "Mete Anıl Küçük", file: "mete-anil.webp" },
    { name: "Berkan Koca", file: "berkan.webp" },
    { name: "Mehmet Ozan Aktürk", file: "ozan-akturk.webp" }
  ];

  const existingMembers = await client.fetch('*[_type == "teamMember"]');

  for (const t of teamMembersRaw) {
    const memberId = existingMembers.find(m => m.name === t.name)?._id;
    if (!memberId) {
       console.log("Skipping", t.name, "- Not found in Sanity");
       continue;
    }
    const filePath = path.resolve(process.cwd(), 'public', 'Ekip', t.file);
    if (fs.existsSync(filePath)) {
      console.log("Uploading image for", t.name);
      try {
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
          filename: t.file
        });
        await client.patch(memberId).set({
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
          }
        }).commit();
        console.log("Success uploading image for", t.name);
      } catch (err) {
        console.error("Failed to upload image for", t.name, err.message);
      }
    } else {
      console.log("File not found for", t.name, filePath);
    }
  }

  console.log("Phase 4 Patch Migration Complete!");
}

main().catch(console.error);

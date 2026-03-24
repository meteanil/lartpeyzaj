import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5unim43k',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-24',
  token: 'skvPKUy1J6ppvk8zgGbhOV10xsJ5SQun5nNSXoMy3kRwF6efNUqRYiycXJcGSyaqNlxvKLxlbGJ5jBKdQB4OVh18EfZB31eKcXZ3jJtuTAfw9yXnWpiuMpVwUslvzTZAxn5haS3YFLQg4Bj3LbvMnYm8Rzt3flKwloFxfPikIGPzU6xQbYwt',
});

const videos = {
  "Sait Dikici Villa": [
    "https://www.youtube.com/watch?v=ph4FiVTR3Y4",
    "https://www.youtube.com/watch?v=0y-NNOTpV40"
  ],
  "Necati Bey Villa": [
    "https://www.youtube.com/watch?v=6mNHzfylmOY"
  ],
  "Kaysan Mimarlık": [
    "https://www.youtube.com/watch?v=xeE3EZYD6Kk"
  ],
  "Mehmet Altıntaş Villa": [
    "https://www.youtube.com/watch?v=uRH51ISljng"
  ],
  "Kerem Nükte Gyo Yeniyol Ofis": [
    "https://www.youtube.com/watch?v=p6U-creqmnc"
  ]
};

async function run() {
  console.log("Videolar Patchleniyor...");
  for (const [title, vids] of Object.entries(videos)) {
    const docs = await client.fetch(`*[_type in ["application", "project"] && title == $title]`, { title });
    if (docs.length > 0) {
      const doc = docs[0];
      
      // Primitive string array in sanity needs a key if we want studio UI to be perfectly happy without "Missing Keys" warning.
      // But passing an array of strings directly to an array of type 'url' is perfectly valid in Sanity JSON.
      // E.g. ["http://...", "http://..."] works for 'url' arrays.
      const formattedVids = vids.map((url, i) => url); // simple strings

      await client.patch(doc._id).set({ youtubeVideos: formattedVids }).commit();
      console.log(`✔️ ${title} projesine videolar eklendi!`);
    } else {
      console.log(`❌ ${title} bulunamadı.`);
    }
  }
}

run().catch(console.error);

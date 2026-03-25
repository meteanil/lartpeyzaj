import { createClient } from '@sanity/client';
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
  console.log("Cleaning up old fields from aboutPage...");
  // Use unset to delete the fields that are no longer in aboutPageType.ts schema
  await client.patch('aboutPage')
    .unset(['aboutTitle', 'aboutText1', 'aboutText2'])
    .commit();
  console.log("Cleanup complete!");
}

main().catch(console.error);

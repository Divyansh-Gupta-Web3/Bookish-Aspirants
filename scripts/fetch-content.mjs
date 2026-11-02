import { writeFile } from 'node:fs/promises';

// The contents API returns the latest commit immediately, unlike raw.githubusercontent.com which caches for minutes.
const SOURCE_URL =
  'https://api.github.com/repos/Divyansh-Gupta-Web3/Bookish/contents/site-content.enc.json?ref=main';
const TARGET = 'content/site-content.json';

const headers = { Accept: 'application/vnd.github.raw+json', 'X-GitHub-Api-Version': '2022-11-28' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const response = await fetch(SOURCE_URL, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  JSON.parse(text);
  await writeFile(TARGET, text);
  console.log('Site content synced from GitHub.');
} catch (error) {
  console.warn(`Could not sync site content from GitHub (${error.message}); using local copy.`);
}

import siteContent from '@/content/site-content.json';
import type { Book, SiteContent } from '@/lib/content/schema';

type LegacyBook = Omit<Book, 'buyLink'> & {
  buyLink?: string;
  buyLinks?: { name: string; url: string }[];
};

// Older saved content stored several store links per book; keep the first one as the single buy link.
function normalizeBook({ buyLinks, buyLink, ...book }: LegacyBook): Book {
  return { ...book, buyLink: buyLink ?? buyLinks?.find((store) => store.url)?.url ?? '' };
}

export function normalizeContent(content: unknown): SiteContent {
  const raw = content as Omit<SiteContent, 'books'> & { books: LegacyBook[] };
  return { ...raw, books: raw.books.map(normalizeBook) };
}

export const CONTENT: SiteContent = normalizeContent(siteContent);

import type { SiteContent } from '@/lib/content/schema';

export function bookOptions(content: SiteContent) {
  return content.books.map((book) => ({ value: book.slug, label: book.title || book.slug }));
}

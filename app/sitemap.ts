import type { MetadataRoute } from 'next';
import { BOOKS } from '@/lib/library/books';
import { CATEGORIES } from '@/lib/library/categories';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/about'];
  const categoryPaths = CATEGORIES.map((category) => `/category/${category.slug}`);
  const bookPaths = BOOKS.map((book) => `/books/${book.slug}`);

  return [...staticPaths, ...categoryPaths, ...bookPaths].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}

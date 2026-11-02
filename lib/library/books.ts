import { CONTENT } from '@/lib/content';
import type { Book } from '@/lib/content/schema';

export type { Book } from '@/lib/content/schema';

export const BOOKS: Book[] = CONTENT.books;

export const CURRENTLY_READING = CONTENT.currentlyReading;

export const BOOK_OF_THE_MONTH = CONTENT.bookOfTheMonth;

export const BOOK_PAIRINGS = CONTENT.pairings;

export function getBook(slug: string) {
  return BOOKS.find((book) => book.slug === slug);
}

export function getBooksInCategory(categorySlug: string) {
  return BOOKS.filter((book) => book.categories.includes(categorySlug));
}

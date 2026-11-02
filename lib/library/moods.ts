import { CONTENT } from '@/lib/content';
import { getBook, type Book } from '@/lib/library/books';

export const MOODS = CONTENT.moods;

export type MoodId = string;

export function getBooksForMood(moodId: MoodId): Book[] {
  const mood = MOODS.find((item) => item.id === moodId);
  if (!mood) return [];
  return mood.bookSlugs
    .map((slug) => getBook(slug))
    .filter((book): book is Book => Boolean(book));
}

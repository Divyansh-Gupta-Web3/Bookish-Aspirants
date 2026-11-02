import type { BookCoverTone } from '@/components/book/book-cover';

export type Book = {
  slug: string;
  title: string;
  author: string;
  genre: string;
  categories: string[];
  tone: BookCoverTone;
  coverImage: string;
  buyLink: string;
  rating: number;
  personalNote: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Mood = {
  id: string;
  label: string;
  bookSlugs: string[];
};

export type SiteContent = {
  site: {
    name: string;
    creator: string;
    tagline: string;
    email: string;
    instagramUrl: string;
    affiliateDisclosure: string;
  };
  hero: { headline: string };
  books: Book[];
  categories: Category[];
  currentlyReading: { slug: string; personalNote: string; pagesRead: number; totalPages: number };
  bookOfTheMonth: { slug: string; monthLabel: string; recommendation: string };
  pairings: { first: string; second: string; reason: string }[];
  readerReviews: { bookSlug: string; date: string; rating: number; excerpt: string }[];
  latestReads: { bookSlug: string; finishedOn: string; note: string }[];
  favouriteQuotes: { text: string; source: string }[];
  readingNotes: string[];
  favouriteBookSlugs: string[];
  readingYear: {
    year: number;
    lastUpdated: string;
    goalBooks: number;
    booksFinished: number;
    pagesRead: number;
    favouriteGenre: string;
    note: string;
  };
  moods: Mood[];
  diaryEntries: { date: string; text: string; bookSlug: string }[];
};

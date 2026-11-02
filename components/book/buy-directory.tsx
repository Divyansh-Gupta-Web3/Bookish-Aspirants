'use client';

import { useCallback, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { BookCover } from '@/components/book/book-cover';
import { BookDetailModal } from '@/components/book/book-detail-modal';
import { BuyLinks } from '@/components/book/buy-links';
import type { Book, Category } from '@/lib/content/schema';

type BuyDirectoryProps = {
  books: Book[];
  categories: Category[];
};

export function BuyDirectory({ books, categories }: BuyDirectoryProps) {
  const [text, setText] = useState('');
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const closeDetail = useCallback(() => setSelectedSlug(null), []);
  const selectedBook = books.find((book) => book.slug === selectedSlug);

  const query = text.trim().toLowerCase();

  const visibleBooks = useMemo(
    () =>
      books.filter((book) => {
        if (categorySlug && !book.categories.includes(categorySlug)) return false;
        if (!query) return true;
        return `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(query);
      }),
    [books, categorySlug, query]
  );

  return (
    <>
      <div className="mt-16 flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center gap-4 rounded-sm border border-ink-300 bg-parchment-50 px-5 py-4 transition-colors duration-300 focus-within:border-burgundy-700">
          <Search className="h-5 w-5 shrink-0 text-ink-500" aria-hidden="true" />
          <input
            type="search"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Search by title, author or genre"
            aria-label="Search books"
            className="min-w-0 flex-1 bg-transparent font-body text-lg text-ink-800 placeholder:text-ink-400 focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-4 rounded-sm border border-ink-300 bg-parchment-50 px-5 py-4 transition-colors duration-300 focus-within:border-burgundy-700 md:w-64">
          <span className="sr-only">Filter by category</span>
          <select
            value={categorySlug ?? ''}
            onChange={(event) => setCategorySlug(event.target.value || null)}
            className="min-w-0 flex-1 cursor-pointer bg-transparent font-body text-lg text-ink-800 focus:outline-none"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visibleBooks.length > 0 ? (
        <ul className="mt-12 divide-y divide-ink-300/40">
          {visibleBooks.map((book) => (
            <li key={book.slug} className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-10">
              <button
                type="button"
                onClick={() => setSelectedSlug(book.slug)}
                aria-label={`View details for ${book.title}`}
                className="group flex min-w-0 items-center gap-5 rounded-sm text-left"
              >
                <span className="w-16 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} compact className="max-w-none" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-2xl leading-snug text-ink-800 transition-colors duration-300 group-hover:text-burgundy-700">{book.title}</span>
                  <span className="mt-1 block font-flourish text-lg italic text-ink-500">{book.author}</span>
                </span>
              </button>
              <BuyLinks book={book} className="shrink-0" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mx-auto mt-16 max-w-xl text-center font-flourish text-2xl italic text-ink-600">
          No books match this search yet. Try another title, author or shelf.
        </p>
      )}

      {selectedBook && <BookDetailModal book={selectedBook} onClose={closeDetail} />}
    </>
  );
}

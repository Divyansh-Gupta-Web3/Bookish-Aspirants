'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { BookCover } from '@/components/book/book-cover';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { useWishlist } from '@/hooks/use-wishlist';
import { getBook, type Book } from '@/lib/library/books';

export function WishlistShelf() {
  const { slugs, toggle } = useWishlist();
  const books = slugs.map((slug) => getBook(slug)).filter((book): book is Book => Boolean(book));

  return (
    <section id="wishlist" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <PaperSheet>
        <ChapterHeading
          chapter="Chapter VII"
          title="My Wishlist"
          description="Books you have marked to read later. Saved on this device only, so they stay here until you clear your browser."
        />

        {books.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-5 text-center">
            <p className="font-flourish text-2xl italic text-ink-600">Nothing saved yet.</p>
            <p className="max-w-md font-body text-base leading-normal text-ink-500">
              Choose &ldquo;Save to wishlist&rdquo; under any book to keep it here for later.
            </p>
            <Link
              href="/#recommendations"
              className="nav-underline font-body text-sm text-burgundy-700 transition-colors duration-300 hover:text-burgundy-900"
            >
              Browse the shelf
            </Link>
          </div>
        ) : (
          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li key={book.slug} className="flex items-start gap-5">
                <Link href={`/books/${book.slug}`} aria-label={`View details for ${book.title}`} className="w-24 shrink-0 rounded-sm">
                  <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} compact className="max-w-none" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/books/${book.slug}`}
                    className="font-display text-lg leading-snug text-ink-800 transition-colors duration-300 hover:text-burgundy-700"
                  >
                    {book.title}
                  </Link>
                  <p className="mt-1 font-flourish text-base italic text-ink-500">{book.author}</p>
                  <button
                    type="button"
                    onClick={() => toggle(book.slug)}
                    className="mt-4 inline-flex items-center gap-2 font-body text-sm text-ink-500 transition-colors duration-300 hover:text-burgundy-700"
                  >
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </PaperSheet>
    </section>
  );
}

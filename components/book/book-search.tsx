'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';
import { BookCover } from '@/components/book/book-cover';
import { StarRating } from '@/components/book/star-rating';
import { BOOKS, type Book } from '@/lib/library/books';

function matchesQuery(book: Book, query: string) {
  return `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(query);
}

export function BookSearch() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const query = text.trim().toLowerCase();
  const results = query ? BOOKS.filter((book) => matchesQuery(book, query)) : [];

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search books"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-300 bg-parchment-50 text-ink-700 transition-colors duration-300 hover:border-burgundy-700 hover:text-burgundy-700"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex justify-center px-5 pt-20 md:pt-28" role="dialog" aria-modal="true" aria-label="Search books">
            <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={close} aria-hidden="true" />

            <div className="paper-texture relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-sm border border-parchment-300 shadow-cover animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-4 border-b border-parchment-300 px-6 py-5">
                <Search className="h-5 w-5 shrink-0 text-ink-500" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Search by title, author or genre"
                  aria-label="Search books"
                  className="min-w-0 flex-1 bg-transparent font-body text-lg text-ink-800 placeholder:text-ink-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close search"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-600 transition-colors duration-300 hover:bg-parchment-300 hover:text-burgundy-700"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="overflow-y-auto px-6">
                {!query && (
                  <p className="py-10 text-center font-flourish text-lg italic text-ink-500">
                    Type a title, an author or a genre to find a book and its details.
                  </p>
                )}

                {query && results.length === 0 && (
                  <p className="py-10 text-center font-flourish text-lg italic text-ink-500">
                    No books match &ldquo;{text.trim()}&rdquo;.
                  </p>
                )}

                {results.length > 0 && (
                  <ul className="divide-y divide-parchment-300">
                    {results.map((book) => (
                      <li key={book.slug}>
                        <Link
                          href={`/books/${book.slug}`}
                          onClick={close}
                          className="group flex gap-5 py-5 transition-colors duration-300"
                        >
                          <span className="w-16 shrink-0">
                            <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} compact className="max-w-none" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-body text-xs uppercase tracking-[0.2em] text-burgundy-700">{book.genre}</span>
                            <span className="mt-1 block font-display text-lg leading-snug text-ink-800 transition-colors duration-300 group-hover:text-burgundy-700">
                              {book.title}
                            </span>
                            <span className="block font-flourish text-base italic text-ink-500">{book.author}</span>
                            <StarRating rating={book.rating} className="mt-2" />
                            <span className="mt-2 line-clamp-2 block font-body text-sm leading-normal text-ink-600">{book.personalNote}</span>
                            <span className="nav-underline mt-3 inline-block font-body text-sm text-burgundy-700">View details</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

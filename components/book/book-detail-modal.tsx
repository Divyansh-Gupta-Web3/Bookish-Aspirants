'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { BookCover } from '@/components/book/book-cover';
import { BuyLinks } from '@/components/book/buy-links';
import { StarRating } from '@/components/book/star-rating';
import type { Book } from '@/lib/content/schema';

type BookDetailModalProps = {
  book: Book;
  onClose: () => void;
};

export function BookDetailModal({ book, onClose }: BookDetailModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-5 py-10" role="dialog" aria-modal="true" aria-label={book.title}>
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={onClose} aria-hidden="true" />

      <div className="paper-texture relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-parchment-300 shadow-cover animate-in fade-in slide-in-from-bottom-4 duration-300 md:flex-row">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-parchment-50/80 text-ink-600 transition-colors duration-300 hover:bg-parchment-300 hover:text-burgundy-700"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative h-56 w-full shrink-0 overflow-hidden bg-parchment-200/60 md:h-auto md:w-72">
          {book.coverImage ? (
            <>
              <img
                src={book.coverImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl brightness-90"
              />
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title} by ${book.author}`}
                className="relative mx-auto h-full w-auto max-w-full object-contain shadow-cover"
              />
            </>
          ) : (
            <BookCover
              title={book.title}
              author={book.author}
              tone={book.tone}
              className="aspect-auto h-full w-full max-w-none rounded-none shadow-none group-hover:translate-y-0 group-hover:rotate-0 group-hover:shadow-none"
            />
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-6 md:p-10">
          <div>
            <span className="block font-body text-xs uppercase tracking-[0.2em] text-burgundy-700">{book.genre}</span>
            <h2 className="mt-2 font-display text-2xl leading-tight text-ink-800 md:text-3xl">{book.title}</h2>
            <p className="mt-2 font-flourish text-lg italic text-ink-500">{book.author}</p>
            <StarRating rating={book.rating} className="mt-3" />
          </div>

          <p className="font-body text-base leading-relaxed text-ink-700">{book.personalNote}</p>

          <div className="mt-auto pt-2">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-ink-500">Buy this book</p>
            <BuyLinks book={book} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

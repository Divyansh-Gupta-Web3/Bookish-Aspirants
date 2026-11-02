import { BookCover } from '@/components/book/book-cover';
import { BookmarkButton } from '@/components/book/bookmark-button';
import { BuyLinks } from '@/components/book/buy-links';
import { PageNumber } from '@/components/book/page-number';
import { StarRating } from '@/components/book/star-rating';
import { BOOK_OF_THE_MONTH, getBook } from '@/lib/library/books';

export function BookOfTheMonth() {
  const book = getBook(BOOK_OF_THE_MONTH.slug);
  if (!book) return null;

  return (
    <section id="book-of-the-month" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <div className="paper-texture relative overflow-hidden rounded-sm border border-parchment-300 shadow-page">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex items-center justify-center bg-parchment-200/60 px-10 py-16 md:py-24">
            <div className="rotate-3 transition-transform duration-700 ease-out hover:rotate-1">
              <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} className="max-w-[300px]" />
            </div>
          </div>

          <div className="relative flex flex-col justify-center px-8 pb-24 pt-14 md:px-16 md:py-20">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Book of the Month &middot; {BOOK_OF_THE_MONTH.monthLabel}</p>
            <h2 className="mt-5 text-4xl font-semibold md:text-6xl">{book.title}</h2>
            <p className="mt-3 font-flourish text-xl italic text-ink-500">by {book.author}</p>
            <div className="mt-6">
              <StarRating rating={book.rating} />
            </div>

            <blockquote className="mt-10 border-l-2 border-dusty-500 pl-6">
              <p className="font-flourish text-2xl italic leading-snug text-ink-800">
                {BOOK_OF_THE_MONTH.recommendation}
              </p>
              <footer className="mt-4 font-body text-sm text-ink-500">A personal recommendation</footer>
            </blockquote>

            <div className="mt-10 flex flex-col gap-6">
              <BuyLinks book={book} />
              <div>
                <BookmarkButton href={`/books/${book.slug}`} selected>
                  Read the full review
                </BookmarkButton>
              </div>
            </div>
          </div>
        </div>
        <PageNumber value={27} className="absolute bottom-6 left-1/2 -translate-x-1/2" />
      </div>
    </section>
  );
}

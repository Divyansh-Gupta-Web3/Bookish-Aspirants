import { BookCover } from '@/components/book/book-cover';
import { BookmarkButton } from '@/components/book/bookmark-button';
import { BuyLinks } from '@/components/book/buy-links';
import { PageNumber } from '@/components/book/page-number';
import { OrnamentDivider } from '@/components/book/ornament';
import { getBook, CURRENTLY_READING } from '@/lib/library/books';

export function CurrentlyReading() {
  const book = getBook(CURRENTLY_READING.slug);
  if (!book) return null;

  const progress = Math.round((CURRENTLY_READING.pagesRead / CURRENTLY_READING.totalPages) * 100);

  return (
    <section id="currently-reading" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <div className="paper-texture relative grid overflow-hidden rounded-sm border border-parchment-300 shadow-page md:grid-cols-2">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink-700/15 to-transparent md:block"
        />

        <div className="relative flex flex-col items-center justify-center px-8 pb-24 pt-14 [perspective:1400px] md:px-14 md:py-20">
          <div className="transition-transform duration-700 ease-out [transform:rotateY(-14deg)_rotateX(3deg)] hover:[transform:rotateY(-4deg)_rotateX(1deg)] motion-reduce:transform-none">
            <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} className="max-w-[320px] md:max-w-[340px]" />
          </div>
          <PageNumber value={42} className="absolute bottom-6 left-1/2 -translate-x-1/2" />
        </div>

        <div className="relative flex flex-col justify-center border-t border-parchment-300 px-8 pb-24 pt-10 md:border-l md:border-t-0 md:px-14 md:py-20">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Currently reading</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">{book.title}</h2>
          <p className="mt-3 font-flourish text-xl italic text-ink-500">by {book.author}</p>
          <OrnamentDivider className="mt-8 max-w-xs justify-start" />

          <p className="mt-8 font-flourish text-2xl italic leading-snug text-ink-700">
            &ldquo;{CURRENTLY_READING.personalNote}&rdquo;
          </p>

          <div className="mt-10">
            <div className="flex items-baseline justify-between font-body text-sm text-ink-600">
              <span>Reading progress</span>
              <span>
                {CURRENTLY_READING.pagesRead} of {CURRENTLY_READING.totalPages} pages &middot; {progress}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Reading progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-3 h-2 w-full overflow-hidden rounded-full bg-parchment-300"
            >
              <div className="h-full rounded-full bg-burgundy-700 transition-[width] duration-1000 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6">
            <BuyLinks book={book} />
            <div>
              <BookmarkButton href={`/books/${book.slug}`} selected>
                Discover this book
              </BookmarkButton>
            </div>
          </div>
          <PageNumber value={43} className="absolute bottom-6 left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}

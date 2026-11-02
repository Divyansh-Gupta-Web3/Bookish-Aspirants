import Link from 'next/link';
import { BookCover } from '@/components/book/book-cover';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { StarRating } from '@/components/book/star-rating';
import { BOOKS, getBook, type Book } from '@/lib/library/books';
import { FAVOURITE_BOOK_SLUGS } from '@/lib/library/journal';

const TOP_RATED = [...BOOKS]
  .filter((book) => book.rating >= 4.5 && !FAVOURITE_BOOK_SLUGS.includes(book.slug))
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5);

export function ReadersShelf() {
  const favourites = FAVOURITE_BOOK_SLUGS.map((slug) => getBook(slug)).filter(
    (book): book is Book => Boolean(book)
  );

  return (
    <section id="readers-shelf" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <PaperSheet>
        <ChapterHeading
          chapter="Chapter VI"
          title="The Reader's Shelf"
          description="The books I would save from a fire, and the ones that have earned the highest marks on my shelf."
        />

        <div className="mt-16">
          <h3 className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">My favourites</h3>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {favourites.map((book) => (
              <li key={book.slug} className="group flex flex-col items-center text-center">
                <Link href={`/books/${book.slug}`} aria-label={`View details for ${book.title}`} className="block w-full max-w-[160px] rounded-sm">
                  <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} className="max-w-none" />
                </Link>
                <p className="mt-5 font-display text-base text-ink-800">{book.title}</p>
                <StarRating rating={book.rating} className="mt-2" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 border-t border-parchment-400 pt-14">
          <h3 className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Top-rated recommendations</h3>
          <ol className="mt-8 divide-y divide-parchment-400">
            {TOP_RATED.map((book, index) => (
              <li key={book.slug}>
                <Link
                  href={`/books/${book.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-4 py-5 transition-colors duration-300 hover:text-burgundy-700"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-body text-sm text-ink-500">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-display text-xl text-ink-800 transition-colors duration-300 group-hover:text-burgundy-700">
                      {book.title}
                    </span>
                    <span className="font-flourish text-lg italic text-ink-500">{book.author}</span>
                  </span>
                  <StarRating rating={book.rating} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </PaperSheet>
    </section>
  );
}

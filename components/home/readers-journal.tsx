import Link from 'next/link';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { StarRating } from '@/components/book/star-rating';
import { PaperSheet } from '@/components/book/paper-sheet';
import { FavouriteQuotes } from '@/components/home/favourite-quotes';
import { getBook } from '@/lib/library/books';
import { READER_REVIEWS, READING_NOTES } from '@/lib/library/journal';

export function ReadersJournal() {
  return (
    <section id="readers-journal" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <PaperSheet folio={31}>
        <ChapterHeading
          chapter="Chapter IV"
          title="The Reader's Journal"
          description="Honest reviews, favourite lines and notes kept in the margins of my own reading."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h3 className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Recent reviews</h3>
            <ul className="mt-8 space-y-10">
              {READER_REVIEWS.map((review) => {
                const book = getBook(review.bookSlug);
                if (!book) return null;
                return (
                  <li key={review.bookSlug} className="border-l-2 border-dusty-400 pl-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <Link
                        href={`/books/${book.slug}`}
                        className="nav-underline font-display text-2xl text-ink-800 transition-colors duration-300 hover:text-burgundy-700"
                      >
                        {book.title}
                      </Link>
                      <span className="font-body text-sm text-ink-500">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} className="mt-2" />
                    <p className="mt-4 font-body text-base leading-normal text-ink-600">{review.excerpt}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Favourite quotes</h3>
              <div className="mt-8">
                <FavouriteQuotes />
              </div>
            </div>

            <div className="rounded-sm border border-parchment-300 bg-parchment-100/70 p-7">
              <h3 className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Reading notes</h3>
              <ul className="ruled-paper mt-6 space-y-4 font-flourish text-lg italic leading-[32px] text-ink-700">
                {READING_NOTES.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PaperSheet>
    </section>
  );
}

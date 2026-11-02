import { BookCard } from '@/components/book/book-card';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { getBook } from '@/lib/library/books';

const FEATURED_SLUGS = [
  'jane-eyre',
  'the-name-of-the-wind',
  'rebecca',
  'the-god-of-small-things',
  'and-then-there-were-none',
  'beach-read',
];

export function Recommendations() {
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const book = getBook(slug);
    return book ? [book] : [];
  });

  return (
    <section id="recommendations" className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-20">
      <PaperSheet className="px-5 pb-10 md:px-14 md:pb-12">
        <ChapterHeading
          chapter="The Shelf"
          title="Books I think you'll love."
          description="Hand-picked favourites, each with a personal rating and a note on why it earned its place."
        />
        <ul className="-mx-5 mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 pb-6 md:mx-0 md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-20 md:overflow-visible md:px-0">
          {featured.map((book) => (
            <li key={book.slug} className="w-[240px] shrink-0 snap-center md:w-auto">
              <BookCard book={book} />
            </li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="mt-4 hidden h-3 rounded-sm bg-gradient-to-b from-parchment-400 to-parchment-600 shadow-page md:block"
        />
      </PaperSheet>
    </section>
  );
}

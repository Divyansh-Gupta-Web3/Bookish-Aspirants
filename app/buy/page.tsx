import type { Metadata } from 'next';
import { BuyDirectory } from '@/components/book/buy-directory';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { BOOKS } from '@/lib/library/books';
import { CATEGORIES } from '@/lib/library/categories';

export const metadata: Metadata = {
  title: 'Where to Buy',
  description: 'Every book from the shelf, with links to buy it.',
};

export default function BuyPage() {
  const booksWithLinks = BOOKS.filter((book) => book.buyLink);

  return (
    <main className="mx-auto max-w-4xl px-5 pb-28 pt-6 md:px-10 md:pt-10">
      <ChapterHeading
        chapter="Where to Buy"
        title="Every book, one place."
        description="Search or pick a shelf, then tap Buy Now."
      />

      {booksWithLinks.length > 0 ? (
        <BuyDirectory books={booksWithLinks} categories={CATEGORIES} />
      ) : (
        <p className="mx-auto mt-20 max-w-xl text-center font-flourish text-2xl italic text-ink-600">
          The purchase links are still being gathered. Check back soon.
        </p>
      )}
    </main>
  );
}

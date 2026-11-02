import Link from 'next/link';
import { Heart } from 'lucide-react';
import { BookCover } from '@/components/book/book-cover';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { BOOK_PAIRINGS, getBook } from '@/lib/library/books';

export function BookPairings() {
  return (
    <section id="if-you-loved-this" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <ChapterHeading
        chapter="Chapter III"
        title="If You Loved This, Read This"
        description="Books that speak to one another across the pages."
      />

      <ul className="mt-16 flex flex-col gap-16">
        {BOOK_PAIRINGS.map((pairing) => {
          const first = getBook(pairing.first);
          const second = getBook(pairing.second);
          if (!first || !second) return null;

          return (
            <li key={`${pairing.first}-${pairing.second}`} className="flex flex-col items-center gap-8">
              <div className="flex w-full items-center justify-center gap-4 md:gap-10">
                <Link href={`/books/${first.slug}`} className="w-[38%] max-w-[190px] transition-transform duration-500 ease-out hover:-translate-y-2 hover:-rotate-2">
                  <BookCover title={first.title} author={first.author} tone={first.tone} imageUrl={first.coverImage} className="max-w-none" />
                </Link>

                <div className="flex flex-col items-center gap-3 text-dusty-600">
                  <span className="hidden h-px w-10 border-t border-dashed border-dusty-500 md:block" aria-hidden="true" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-dusty-400 bg-parchment-50 shadow-page">
                    <Heart aria-hidden="true" className="h-5 w-5 fill-dusty-500 text-dusty-600" strokeWidth={1.25} />
                  </span>
                  <span className="hidden h-px w-10 border-t border-dashed border-dusty-500 md:block" aria-hidden="true" />
                </div>

                <Link href={`/books/${second.slug}`} className="w-[38%] max-w-[190px] transition-transform duration-500 ease-out hover:-translate-y-2 hover:rotate-2">
                  <BookCover title={second.title} author={second.author} tone={second.tone} imageUrl={second.coverImage} className="max-w-none" />
                </Link>
              </div>

              <p className="max-w-2xl text-center font-flourish text-xl italic leading-snug text-ink-700">
                {pairing.reason}
              </p>
              <p className="font-body text-sm text-ink-500">
                {first.title} &amp; {second.title}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookCover } from '@/components/book/book-cover';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { StarRating } from '@/components/book/star-rating';
import { getBook } from '@/lib/library/books';
import { LATEST_READS } from '@/lib/library/journal';

const EDGE_TOLERANCE = 4;

export function LatestReads() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > EDGE_TOLERANCE);
    setCanScrollNext(track.scrollLeft < maxScroll - EDGE_TOLERANCE);
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const reads = LATEST_READS.flatMap((entry) => {
    const book = getBook(entry.bookSlug);
    return book ? [{ ...entry, book }] : [];
  });

  return (
    <section id="latest-reads" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <PaperSheet>
        <ChapterHeading
          chapter="Latest Reads"
          title="Books I have just finished."
          description="The most recent pages I have turned, with a line on how each one landed."
        />

        <div className="relative mt-16">
          <ul
            ref={trackRef}
            onScroll={updateEdges}
            className="-mx-5 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-5 pb-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reads.map(({ book, finishedOn, note }) => (
              <li key={book.slug} className="w-[240px] shrink-0 snap-start md:w-[280px]">
                <Link
                  href={`/books/${book.slug}`}
                  className="group flex h-full flex-col items-center text-center"
                >
                  <div className="w-full max-w-[190px] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-1">
                    <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} className="max-w-none" />
                  </div>
                  <p className="mt-6 font-body text-xs uppercase tracking-[0.25em] text-burgundy-700">
                    Finished {finishedOn}
                  </p>
                  <h3 className="mt-3 font-display text-xl leading-snug text-ink-800 transition-colors duration-300 group-hover:text-burgundy-700">
                    {book.title}
                  </h3>
                  <p className="mt-1 font-flourish text-base italic text-ink-500">{book.author}</p>
                  <StarRating rating={book.rating} className="mt-3" />
                  <p className="mt-4 font-flourish text-base italic leading-snug text-ink-600">&ldquo;{note}&rdquo;</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label="Show previous books"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-300 bg-parchment-50 text-ink-700 transition-colors duration-300 hover:border-burgundy-700 hover:text-burgundy-700 disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label="Show next books"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-300 bg-parchment-50 text-ink-700 transition-colors duration-300 hover:border-burgundy-700 hover:text-burgundy-700 disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </PaperSheet>
    </section>
  );
}

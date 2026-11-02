import Image from 'next/image';
import { BookmarkButton } from '@/components/book/bookmark-button';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { SITE } from '@/lib/site';

export function DiaryIntro() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <PaperSheet>
        <ChapterHeading chapter="Prologue" title="The Silent Reader" align="left" />

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <figure className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="paper-texture -rotate-2 rounded-sm border border-parchment-300 bg-parchment-50 p-3 pb-14 shadow-cover">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="https://images.pexels.com/photos/7095568/pexels-photo-7095568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="A cozy wooden table with an open book, a ceramic cup and stacked books"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center font-flourish text-lg italic text-ink-600">
                my desk, most evenings
              </p>
            </div>
            <span
              aria-hidden="true"
              className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 -rotate-3 bg-dusty-300/70 shadow-sm"
            />
            <p
              aria-hidden="true"
              className="absolute -right-2 top-[62%] hidden max-w-[10rem] rotate-6 font-hand text-2xl leading-tight text-burgundy-700 md:block"
            >
              the lamp is always on
            </p>
          </figure>

          <div className="relative">
            <div className="paper-texture relative rotate-1 rounded-sm border border-parchment-300 bg-parchment-50 px-7 pb-12 pt-8 shadow-cover md:px-12">
              <div className="flex items-baseline justify-between gap-4 border-b border-parchment-400 pb-3">
                <p className="font-body text-xs uppercase tracking-[0.3em] text-ink-500">{SITE.name}</p>
                <p className="font-hand text-xl text-ink-500">written by lamplight</p>
              </div>

              <div className="ruled-paper mt-4 font-hand text-[22px] leading-[32px] text-ink-700">
                <p className="text-[26px] text-burgundy-700">Dear reader,</p>
                <p>
                  I read quietly, mostly in the evenings, with the lamp pulled close and the kettle going cold beside
                  me. The books that changed me sit on a shelf I can see from my desk, and {SITE.name} is my way of
                  sharing them with you.
                </p>
                <p>
                  Every recommendation here is a book I have finished, underlined and thought about for longer than I
                  expected. You will find honest ratings and small notes, and the occasional book I did not love,
                  because those matter too.
                </p>
                <p className="relative inline-block italic text-ink-500">
                  Reading is the only place I feel completely unhurried.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-2.5 w-full text-dusty-500"
                  >
                    <path d="M2 8 C 40 2, 70 12, 110 6 S 190 2, 230 7 S 280 10, 298 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </p>
                <p className="mt-4">With ink-stained fingers,</p>
                <p className="font-display text-2xl text-burgundy-700">The Silent Reader</p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <BookmarkButton href="/#contact" selected>
                Write to me
              </BookmarkButton>
              <BookmarkButton href="/#recommendations">Browse the shelf</BookmarkButton>
            </div>
          </div>
        </div>
      </PaperSheet>
    </section>
  );
}

import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { READING_YEAR } from '@/lib/library/journal';

export function ReadingJourney() {
  const { year, lastUpdated, goalBooks, booksFinished, pagesRead, favouriteGenre, note } = READING_YEAR;
  const progress = Math.min(100, Math.round((booksFinished / goalBooks) * 100));
  const booksLeft = Math.max(0, goalBooks - booksFinished);

  return (
    <section id="reading-journey" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <PaperSheet>
        <ChapterHeading
          chapter="Chapter II"
          title={`My Reading Journey, ${year}`}
          description="A quiet tally of the year so far."
        />

        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 border border-ochre-500/60 bg-ochre-100/60 px-4 py-1.5 font-body text-xs uppercase tracking-[0.25em] text-ochre-700">
            Manually updated, last on {lastUpdated}
          </span>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div>
            <div className="flex items-end justify-between gap-6">
              <p className="font-display text-6xl leading-none text-burgundy-700 md:text-7xl">
                {booksFinished}
                <span className="font-flourish text-3xl italic text-ink-500"> / {goalBooks}</span>
              </p>
              <p className="pb-2 font-body text-sm text-ink-500">books this year</p>
            </div>

            <div
              role="progressbar"
              aria-label="Yearly reading goal"
              aria-valuemin={0}
              aria-valuemax={goalBooks}
              aria-valuenow={booksFinished}
              className="mt-8 h-2 w-full overflow-hidden rounded-full bg-parchment-300"
            >
              <div
                className="h-full rounded-full bg-burgundy-700 transition-[width] duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 font-body text-sm text-ink-600">
              {progress}% of my goal. {booksLeft} more to reach {goalBooks}.
            </p>

            <p className="mt-10 border-l-2 border-dusty-500 pl-6 font-flourish text-2xl italic leading-snug text-ink-800">
              {note}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-sm bg-parchment-400 shadow-page">
            <div className="flex flex-col gap-2 bg-parchment-50 p-6">
              <dt className="font-body text-xs uppercase tracking-[0.2em] text-ink-500">Pages read</dt>
              <dd className="font-display text-3xl text-ink-800">{pagesRead.toLocaleString('en-IN')}</dd>
            </div>
            <div className="flex flex-col gap-2 bg-parchment-50 p-6">
              <dt className="font-body text-xs uppercase tracking-[0.2em] text-ink-500">Goal</dt>
              <dd className="font-display text-3xl text-ink-800">{goalBooks} books</dd>
            </div>
            <div className="col-span-2 flex flex-col gap-2 bg-parchment-50 p-6">
              <dt className="font-body text-xs uppercase tracking-[0.2em] text-ink-500">Most-read genre</dt>
              <dd className="font-flourish text-2xl italic text-ink-800">{favouriteGenre}</dd>
            </div>
          </dl>
        </div>
      </PaperSheet>
    </section>
  );
}

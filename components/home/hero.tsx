import { ChevronDown } from 'lucide-react';
import { OpeningBook } from '@/components/home/opening-book';
import { FloatingSprig } from '@/components/book/ornament';
import { CONTENT } from '@/lib/content';
import { SITE } from '@/lib/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <FloatingSprig className="right-[8%] top-28 hidden h-12 w-12 md:block" delay="-3s" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-10 md:pb-14 md:pt-10">
        <div>
          <p className="font-flourish text-lg uppercase tracking-[0.35em] text-burgundy-700">
            {SITE.name} &middot; by {SITE.creator}
          </p>
          <h1 className="mt-6 text-5xl font-semibold md:text-6xl">
            {CONTENT.hero.headline}
          </h1>
          <p className="mt-8 max-w-xl font-body text-lg leading-normal text-ink-600 italic">
            {SITE.tagline}
          </p>
          <a
            href="#currently-reading"
            className="nav-underline group mt-12 inline-flex items-center gap-3 font-flourish text-xl italic text-ink-700 transition-colors duration-300 hover:text-burgundy-700"
          >
            Explore my bookshelf
            <ChevronDown
              aria-hidden="true"
              className="h-5 w-5 motion-safe:animate-bounce"
              strokeWidth={1.5}
            />
          </a>
        </div>

        <OpeningBook />
      </div>
    </section>
  );
}

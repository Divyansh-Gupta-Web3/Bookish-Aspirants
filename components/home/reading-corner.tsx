import Image from 'next/image';
import { BookmarkButton } from '@/components/book/bookmark-button';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { Parallax } from '@/components/book/parallax';

export function ReadingCorner() {
  return (
    <section id="reading-corner" className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-28 md:grid-cols-2 md:gap-20 md:px-10">
      <Parallax speed={0.04} className="relative">
        <div className="paper-texture rounded-sm border border-parchment-300 p-3 shadow-page">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="https://images.pexels.com/photos/30861113/pexels-photo-30861113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="A warm reading corner with a sofa, stacked books and soft lamplight"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </Parallax>

      <div>
        <ChapterHeading
          chapter="Chapter V"
          title="My Reading Corner"
          align="left"
        />
        <p className="mt-8 font-body text-lg leading-normal text-ink-600">
          A lamp, a blanket and a stack of books waiting on the arm of the sofa. This is where most of the
          recommendations on this site were first read, underlined and argued with.
        </p>
        <div className="mt-10">
          <BookmarkButton href="/about">Meet me, the reader behind the shelf</BookmarkButton>
        </div>
      </div>
    </section>
  );
}

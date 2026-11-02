import Image from 'next/image';
import { Instagram, Play } from 'lucide-react';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { getCategory } from '@/lib/library/categories';
import { SITE } from '@/lib/site';

const PREVIEW_TILES = [
  { slug: 'romance', caption: 'Letters & roses', reel: false },
  { slug: 'fantasy', caption: 'Forest reading hour', reel: true },
  { slug: 'psychological-thriller', caption: 'Corridor reads', reel: false },
  { slug: 'self-help', caption: 'Morning journal', reel: true },
  { slug: 'young-adult', caption: 'Sunlit pages', reel: false },
  { slug: 'hidden-gems', caption: 'Back shelf finds', reel: false },
] as const;

export function InstagramCorner() {
  const tiles = PREVIEW_TILES.flatMap((tile) => {
    const category = getCategory(tile.slug);
    return category ? [{ ...tile, image: category.image }] : [];
  });

  return (
    <section id="instagram" className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <ChapterHeading
        chapter="Chapter VIII"
        title="Follow Along on Instagram"
        description="Posts and Reels from the reading desk, shared as they happen."
      />

      <ul className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {tiles.map((tile) => (
          <li key={tile.slug}>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tile.caption} on Instagram (opens in a new tab)`}
              className="group relative block aspect-square overflow-hidden rounded-sm border border-parchment-300 bg-ink-800 shadow-page"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
              {tile.reel && (
                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-parchment-50/95 px-3 py-1 font-body text-xs text-ink-800">
                  <Play aria-hidden="true" className="h-3 w-3 fill-current" />
                  Reel
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 p-4 font-flourish text-lg italic leading-snug text-parchment-50">
                {tile.caption}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-sm border border-burgundy-700 px-6 py-3 font-body text-sm tracking-wide text-burgundy-700 transition-colors duration-300 hover:bg-burgundy-700 hover:text-parchment-50"
        >
          <Instagram aria-hidden="true" className="h-4 w-4" />
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}

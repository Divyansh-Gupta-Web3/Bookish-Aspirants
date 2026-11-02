import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { CATEGORIES } from '@/lib/library/categories';
import { getBooksInCategory } from '@/lib/library/books';

export function CategoriesGrid() {
  return (
    <section id="categories" className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-28">
      <ChapterHeading
        chapter="Chapter II"
        title="Explore by Category"
        description="Wander through the shelves by mood, genre or the kind of story you need tonight."
      />

      <ul className="mt-10 grid grid-cols-2 gap-4 md:mt-16 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {CATEGORIES.map((category) => {
          const count = getBooksInCategory(category.slug).length;
          return (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm border border-parchment-300 bg-ink-800 shadow-page transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-cover-hover"
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/35 to-transparent" aria-hidden="true" />
                <span className="absolute inset-3 rounded-sm border border-parchment-100/30" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                  <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-parchment-200 md:text-xs md:tracking-[0.25em]">
                    {count} {count === 1 ? 'book' : 'books'}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h3 className="font-display text-lg leading-[1.2] text-parchment-50 md:text-2xl">{category.name}</h3>
                    <ArrowRight
                      aria-hidden="true"
                      className="mb-1 h-5 w-5 shrink-0 text-parchment-50 transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-2 max-h-0 overflow-hidden font-flourish text-base italic leading-snug text-parchment-100 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {category.description}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

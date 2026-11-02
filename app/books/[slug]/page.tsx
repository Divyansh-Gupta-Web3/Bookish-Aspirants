import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookCover } from '@/components/book/book-cover';
import { BookCard } from '@/components/book/book-card';
import { BookmarkButton } from '@/components/book/bookmark-button';
import { BuyLinks } from '@/components/book/buy-links';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { StarRating } from '@/components/book/star-rating';
import { WishlistButton } from '@/components/book/wishlist-button';
import { BOOKS, getBook } from '@/lib/library/books';
import { getCategory } from '@/lib/library/categories';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return BOOKS.map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const book = getBook(params.slug);
  if (!book) return { title: 'Book' };
  return { title: book.title, description: book.personalNote };
}

export default function BookPage({ params }: PageProps) {
  const book = getBook(params.slug);
  if (!book) notFound();

  const related = BOOKS.filter(
    (other) => other.slug !== book.slug && other.categories.some((slug) => book.categories.includes(slug))
  ).slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-5 pb-28 pt-12 md:px-10 md:pt-16">
      <PaperSheet>
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <div className="flex justify-center md:justify-start">
            <div className="book-open-in -rotate-2">
              <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} className="max-w-[300px]" />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">{book.genre}</p>
            <h1 className="mt-4 text-4xl font-semibold md:text-6xl">{book.title}</h1>
            <p className="mt-3 font-flourish text-xl italic text-ink-500">by {book.author}</p>
            <StarRating rating={book.rating} className="mt-6" />

            <blockquote className="mt-10 border-l-2 border-dusty-500 pl-6">
              <p className="font-flourish text-2xl italic leading-snug text-ink-800">{book.personalNote}</p>
              <footer className="mt-4 font-body text-sm text-ink-500">My personal note</footer>
            </blockquote>

            <div className="mt-10">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-ink-500">Find it in these shelves</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {book.categories.map((slug) => {
                  const category = getCategory(slug);
                  if (!category) return null;
                  return (
                    <BookmarkButton key={slug} href={`/category/${category.slug}`}>
                      {category.name}
                    </BookmarkButton>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start gap-5">
              <BuyLinks book={book} />
              <WishlistButton slug={book.slug} />
            </div>
          </div>
        </div>
      </PaperSheet>

      {related.length > 0 && (
        <section className="mt-24">
          <ChapterHeading chapter="Further Reading" title="More from these shelves" />
          <ul className="mt-14 grid grid-cols-1 justify-items-center gap-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <BookCard book={other} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-20 flex justify-center">
        <Link href="/#recommendations" className="nav-underline font-flourish text-xl italic text-ink-700 transition-colors duration-300 hover:text-burgundy-700">
          Back to the shelf
        </Link>
      </div>
    </main>
  );
}

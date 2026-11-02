import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookCard } from '@/components/book/book-card';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { getBooksInCategory } from '@/lib/library/books';
import { CATEGORIES, getCategory } from '@/lib/library/categories';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: 'Category' };
  return { title: category.name, description: category.description };
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const books = getBooksInCategory(category.slug);

  return (
    <main className="mx-auto max-w-6xl px-5 pb-28 pt-16 md:px-10 md:pt-24">
      <ChapterHeading chapter="Category" title={category.name} description={category.description} />

      {books.length > 0 ? (
        <ul className="mt-20 grid grid-cols-1 justify-items-center gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <li key={book.slug}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mx-auto mt-20 max-w-xl text-center font-flourish text-2xl italic text-ink-600">
          The books for this shelf are still being gathered. Check back soon.
        </p>
      )}

      <div className="mt-24 flex justify-center">
        <Link href="/#categories" className="nav-underline font-flourish text-xl italic text-ink-700 transition-colors duration-300 hover:text-burgundy-700">
          Back to all categories
        </Link>
      </div>
    </main>
  );
}

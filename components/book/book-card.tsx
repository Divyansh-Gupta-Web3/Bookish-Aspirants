import Link from 'next/link';
import { BookCover } from '@/components/book/book-cover';
import { BookmarkButton } from '@/components/book/bookmark-button';
import { BuyLinks } from '@/components/book/buy-links';
import { StarRating } from '@/components/book/star-rating';
import { WishlistButton } from '@/components/book/wishlist-button';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/library/books';

type BookCardProps = {
  book: Book;
  className?: string;
};

export function BookCard({ book, className }: BookCardProps) {
  return (
    <article className={cn('group flex flex-col items-center text-center', className)}>
      <Link
        href={`/books/${book.slug}`}
        aria-label={`View details for ${book.title}`}
        className="block w-full max-w-[200px] rounded-sm focus-visible:outline-none"
      >
        <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} className="max-w-none" />
      </Link>

      <div className="mt-7 flex flex-col items-center gap-2">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-burgundy-700">{book.genre}</p>
        <h3 className="font-display text-xl text-ink-800">{book.title}</h3>
        <p className="font-flourish text-lg italic text-ink-500">{book.author}</p>
        <StarRating rating={book.rating} className="mt-1" />
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 [&>div]:justify-center">
        <BookmarkButton href={`/books/${book.slug}`}>View details</BookmarkButton>
        <BuyLinks book={book} />
        <WishlistButton slug={book.slug} />
      </div>
    </article>
  );
}

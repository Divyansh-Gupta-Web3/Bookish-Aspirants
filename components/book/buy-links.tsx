import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/library/books';

type BuyLinksProps = {
  book: Pick<Book, 'buyLink'>;
  className?: string;
};

const linkStyles =
  'group inline-flex items-center gap-2 rounded-sm bg-ink-800 px-5 py-3 font-body text-sm font-semibold tracking-wide text-parchment-50 shadow-page transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-burgundy-700 hover:shadow-cover-hover';

export function BuyLinks({ book, className }: BuyLinksProps) {
  if (!book.buyLink) return null;

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <a href={book.buyLink} target="_blank" rel="noopener noreferrer" className={linkStyles}>
        Buy Now
        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

type BookmarkButtonProps = {
  children: React.ReactNode;
  selected?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const baseStyles =
  'group relative inline-flex items-center gap-2.5 border px-5 py-2.5 font-body text-sm tracking-wide transition-[background-color,color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 motion-reduce:hover:transform-none';

const idleStyles =
  'border-ink-300 bg-parchment-50 text-ink-700 hover:border-burgundy-700 hover:text-burgundy-700';

const selectedStyles = 'border-burgundy-700 bg-burgundy-700 text-parchment-50';

export function BookmarkButton({
  children,
  selected = false,
  href,
  onClick,
  className,
}: BookmarkButtonProps) {
  const styles = cn(baseStyles, selected ? selectedStyles : idleStyles, className);

  const content = (
    <>
      <Bookmark
        aria-hidden="true"
        className={cn(
          'h-4 w-4 transition-transform duration-500 ease-out',
          selected ? 'fill-current scale-110' : 'group-hover:-translate-y-0.5'
        )}
      />
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 top-full h-4 origin-top bg-burgundy-900 transition-transform duration-500 ease-out [clip-path:polygon(0_0,100%_0,100%_100%,50%_72%,0_100%)]',
          selected ? 'scale-y-100' : 'scale-y-0'
        )}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" aria-pressed={onClick ? selected : undefined} onClick={onClick} className={styles}>
      {content}
    </button>
  );
}

import { cn } from '@/lib/utils';
import { OrnamentDivider } from '@/components/book/ornament';

export type BookCoverTone = 'burgundy' | 'rose' | 'ink' | 'parchment';

const toneStyles: Record<BookCoverTone, string> = {
  burgundy: 'bg-burgundy-700 text-parchment-50',
  rose: 'bg-dusty-500 text-ink-900',
  ink: 'bg-ink-700 text-parchment-100',
  parchment: 'bg-parchment-200 text-ink-800 ring-1 ring-inset ring-parchment-400',
};

type BookCoverProps = {
  title: string;
  author: string;
  tone?: BookCoverTone;
  imageUrl?: string;
  compact?: boolean;
  className?: string;
};

export function BookCover({ title, author, tone = 'burgundy', imageUrl, compact = false, className }: BookCoverProps) {
  if (imageUrl) {
    return (
      <figure
        className={cn(
          'group relative aspect-[2/3] w-full max-w-[220px] overflow-hidden rounded-l-sm rounded-r-md shadow-cover transition-[transform,box-shadow] duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:-rotate-2 group-hover:shadow-cover-hover motion-reduce:group-hover:transform-none',
          className
        )}
      >
        <img src={imageUrl} alt={`Cover of ${title} by ${author}`} loading="lazy" className="h-full w-full scale-125 object-cover" />
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        'group relative aspect-[2/3] w-full max-w-[220px] [perspective:1000px]',
        className
      )}
    >
      <div
        className={cn(
          'relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-l-sm rounded-r-md text-center shadow-cover transition-[transform,box-shadow] duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:-rotate-2 group-hover:shadow-cover-hover motion-reduce:group-hover:transform-none',
          compact ? 'px-3 py-5' : 'px-7 py-9',
          toneStyles[tone]
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-black/35 via-black/10 to-transparent"
        />
        <span
          aria-hidden="true"
          className={cn('absolute rounded-sm border border-current opacity-25', compact ? 'inset-1.5' : 'inset-3')}
        />
        <span className={cn('relative leading-[1.2] font-display', compact ? 'text-sm' : 'text-2xl')}>{title}</span>
        <div className="relative w-full space-y-4">
          <OrnamentDivider className="text-current opacity-70" />
          <span className={cn('block font-flourish italic opacity-90', compact ? 'text-xs' : 'text-base')}>{author}</span>
        </div>
      </div>
    </figure>
  );
}

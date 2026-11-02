import { cn } from '@/lib/utils';
import { OrnamentDivider } from '@/components/book/ornament';

type ChapterHeadingProps = {
  chapter: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function ChapterHeading({
  chapter,
  title,
  description,
  align = 'center',
  className,
}: ChapterHeadingProps) {
  const isCenter = align === 'center';

  return (
    <header
      className={cn(
        'flex flex-col gap-5',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <p className="font-flourish text-lg uppercase tracking-[0.35em] text-burgundy-700">
        {chapter}
      </p>
      <h2 className="font-display text-4xl font-semibold text-ink-800 md:text-5xl">{title}</h2>
      <OrnamentDivider className={cn('max-w-xs text-dusty-600', !isCenter && 'justify-start')} />
      {description && (
        <p className="max-w-2xl font-body text-lg italic leading-normal text-ink-600">
          {description}
        </p>
      )}
    </header>
  );
}

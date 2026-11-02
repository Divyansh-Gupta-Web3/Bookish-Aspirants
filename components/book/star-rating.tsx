import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  className?: string;
};

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span role="img" aria-label={`Rated ${rating} out of 5`} className="inline-flex gap-0.5">
        {[1, 2, 3, 4, 5].map((position) => {
          const fill = Math.min(1, Math.max(0, rating - (position - 1)));
          return (
            <span key={position} className="relative inline-block h-4 w-4">
              <Star aria-hidden="true" strokeWidth={1.5} className="absolute inset-0 h-4 w-4 text-dusty-500" />
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 fill-burgundy-700 text-burgundy-700" />
              </span>
            </span>
          );
        })}
      </span>
      <span className="font-body text-sm text-ink-600">{rating.toFixed(1)}</span>
    </span>
  );
}

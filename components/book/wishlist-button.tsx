'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';

type WishlistButtonProps = {
  slug: string;
  className?: string;
};

export function WishlistButton({ slug, className }: WishlistButtonProps) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => toggle(slug)}
      className={cn(
        'group inline-flex items-center gap-2 rounded-sm font-body text-sm text-ink-600 transition-colors duration-300 hover:text-burgundy-700',
        saved && 'text-burgundy-700',
        className
      )}
    >
      <Heart
        aria-hidden="true"
        className={cn(
          'h-4 w-4 transition-transform duration-300 group-hover:scale-110',
          saved && 'fill-current'
        )}
      />
      {saved ? 'Saved to wishlist' : 'Save to wishlist'}
    </button>
  );
}

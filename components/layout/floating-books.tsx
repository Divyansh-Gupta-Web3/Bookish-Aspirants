import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

const BOOK_TONES = [
  'text-burgundy-700',
  'text-ochre-700',
  'text-sage-700',
  'text-ink-700',
  'text-brick-700',
  'text-dusty-700',
  'text-parchment-600',
];

const BOOK_COUNT = 28;

export function FloatingBooks() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {Array.from({ length: BOOK_COUNT }, (_, i) => {
        const tilt = (i % 2 === 0 ? 1 : -1) * (4 + ((i * 5) % 9));
        const style = {
          left: `${(i * 37) % 97}%`,
          top: `${(i * 53) % 100}%`,
          width: `${22 + ((i * 13) % 20)}px`,
          '--tilt': `${tilt}deg`,
        } as CSSProperties;

        return (
          <svg
            key={i}
            viewBox="0 0 40 56"
            style={style}
            className={cn(
              'floating-book pointer-events-auto absolute h-auto opacity-[0.16] hover:opacity-[0.3]',
              BOOK_TONES[i % BOOK_TONES.length]
            )}
          >
            <rect width="40" height="56" rx="2" fill="currentColor" />
            <rect width="7" height="56" rx="1" fill="#000" opacity="0.25" />
            <rect x="13" y="16" width="20" height="3" fill="#F5E2BE" opacity="0.8" />
            <rect x="13" y="22" width="14" height="2" fill="#F5E2BE" opacity="0.6" />
            <rect x="13" y="38" width="20" height="2" fill="#F5E2BE" opacity="0.5" />
          </svg>
        );
      })}
    </div>
  );
}

import { FAVOURITE_QUOTES } from '@/lib/library/journal';
import { cn } from '@/lib/utils';

const NOTE_TILTS = ['-rotate-1', 'rotate-[0.6deg]', '-rotate-[0.4deg]'];

export function FavouriteQuotes() {
  return (
    <ul className="grid gap-8">
      {FAVOURITE_QUOTES.map((quote, index) => (
        <li
          key={quote.text}
          className={cn(
            'relative bg-parchment-50 px-7 pb-6 pt-8 shadow-page transition-transform duration-500 ease-out hover:rotate-0 hover:-translate-y-1',
            NOTE_TILTS[index % NOTE_TILTS.length]
          )}
        >
          <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-dusty-300/60"
          />
          <p className="font-flourish text-2xl italic leading-snug text-ink-800">&ldquo;{quote.text}&rdquo;</p>
          <p className="mt-4 font-body text-xs uppercase tracking-[0.25em] text-burgundy-700">{quote.source}</p>
        </li>
      ))}
    </ul>
  );
}

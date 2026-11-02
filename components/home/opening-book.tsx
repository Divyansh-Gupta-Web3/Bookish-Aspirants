import Image from 'next/image';
import { Quote } from 'lucide-react';
import { OrnamentDivider } from '@/components/book/ornament';

export function OpeningBook() {
  return (
    <div className="relative mx-auto w-full max-w-sm md:max-w-md [perspective:2000px]">
      <div className="relative aspect-[4/3] w-full">
        <div className="absolute inset-0 flex overflow-hidden rounded-md shadow-cover">
          <div className="paper-texture flex w-1/2 flex-col justify-center gap-5 p-6 md:p-10">
            <Quote aria-hidden="true" className="h-6 w-6 text-dusty-600" strokeWidth={1.25} />
            <p className="font-flourish text-xl italic leading-snug text-ink-800 md:text-2xl">
              I am no bird; and no net ensnares me: I am a free human being with an independent will.
            </p>
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-500">Jane Eyre</p>
          </div>
          <div className="relative w-1/2">
            <Image
              src="https://images.pexels.com/photos/16827795/pexels-photo-16827795.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Candlelit stack of vintage books with open pages"
              fill
              priority
              sizes="(min-width: 768px) 280px, 45vw"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink-700/25 to-transparent"
          />
        </div>

        <div className="book-cover-open absolute inset-0 flex origin-left flex-col items-center justify-between overflow-hidden rounded-l-sm rounded-r-md bg-burgundy-700 px-8 py-10 text-center text-parchment-50 shadow-cover [backface-visibility:hidden]">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
          <span aria-hidden="true" className="absolute inset-4 rounded-sm border border-current opacity-25" />
          <p className="relative font-flourish text-sm uppercase tracking-[0.35em] opacity-85">The Silent Reader</p>
          <div className="relative flex flex-col items-center gap-5">
            <p className="font-display text-4xl leading-[1.15] md:text-5xl">Bookish Aspirant</p>
            <OrnamentDivider className="w-40 text-current opacity-70" />
            <p className="font-flourish text-lg italic opacity-90">A reading journal</p>
          </div>
          <p className="relative font-flourish text-sm italic opacity-75">Est. for every reader</p>
        </div>
      </div>
    </div>
  );
}

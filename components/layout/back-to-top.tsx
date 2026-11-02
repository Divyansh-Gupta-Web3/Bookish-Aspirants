'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SHOW_AFTER_PX = 600;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        'group fixed bottom-6 right-5 z-40 flex h-16 w-11 items-start justify-center bg-burgundy-700 pt-3 text-parchment-50 shadow-cover transition-[opacity,transform] duration-500 ease-out hover:bg-burgundy-900 md:bottom-10 md:right-10',
        'after:absolute after:left-0 after:top-full after:h-3 after:w-full after:bg-burgundy-900 after:[clip-path:polygon(0_0,100%_0,100%_100%,50%_70%,0_100%)] after:transition-colors group-hover:after:bg-burgundy-700',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      )}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}

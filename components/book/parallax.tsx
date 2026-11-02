'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type ParallaxProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

export function Parallax({ children, speed = 0.1, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      node.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`;
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}

'use client';

import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

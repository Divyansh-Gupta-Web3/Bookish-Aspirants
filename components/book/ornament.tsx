import { Flower2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex w-full items-center justify-center gap-3 text-dusty-500', className)}
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
    </div>
  );
}

type FloatingSprigProps = {
  className?: string;
  delay?: string;
};

export function FloatingSprig({ className, delay = '0s' }: FloatingSprigProps) {
  return (
    <Flower2
      aria-hidden="true"
      strokeWidth={1.25}
      style={{ animationDelay: delay }}
      className={cn(
        'pointer-events-none absolute h-10 w-10 text-dusty-500/70 animate-float motion-reduce:animate-none',
        className
      )}
    />
  );
}

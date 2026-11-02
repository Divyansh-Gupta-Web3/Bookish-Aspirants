import { cn } from '@/lib/utils';

type PageNumberProps = {
  value: number | string;
  className?: string;
};

export function PageNumber({ value, className }: PageNumberProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-flourish text-base italic text-ink-500',
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />
      <span>{value}</span>
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />
    </span>
  );
}

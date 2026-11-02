import { cn } from '@/lib/utils';
import { PageNumber } from '@/components/book/page-number';

type PaperSheetProps = {
  children: React.ReactNode;
  id?: string;
  folio?: number | string;
  className?: string;
};

export function PaperSheet({ children, id, folio, className }: PaperSheetProps) {
  return (
    <section
      id={id}
      className={cn(
        'paper-texture relative overflow-hidden rounded-sm border border-parchment-300 px-6 pb-20 pt-14 shadow-page md:px-16 md:pb-24 md:pt-20',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink-700/10 to-transparent md:w-16"
      />
      <div className="relative">{children}</div>
      {folio !== undefined && (
        <PageNumber value={folio} className="absolute bottom-6 left-1/2 -translate-x-1/2" />
      )}
    </section>
  );
}

import Link from 'next/link';
import { BookOpen, Coffee, Feather } from 'lucide-react';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { getBook } from '@/lib/library/books';
import { CONTENT } from '@/lib/content';

const ICONS = [Coffee, BookOpen, Feather];

export function DiaryEntries() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
      <PaperSheet folio={2}>
        <ChapterHeading chapter="Chapter I" title="Pages from the Notebook" description="Three small entries from the years I have been keeping this journal." />

        <ol className="mt-16 space-y-14">
          {CONTENT.diaryEntries.map((entry, index) => {
            const Icon = ICONS[index % ICONS.length];
            const book = getBook(entry.bookSlug);
            return (
              <li
                key={entry.date}
                className={`grid gap-8 md:grid-cols-[auto_1fr] md:gap-12 ${index % 2 === 1 ? 'md:pl-16' : ''}`}
              >
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-burgundy-700/40 bg-parchment-50 text-burgundy-700 shadow-page">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.25} />
                  </span>
                  <p className="font-flourish text-xl italic text-ink-500">{entry.date}</p>
                </div>

                <div className="ruled-paper border-l-2 border-dusty-400 pl-8">
                  <p className="font-flourish text-2xl italic leading-[32px] text-ink-800">{entry.text}</p>
                  {book && (
                    <Link
                      href={`/books/${book.slug}`}
                      className="nav-underline mt-4 inline-block font-body text-sm text-burgundy-700 transition-colors duration-300 hover:text-burgundy-900"
                    >
                      Read about {book.title}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </PaperSheet>
    </section>
  );
}

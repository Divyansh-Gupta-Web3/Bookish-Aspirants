'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookCover } from '@/components/book/book-cover';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { PaperSheet } from '@/components/book/paper-sheet';
import { MOODS, getBooksForMood, type MoodId } from '@/lib/library/moods';
import { cn } from '@/lib/utils';

export function ReadingMoodSelector() {
  const [moodId, setMoodId] = useState<MoodId>(MOODS[0].id);
  const books = getBooksForMood(moodId);
  const activeMood = MOODS.find((mood) => mood.id === moodId);

  return (
    <section id="reading-mood" className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-28">
      <PaperSheet className="pb-12 md:pb-20">
        <ChapterHeading chapter="An Interlude" title="What Are You in the Mood For?"
          description="Choose how you feel tonight and I will open the shelf to the books that fit."
        />

        <div className="mt-10 grid gap-10 md:mt-16 md:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div role="group" aria-label="Reading moods" className="flex flex-col gap-3">
            {MOODS.map((mood, index) => {
              const selected = mood.id === moodId;
              return (
                <button
                  key={mood.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setMoodId(mood.id)}
                  className={cn(
                    'group flex items-center gap-4 border-b border-parchment-400 py-4 text-left font-flourish text-xl italic transition-all duration-300',
                    selected ? 'translate-x-2 text-burgundy-700' : 'text-ink-600 hover:translate-x-1 hover:text-ink-800'
                  )}
                >
                  <span className="font-body text-xs not-italic tracking-[0.2em] text-ink-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">{mood.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-px w-8 origin-left bg-burgundy-700 transition-transform duration-500',
                      selected ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div key={moodId} aria-live="polite" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">
              {activeMood?.label}
            </p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {books.map((book) => (
                <li key={book.slug} className="flex items-start gap-5">
                  <Link href={`/books/${book.slug}`} aria-label={`View details for ${book.title}`} className="w-24 shrink-0 rounded-sm">
                    <BookCover title={book.title} author={book.author} tone={book.tone} imageUrl={book.coverImage} compact className="max-w-none" />
                  </Link>
                  <div className="min-w-0 pt-1">
                    <h3 className="font-display text-lg leading-snug text-ink-800">{book.title}</h3>
                    <p className="mt-1 font-flourish text-base italic text-ink-500">{book.author}</p>
                    <p className="mt-3 line-clamp-3 font-body text-sm leading-normal text-ink-600">{book.personalNote}</p>
                    <Link
                      href={`/books/${book.slug}`}
                      className="nav-underline mt-3 inline-block font-body text-sm text-burgundy-700 transition-colors duration-300 hover:text-burgundy-900"
                    >
                      View details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PaperSheet>
    </section>
  );
}

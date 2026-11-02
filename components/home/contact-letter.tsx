'use client';

import { useState } from 'react';
import { Feather, Instagram, Mail, Stamp } from 'lucide-react';
import { ChapterHeading } from '@/components/book/chapter-heading';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site';

const COLLABORATION_TOPICS = [
  'Book reviews and features for publishers and authors',
  'Partnerships with bookstores, libraries and reading clubs',
  'Sponsored reading lists for brands that share our love of books',
];

export function ContactLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
      <ChapterHeading
        chapter="Chapter IX"
        title="Contact & Collaboration"
        description="Writing to a publisher, a brand or a fellow reader? Start with a letter."
      />

      <div className="group relative mx-auto mt-16 max-w-2xl">
        <div
          className={cn(
            'relative overflow-hidden rounded-sm border border-parchment-400 bg-parchment-300 shadow-cover transition-shadow duration-700',
            !opened && 'hover:shadow-cover-hover'
          )}
        >
          <div className="relative h-40 md:h-44">
            <div
              aria-hidden="true"
              className={cn(
                'absolute inset-x-0 top-0 h-full origin-top bg-parchment-400 transition-transform duration-1000 ease-out [clip-path:polygon(0_0,100%_0,50%_100%)] [backface-visibility:hidden]',
                opened && '[transform:rotateX(180deg)]'
              )}
            />
            <button
              type="button"
              aria-expanded={opened}
              aria-label="Break the wax seal to open the letter"
              onClick={() => setOpened(true)}
              disabled={opened}
              className={cn(
                'absolute left-1/2 top-[calc(100%-1.75rem)] z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-burgundy-600 to-burgundy-900 text-parchment-50 shadow-cover transition-[transform,opacity] duration-500 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0 motion-safe:animate-seal-pulse',
              )}
            >
              <span aria-hidden="true" className="absolute inset-1.5 rounded-full border border-parchment-50/25" />
              <Stamp aria-hidden="true" className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </div>

          <div
            className={cn(
              'grid transition-[grid-template-rows,visibility] duration-1000 ease-out',
              opened ? 'grid-rows-[1fr] visible' : 'invisible grid-rows-[0fr]'
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className={cn(
                  'paper-texture mx-5 mt-2 rounded-sm border border-parchment-300 bg-parchment-50 px-6 pb-10 pt-8 shadow-page transition-all duration-1000 ease-out md:mx-8 md:px-10',
                  opened ? 'translate-y-0 opacity-100 delay-300' : '-translate-y-10 opacity-0'
                )}
              >
                <p className="font-hand text-3xl text-ink-700">Dear reader,</p>
                <p className="mt-3 font-hand text-2xl leading-snug text-ink-600">
                  For reviews, collaborations, or simply to share what you are reading, write to me directly.
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="nav-underline mt-6 inline-block break-all font-display text-xl text-burgundy-700 transition-colors duration-300 hover:text-burgundy-900"
                >
                  {SITE.email}
                </a>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex items-center justify-center gap-3 rounded-sm border border-ink-700 bg-parchment-50 px-6 py-3 font-body text-sm text-ink-800 transition-colors duration-300 hover:border-burgundy-700 hover:bg-burgundy-700 hover:text-parchment-50"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    Email me
                  </a>
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-sm border border-ink-700 bg-parchment-50 px-6 py-3 font-body text-sm text-ink-800 transition-colors duration-300 hover:border-burgundy-700 hover:bg-burgundy-700 hover:text-parchment-50"
                  >
                    <Instagram aria-hidden="true" className="h-4 w-4" />
                    Message on Instagram
                  </a>
                </div>

                <div className="mt-10 border-t border-dashed border-parchment-400 pt-8">
                  <p className="flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">
                    <Feather aria-hidden="true" className="h-4 w-4" strokeWidth={1.25} />
                    PR &amp; collaboration
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-ink-800">Let us make something together</h3>
                  <ul className="mt-6 space-y-4">
                    {COLLABORATION_TOPICS.map((topic) => (
                      <li key={topic} className="flex gap-4 font-body text-base leading-normal text-ink-600">
                        <span aria-hidden="true" className="mt-3 h-px w-6 shrink-0 bg-burgundy-700" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 font-hand text-2xl text-ink-600">
                    Please include the book or brand, the timeline and what you have in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-t border-parchment-400 bg-parchment-300 px-6 py-6 text-center md:px-10">
            <p className="font-hand text-2xl text-ink-600">To: The Silent Reader</p>
            <p className={cn('mt-1 font-body text-xs uppercase tracking-[0.25em] text-ink-500 transition-opacity duration-700', opened && 'opacity-0')}>
              {opened ? 'Letter opened' : 'Tap the seal to open'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

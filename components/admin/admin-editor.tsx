'use client';

import { useState, type ComponentType } from 'react';
import { normalizeContent } from '@/lib/content';
import { triggerRedeploy, writeContentFile } from '@/lib/github-content';
import type { SiteContent } from '@/lib/content/schema';
import type { FormProps } from '@/components/admin/admin-ui';
import { SiteForm } from '@/components/admin/forms/site-form';
import { BooksForm } from '@/components/admin/forms/books-form';
import { CategoriesForm } from '@/components/admin/forms/categories-form';
import { ShelfForm } from '@/components/admin/forms/shelf-form';
import { JournalForm } from '@/components/admin/forms/journal-form';
import { QuotesForm } from '@/components/admin/forms/quotes-form';
import { ReadingForm } from '@/components/admin/forms/reading-form';

const TABS: { id: string; label: string; Form: ComponentType<FormProps> }[] = [
  { id: 'site', label: 'Site', Form: SiteForm },
  { id: 'books', label: 'Books', Form: BooksForm },
  { id: 'categories', label: 'Categories', Form: CategoriesForm },
  { id: 'shelf', label: 'Shelf', Form: ShelfForm },
  { id: 'journal', label: 'Journal', Form: JournalForm },
  { id: 'quotes', label: 'Quotes', Form: QuotesForm },
  { id: 'reading', label: 'Reading', Form: ReadingForm },
];

const BOOK_URL_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function findProblems(content: SiteContent): string[] {
  const problems: string[] = [];
  if (!content.site.name.trim()) problems.push('The site name is required.');
  content.books.forEach((book) => {
    if (!book.title.trim()) problems.push('Every book needs a title.');
    if (!BOOK_URL_PATTERN.test(book.slug)) problems.push(`The page address for "${book.title || 'a book'}" can only use lowercase letters, numbers and hyphens.`);
  });
  content.categories.forEach((category) => {
    if (!category.name.trim()) problems.push('Every category needs a name.');
  });

  const slugs = content.books.map((book) => book.slug);
  if (new Set(slugs).size !== slugs.length) problems.push('Two books share the same slug.');

  const known = new Set(slugs);
  const referenced = [
    content.currentlyReading.slug,
    content.bookOfTheMonth.slug,
    ...content.pairings.flatMap((pairing) => [pairing.first, pairing.second]),
    ...content.readerReviews.map((review) => review.bookSlug),
    ...content.latestReads.map((read) => read.bookSlug),
    ...content.favouriteBookSlugs,
    ...content.moods.flatMap((mood) => mood.bookSlugs),
    ...content.diaryEntries.map((entry) => entry.bookSlug),
  ];
  if (referenced.some((slug) => slug && !known.has(slug))) {
    problems.push('Some sections point to a book that no longer exists. Pick another book there.');
  }
  return problems;
}

function downloadContent(content: SiteContent) {
  const payload = JSON.stringify(content, null, 2);
  const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'site-content.json';
  link.click();
  URL.revokeObjectURL(url);
}

type PublishStatus =
  | { state: 'idle' }
  | { state: 'publishing' }
  | { state: 'done'; commitUrl: string; redeployed: boolean }
  | { state: 'error'; message: string };

export function AdminEditor({
  initialContent,
  token,
  onSignOut,
}: {
  initialContent: SiteContent;
  token: string;
  onSignOut: () => void;
}) {
  const [content, setContent] = useState<SiteContent>(() => normalizeContent(initialContent));
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [problems, setProblems] = useState<string[]>([]);
  const [status, setStatus] = useState<PublishStatus>({ state: 'idle' });

  const update = (changes: Partial<SiteContent>) => {
    setContent((current) => ({ ...current, ...changes }));
    setProblems([]);
    setStatus({ state: 'idle' });
  };

  const exportContent = () => {
    const found = findProblems(content);
    setProblems(found);
    if (found.length === 0) downloadContent(content);
  };

  const publishContent = async () => {
    const found = findProblems(content);
    setProblems(found);
    if (found.length > 0) return;

    setStatus({ state: 'publishing' });
    try {
      const commitUrl = await writeContentFile(token, content);
      const redeployed = await triggerRedeploy(token).catch(() => false);
      setStatus({ state: 'done', commitUrl, redeployed });
    } catch (caught) {
      setStatus({ state: 'error', message: caught instanceof Error ? caught.message : 'Publishing failed.' });
    }
  };

  const active = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];
  const ActiveForm = active.Form;
  const publishing = status.state === 'publishing';

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl text-ink-800">Content manager</h1>
          <p className="font-body text-sm text-ink-600">
            Publish saves your changes to GitHub and refreshes the live site automatically.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSignOut}
            className="rounded-sm px-3 py-3 font-body text-sm tracking-wide text-ink-600 underline-offset-4 hover:underline"
          >
            Sign out
          </button>
          <button
            type="button"
            onClick={exportContent}
            className="rounded-sm border border-ink-300 bg-parchment-50 px-5 py-3 font-body text-sm tracking-wide text-ink-700 transition-colors duration-300 hover:border-burgundy-700"
          >
            Download backup
          </button>
          <button
            type="button"
            onClick={publishContent}
            disabled={publishing}
            className="rounded-sm bg-burgundy-700 px-5 py-3 font-body text-sm tracking-wide text-parchment-50 transition-colors duration-300 hover:bg-burgundy-900 disabled:cursor-wait disabled:opacity-70"
          >
            {publishing ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </header>

      <div aria-live="polite">
        {status.state === 'done' && (
          <p className="rounded-sm border border-parchment-300 bg-parchment-50 p-4 font-body text-sm text-ink-700">
            {status.redeployed
              ? 'Published. The live site is rebuilding and will show the new content in a minute or two.'
              : 'Saved to GitHub, but the site rebuild could not be started. Give the token Actions access on Bookish-Aspirant, or run the Deploy workflow manually.'}{' '}
            {status.commitUrl && (
              <a href={status.commitUrl} target="_blank" rel="noreferrer" className="underline">
                View commit
              </a>
            )}
          </p>
        )}
        {status.state === 'error' && (
          <p role="alert" className="rounded-sm border border-brick-700 bg-parchment-50 p-4 font-body text-sm text-brick-700">
            {status.message}
          </p>
        )}
      </div>

      {problems.length > 0 && (
        <ul role="alert" className="flex flex-col gap-1 rounded-sm border border-brick-700 bg-parchment-50 p-4 font-body text-sm text-brick-700">
          {problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      )}

      <nav className="flex flex-wrap gap-2" aria-label="Content sections">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={tab.id === active.id}
            className={
              tab.id === active.id
                ? 'rounded-sm border border-burgundy-700 bg-burgundy-700 px-4 py-2 font-body text-sm text-parchment-50'
                : 'rounded-sm border border-ink-300 bg-parchment-50 px-4 py-2 font-body text-sm text-ink-700 transition-colors duration-200 hover:border-burgundy-700'
            }
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <ActiveForm content={content} onChange={update} />
    </div>
  );
}

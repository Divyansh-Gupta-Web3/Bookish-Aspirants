'use client';

import { useState, type FormEvent } from 'react';
import { AdminEditor } from '@/components/admin/admin-editor';
import { inputClass } from '@/components/admin/admin-ui';
import { readContentFile, TOKEN_STORAGE_KEY } from '@/lib/github-content';
import type { SiteContent } from '@/lib/content/schema';

export function AdminArea() {
  const [session, setSession] = useState<{ token: string; content: SiteContent } | null>(null);
  const [token, setToken] = useState(() =>
    typeof window === 'undefined' ? '' : sessionStorage.getItem(TOKEN_STORAGE_KEY) ?? '',
  );
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    const signOut = () => {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      setToken('');
      setSession(null);
    };
    return <AdminEditor initialContent={session.content} token={session.token} onSignOut={signOut} />;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = token.trim();
    setSubmitting(true);
    setError('');
    try {
      const { content } = await readContentFile(trimmed);
      sessionStorage.setItem(TOKEN_STORAGE_KEY, trimmed);
      setSession({ token: trimmed, content: content as SiteContent });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Sign in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-sm flex-col gap-6 rounded-sm border border-parchment-300 bg-parchment-50 p-8 shadow-page">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl text-ink-800">Content manager</h1>
        <p className="font-body text-sm text-ink-600">
          Sign in with your GitHub access token to update the words, books and pages of the site.
        </p>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-body text-xs uppercase tracking-[0.2em] text-ink-600">GitHub token</span>
        <input
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          required
          className={inputClass}
        />
      </label>
      {error && <p role="alert" className="font-body text-sm text-brick-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm bg-burgundy-700 px-5 py-3 font-body text-sm tracking-wide text-parchment-50 transition-colors duration-300 hover:bg-burgundy-900 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="font-body text-xs text-ink-600">The token stays in this browser tab only and is cleared when you close it.</p>
    </form>
  );
}

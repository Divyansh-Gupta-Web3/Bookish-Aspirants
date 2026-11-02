'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'bookish-aspirant-wishlist';
const CHANGE_EVENT = 'bookish-aspirant-wishlist-change';
const EMPTY: string[] = [];

let cachedRaw: string | null = null;
let cachedSlugs: string[] = EMPTY;

function readSlugs(): string[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSlugs;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedSlugs = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : EMPTY;
  } catch {
    cachedSlugs = EMPTY;
  }
  return cachedSlugs;
}

function writeSlugs(slugs: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function useWishlist() {
  const slugs = useSyncExternalStore(subscribe, readSlugs, () => EMPTY);

  const toggle = useCallback((slug: string) => {
    const current = readSlugs();
    writeSlugs(current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  }, []);

  const isSaved = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, isSaved, toggle };
}

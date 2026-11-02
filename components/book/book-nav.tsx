'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type MouseEvent } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookSearch } from '@/components/book/book-search';

export type NavItem = { label: string; href: string };

type BookNavProps = {
  items: NavItem[];
};

export function BookNav({ items }: BookNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    const [path, hash] = href.split('#');
    if (!hash || path !== pathname) return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ease-out',
        scrolled
          ? 'border-parchment-300 bg-parchment-50/95 shadow-nav backdrop-blur-sm'
          : 'border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy-700/40 bg-parchment-50 text-burgundy-700 transition-transform duration-500 ease-out group-hover:-rotate-12">
            <BookOpen className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-xl font-semibold leading-none text-ink-800">
              Bookish Aspirant
            </span>
            <span className="mt-1 font-flourish text-sm italic leading-none text-ink-500">
              by The Silent Reader
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(event) => handleSectionLink(event, item.href)}
                    className="nav-underline font-body text-[15px] tracking-wide text-ink-700 transition-colors duration-300 hover:text-burgundy-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <BookSearch />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-300 bg-parchment-50 text-ink-700 transition-colors duration-300 hover:border-burgundy-700 hover:text-burgundy-700 md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          'overflow-hidden transition-[max-height,opacity,visibility] duration-500 ease-out md:hidden',
          open ? 'visible max-h-[28rem] opacity-100' : 'invisible max-h-0 opacity-0'
        )}
      >
        <ul className="paper-texture mx-5 mb-5 divide-y divide-parchment-300 rounded-sm border border-parchment-300 px-6 shadow-page">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(event) => handleSectionLink(event, item.href)}
                className="block py-4 font-display text-lg text-ink-800 transition-colors duration-300 hover:text-burgundy-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

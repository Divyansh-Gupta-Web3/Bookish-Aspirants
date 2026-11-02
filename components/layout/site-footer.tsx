import Link from 'next/link';
import { BookOpen, Instagram, Mail } from 'lucide-react';
import { OrnamentDivider } from '@/components/book/ornament';
import type { NavItem } from '@/components/book/book-nav';
import { SITE } from '@/lib/site';

type SiteFooterProps = {
  items: NavItem[];
};

export function SiteFooter({ items }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-parchment-300 bg-parchment-50/70">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy-700/40 bg-parchment-50 text-burgundy-700">
              <BookOpen className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xl font-semibold text-ink-800">{SITE.name}</span>
              <span className="font-flourish text-sm italic text-ink-500">by {SITE.creator}</span>
            </div>
          </div>
          <p className="mt-6 max-w-sm font-flourish text-lg italic leading-snug text-ink-600">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Explore</h2>
          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-underline font-body text-ink-700 transition-colors duration-300 hover:text-burgundy-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-burgundy-700">Connect</h2>
          <ul className="mt-6 space-y-4">
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-underline inline-flex items-center gap-3 font-body text-ink-700 transition-colors duration-300 hover:text-burgundy-700"
              >
                <Instagram aria-hidden="true" className="h-4 w-4" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="nav-underline inline-flex items-center gap-3 font-body text-ink-700 transition-colors duration-300 hover:text-burgundy-700"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-10">
        <OrnamentDivider className="mx-auto mb-10 max-w-md" />
        <p className="text-center font-flourish text-base italic text-ink-500">
          &copy; {year} {SITE.creator}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

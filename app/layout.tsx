import './globals.css';
import type { Metadata } from 'next';
import { Caveat, Cormorant_Garamond, Lora, Playfair_Display } from 'next/font/google';
import { BookNav, type NavItem } from '@/components/book/book-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { BackToTop } from '@/components/layout/back-to-top';
import { FloatingBooks } from '@/components/layout/floating-books';
import { SITE } from '@/lib/site';

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600'],
});

const body = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  weight: ['400'],
});

const flourish = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-flourish',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Bookish Aspirant | The Silent Reader',
    template: '%s | Bookish Aspirant',
  },
  description:
    'Book recommendations, reviews and a quiet reading journal from The Silent Reader.',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Bookish Aspirant | The Silent Reader',
    description: 'Book recommendations, reviews and a quiet reading journal from The Silent Reader.',
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bookish Aspirant | The Silent Reader',
    description: 'Book recommendations, reviews and a quiet reading journal from The Silent Reader.',
  },
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Shelf', href: '/#recommendations' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Reader\u2019s Journal', href: '/#readers-journal' },
  { label: 'Wishlist', href: '/#wishlist' },
  { label: 'Where to Buy', href: '/buy' },
  { label: 'About', href: '/about' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${flourish.variable} ${hand.variable}`}>
      <body className="min-h-screen">
        <FloatingBooks />
        <BookNav items={NAV_ITEMS} />
        {children}
        <SiteFooter items={NAV_ITEMS} />
        <BackToTop />
      </body>
    </html>
  );
}

import { DiaryEntries } from '@/components/about/diary-entries';
import { DiaryIntro } from '@/components/about/diary-intro';
import { ReadingJourney } from '@/components/about/reading-journey';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet The Silent Reader behind Bookish Aspirant.',
};

export default function AboutPage() {
  return (
    <main className="pt-16 md:pt-24">
      <DiaryIntro />
      <DiaryEntries />
      <ReadingJourney />
    </main>
  );
}

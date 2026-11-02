import { Reveal } from '@/components/book/reveal';
import { Hero } from '@/components/home/hero';
import { CurrentlyReading } from '@/components/home/currently-reading';
import { LatestReads } from '@/components/home/latest-reads';
import { Recommendations } from '@/components/home/recommendations';
import { CategoriesGrid } from '@/components/home/categories-grid';
import { BookOfTheMonth } from '@/components/home/book-of-the-month';
import { BookPairings } from '@/components/home/book-pairings';
import { ReadersJournal } from '@/components/home/readers-journal';
import { ReadingCorner } from '@/components/home/reading-corner';
import { InstagramCorner } from '@/components/home/instagram-corner';
import { ContactLetter } from '@/components/home/contact-letter';
import { ReadingMoodSelector } from '@/components/home/reading-mood-selector';
import { ReadersShelf } from '@/components/home/readers-shelf';
import { WishlistShelf } from '@/components/home/wishlist-shelf';

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal>
        <CurrentlyReading />
      </Reveal>
      <Reveal>
        <LatestReads />
      </Reveal>
      <Reveal>
        <Recommendations />
      </Reveal>
      <Reveal>
        <CategoriesGrid />
      </Reveal>
      <Reveal>
        <ReadingMoodSelector />
      </Reveal>
      <Reveal>
        <BookOfTheMonth />
      </Reveal>
      <Reveal>
        <BookPairings />
      </Reveal>
      <Reveal>
        <ReadersJournal />
      </Reveal>
      <Reveal>
        <ReadingCorner />
      </Reveal>
      <Reveal>
        <ReadersShelf />
      </Reveal>
      <Reveal>
        <WishlistShelf />
      </Reveal>
      <Reveal>
        <InstagramCorner />
      </Reveal>
      <Reveal>
        <ContactLetter />
      </Reveal>
    </main>
  );
}

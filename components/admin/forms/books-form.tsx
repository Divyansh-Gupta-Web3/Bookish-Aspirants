import { AddButton, CheckboxGroup, FormSection, ItemCard, SelectField, TextAreaField, TextField, type FormProps } from '@/components/admin/admin-ui';
import type { Book, SiteContent } from '@/lib/content/schema';
import { slugify } from '@/lib/utils';

const TONE_OPTIONS = [
  { value: 'burgundy', label: 'Burgundy' },
  { value: 'rose', label: 'Rose' },
  { value: 'ink', label: 'Ink' },
  { value: 'parchment', label: 'Parchment' },
];

function renameBookReferences(content: SiteContent, from: string, to: string): Partial<SiteContent> {
  const swap = (slug: string) => (slug === from ? to : slug);
  return {
    currentlyReading: { ...content.currentlyReading, slug: swap(content.currentlyReading.slug) },
    bookOfTheMonth: { ...content.bookOfTheMonth, slug: swap(content.bookOfTheMonth.slug) },
    pairings: content.pairings.map((pairing) => ({ ...pairing, first: swap(pairing.first), second: swap(pairing.second) })),
    readerReviews: content.readerReviews.map((review) => ({ ...review, bookSlug: swap(review.bookSlug) })),
    latestReads: content.latestReads.map((read) => ({ ...read, bookSlug: swap(read.bookSlug) })),
    favouriteBookSlugs: content.favouriteBookSlugs.map(swap),
    moods: content.moods.map((mood) => ({ ...mood, bookSlugs: mood.bookSlugs.map(swap) })),
    diaryEntries: content.diaryEntries.map((entry) => ({ ...entry, bookSlug: swap(entry.bookSlug) })),
  };
}

export function BooksForm({ content, onChange }: FormProps) {
  const categoryOptions = content.categories.map((category) => ({ value: category.slug, label: category.name }));

  const updateBook = (book: Book, changes: Partial<Book>) => {
    const renamed = changes.slug !== undefined && changes.slug !== book.slug;
    onChange({
      books: content.books.map((item) => (item === book ? { ...item, ...changes } : item)),
      ...(renamed ? renameBookReferences(content, book.slug, changes.slug as string) : {}),
    });
  };

  const changeTitle = (book: Book, title: string) => {
    const followsTitle = book.slug === slugify(book.title);
    updateBook(book, { title, ...(followsTitle ? { slug: slugify(title) } : {}) });
  };

  const removeBook = (book: Book) => onChange({ books: content.books.filter((item) => item !== book) });

  const addBook = () =>
    onChange({
      books: [
        ...content.books,
        {
          slug: '',
          title: '',
          author: '',
          genre: '',
          categories: [],
          tone: 'burgundy',
          coverImage: '',
          buyLink: '',
          rating: 4,
          personalNote: '',
        },
      ],
    });

  return (
    <FormSection title="Books" description="Every book on the site. The page address follows the title until you change it yourself.">
      {content.books.map((book, index) => (
        <ItemCard key={index} title={book.title || 'Untitled book'} onRemove={() => removeBook(book)}>
          <TextField label="Page address (URL)" value={book.slug} onChange={(slug) => updateBook(book, { slug })} />
          <p className="font-body text-xs text-ink-500">Lowercase letters, numbers and hyphens only. Example: /books/the-alchemist</p>
          <div className="grid gap-5 md:grid-cols-2">
            <TextField label="Title" value={book.title} onChange={(title) => changeTitle(book, title)} />
            <TextField label="Author" value={book.author} onChange={(author) => updateBook(book, { author })} />
            <TextField label="Genre" value={book.genre} onChange={(genre) => updateBook(book, { genre })} />
            <SelectField
              label="Cover colour"
              value={book.tone}
              options={TONE_OPTIONS}
              onChange={(tone) => updateBook(book, { tone: tone as Book['tone'] })}
            />
            <TextField
              label="Rating (0 to 5)"
              type="number"
              step="0.5"
              min={0}
              max={5}
              value={book.rating}
              onChange={(rating) => updateBook(book, { rating: Number(rating) })}
            />
          </div>
          <CheckboxGroup
            label="Shelves"
            options={categoryOptions}
            selected={book.categories}
            onChange={(categories) => updateBook(book, { categories })}
          />
          <TextAreaField
            label="My personal note"
            value={book.personalNote}
            onChange={(personalNote) => updateBook(book, { personalNote })}
          />
          <TextField label="Cover image link" value={book.coverImage} onChange={(coverImage) => updateBook(book, { coverImage })} />
          <TextField label="Buy link" value={book.buyLink} onChange={(buyLink) => updateBook(book, { buyLink })} />
          <p className="font-body text-xs text-ink-500">The Buy Now button opens this link. Leave empty to hide the button.</p>
        </ItemCard>
      ))}
      <AddButton label="Add a book" onClick={addBook} />
    </FormSection>
  );
}

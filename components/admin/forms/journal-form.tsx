import { AddButton, FormSection, ItemCard, SelectField, TextAreaField, TextField, type FormProps } from '@/components/admin/admin-ui';
import { bookOptions } from '@/components/admin/book-options';

export function JournalForm({ content, onChange }: FormProps) {
  const books = bookOptions(content);
  const noBook = [{ value: '', label: 'No book' }, ...books];

  return (
    <FormSection title="Reviews, latest reads and diary" description="Your recent reviews, the books you have just finished, and the short entries on the About page.">
      <div className="flex flex-col gap-6">
        <h3 className="font-display text-lg text-ink-800">Recent reviews</h3>
        {content.readerReviews.map((review, index) => {
          const update = (changes: Partial<(typeof content.readerReviews)[number]>) =>
            onChange({ readerReviews: content.readerReviews.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
          return (
            <ItemCard
              key={`${review.bookSlug}-${index}`}
              title={`Review ${index + 1}`}
              onRemove={() => onChange({ readerReviews: content.readerReviews.filter((_, i) => i !== index) })}
            >
              <div className="grid gap-5 md:grid-cols-3">
                <SelectField label="Book" value={review.bookSlug} options={books} onChange={(bookSlug) => update({ bookSlug })} />
                <TextField label="Date" value={review.date} onChange={(date) => update({ date })} />
                <TextField
                  label="Rating (0 to 5)"
                  type="number"
                  step="0.5"
                  min={0}
                  max={5}
                  value={review.rating}
                  onChange={(rating) => update({ rating: Number(rating) })}
                />
              </div>
              <TextAreaField label="Excerpt" value={review.excerpt} onChange={(excerpt) => update({ excerpt })} />
            </ItemCard>
          );
        })}
        <AddButton
          label="Add a review"
          onClick={() =>
            onChange({
              readerReviews: [
                ...content.readerReviews,
                { bookSlug: books[0]?.value ?? '', date: '', rating: 4, excerpt: '' },
              ],
            })
          }
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-display text-lg text-ink-800">Latest reads</h3>
        {content.latestReads.map((read, index) => {
          const update = (changes: Partial<(typeof content.latestReads)[number]>) =>
            onChange({ latestReads: content.latestReads.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
          return (
            <ItemCard
              key={`${read.bookSlug}-${index}`}
              title={`Finished read ${index + 1}`}
              onRemove={() => onChange({ latestReads: content.latestReads.filter((_, i) => i !== index) })}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <SelectField label="Book" value={read.bookSlug} options={books} onChange={(bookSlug) => update({ bookSlug })} />
                <TextField label="Finished on" value={read.finishedOn} onChange={(finishedOn) => update({ finishedOn })} />
              </div>
              <TextAreaField label="Short note" value={read.note} onChange={(note) => update({ note })} />
            </ItemCard>
          );
        })}
        <AddButton
          label="Add a finished read"
          onClick={() =>
            onChange({
              latestReads: [...content.latestReads, { bookSlug: books[0]?.value ?? '', finishedOn: '', note: '' }],
            })
          }
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-display text-lg text-ink-800">About page entries</h3>
        {content.diaryEntries.map((entry, index) => {
          const update = (changes: Partial<(typeof content.diaryEntries)[number]>) =>
            onChange({ diaryEntries: content.diaryEntries.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
          return (
            <ItemCard
              key={`${entry.date}-${index}`}
              title={`Entry ${index + 1}`}
              onRemove={() => onChange({ diaryEntries: content.diaryEntries.filter((_, i) => i !== index) })}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextField label="Heading" value={entry.date} onChange={(date) => update({ date })} />
                <SelectField label="Linked book" value={entry.bookSlug} options={noBook} onChange={(bookSlug) => update({ bookSlug })} />
              </div>
              <TextAreaField label="Text" rows={4} value={entry.text} onChange={(text) => update({ text })} />
            </ItemCard>
          );
        })}
        <AddButton
          label="Add an entry"
          onClick={() =>
            onChange({ diaryEntries: [...content.diaryEntries, { date: '', text: '', bookSlug: '' }] })
          }
        />
      </div>
    </FormSection>
  );
}

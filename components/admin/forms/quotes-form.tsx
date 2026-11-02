import { AddButton, CheckboxGroup, FormSection, ItemCard, TextAreaField, TextField, type FormProps } from '@/components/admin/admin-ui';
import { bookOptions } from '@/components/admin/book-options';

export function QuotesForm({ content, onChange }: FormProps) {
  return (
    <FormSection title="Quotes, notes and favourites" description="Lines you love, the reading notes shown in your journal, and the books on your favourites shelf.">
      <div className="flex flex-col gap-6">
        <h3 className="font-display text-lg text-ink-800">Favourite quotes</h3>
        {content.favouriteQuotes.map((quote, index) => {
          const update = (changes: Partial<(typeof content.favouriteQuotes)[number]>) =>
            onChange({ favouriteQuotes: content.favouriteQuotes.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
          return (
            <ItemCard
              key={`${quote.source}-${index}`}
              title={`Quote ${index + 1}`}
              onRemove={() => onChange({ favouriteQuotes: content.favouriteQuotes.filter((_, i) => i !== index) })}
            >
              <TextAreaField label="Quote" value={quote.text} onChange={(text) => update({ text })} />
              <TextField label="From" value={quote.source} onChange={(source) => update({ source })} />
            </ItemCard>
          );
        })}
        <AddButton
          label="Add a quote"
          onClick={() => onChange({ favouriteQuotes: [...content.favouriteQuotes, { text: '', source: '' }] })}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-display text-lg text-ink-800">Reading notes</h3>
        {content.readingNotes.map((note, index) => (
          <ItemCard
            key={index}
            title={`Note ${index + 1}`}
            onRemove={() => onChange({ readingNotes: content.readingNotes.filter((_, i) => i !== index) })}
          >
            <TextAreaField
              label="Note"
              value={note}
              onChange={(value) => onChange({ readingNotes: content.readingNotes.map((item, i) => (i === index ? value : item)) })}
            />
          </ItemCard>
        ))}
        <AddButton label="Add a note" onClick={() => onChange({ readingNotes: [...content.readingNotes, ''] })} />
      </div>

      <CheckboxGroup
        label="Favourites shelf"
        options={bookOptions(content)}
        selected={content.favouriteBookSlugs}
        onChange={(favouriteBookSlugs) => onChange({ favouriteBookSlugs })}
      />
    </FormSection>
  );
}

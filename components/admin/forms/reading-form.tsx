import { AddButton, CheckboxGroup, FormSection, ItemCard, TextAreaField, TextField, newId, type FormProps } from '@/components/admin/admin-ui';
import { bookOptions } from '@/components/admin/book-options';

export function ReadingForm({ content, onChange }: FormProps) {
  const year = content.readingYear;
  const setYear = (changes: Partial<typeof year>) => onChange({ readingYear: { ...year, ...changes } });
  const books = bookOptions(content);

  return (
    <FormSection title="Reading year and moods" description="Your yearly tally (update it by hand each month) and the books offered for each reading mood.">
      <div className="flex flex-col gap-5 rounded-sm border border-parchment-300 bg-parchment-50/80 p-5 shadow-page">
        <h3 className="font-display text-lg text-ink-800">Reading year</h3>
        <div className="grid gap-5 md:grid-cols-3">
          <TextField label="Year" type="number" value={year.year} onChange={(value) => setYear({ year: Number(value) })} />
          <TextField label="Goal (books)" type="number" min={1} value={year.goalBooks} onChange={(value) => setYear({ goalBooks: Number(value) })} />
          <TextField label="Books finished" type="number" min={0} value={year.booksFinished} onChange={(value) => setYear({ booksFinished: Number(value) })} />
          <TextField label="Pages read" type="number" min={0} value={year.pagesRead} onChange={(value) => setYear({ pagesRead: Number(value) })} />
          <TextField label="Most-read genre" value={year.favouriteGenre} onChange={(favouriteGenre) => setYear({ favouriteGenre })} />
          <TextField label="Last updated" value={year.lastUpdated} onChange={(lastUpdated) => setYear({ lastUpdated })} />
        </div>
        <TextAreaField label="Note" value={year.note} onChange={(note) => setYear({ note })} />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-display text-lg text-ink-800">Reading moods</h3>
        {content.moods.map((mood, index) => (
          <ItemCard
            key={mood.id}
            title={mood.label || 'Untitled mood'}
            onRemove={() => onChange({ moods: content.moods.filter((_, i) => i !== index) })}
          >
            <TextField
              label="Mood label"
              value={mood.label}
              onChange={(label) => onChange({ moods: content.moods.map((item, i) => (i === index ? { ...item, label } : item)) })}
            />
            <CheckboxGroup
              label="Books for this mood"
              options={books}
              selected={mood.bookSlugs}
              onChange={(bookSlugs) =>
                onChange({ moods: content.moods.map((item, i) => (i === index ? { ...item, bookSlugs } : item)) })
              }
            />
          </ItemCard>
        ))}
        <AddButton
          label="Add a mood"
          onClick={() =>
            onChange({
              moods: [...content.moods, { id: newId('mood'), label: 'New mood', bookSlugs: [] }],
            })
          }
        />
      </div>
    </FormSection>
  );
}

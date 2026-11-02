import { AddButton, FormSection, ItemCard, SelectField, TextAreaField, TextField, type FormProps } from '@/components/admin/admin-ui';
import { bookOptions } from '@/components/admin/book-options';

export function ShelfForm({ content, onChange }: FormProps) {
  const books = bookOptions(content);
  const reading = content.currentlyReading;
  const month = content.bookOfTheMonth;

  const setPairing = (index: number, changes: Partial<(typeof content.pairings)[number]>) =>
    onChange({ pairings: content.pairings.map((pairing, i) => (i === index ? { ...pairing, ...changes } : pairing)) });

  return (
    <FormSection title="Currently reading and pairings" description="The book you are reading now, the book of the month, and books that go well together.">
      <div className="flex flex-col gap-5 rounded-sm border border-parchment-300 bg-parchment-50/80 p-5 shadow-page">
        <h3 className="font-display text-lg text-ink-800">Currently reading</h3>
        <SelectField
          label="Book"
          value={reading.slug}
          options={books}
          onChange={(slug) => onChange({ currentlyReading: { ...reading, slug } })}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Pages read"
            type="number"
            min={0}
            value={reading.pagesRead}
            onChange={(value) => onChange({ currentlyReading: { ...reading, pagesRead: Number(value) } })}
          />
          <TextField
            label="Total pages"
            type="number"
            min={1}
            value={reading.totalPages}
            onChange={(value) => onChange({ currentlyReading: { ...reading, totalPages: Number(value) } })}
          />
        </div>
        <TextAreaField
          label="Note about this book"
          value={reading.personalNote}
          onChange={(personalNote) => onChange({ currentlyReading: { ...reading, personalNote } })}
        />
      </div>

      <div className="flex flex-col gap-5 rounded-sm border border-parchment-300 bg-parchment-50/80 p-5 shadow-page">
        <h3 className="font-display text-lg text-ink-800">Book of the month</h3>
        <SelectField
          label="Book"
          value={month.slug}
          options={books}
          onChange={(slug) => onChange({ bookOfTheMonth: { ...month, slug } })}
        />
        <TextField
          label="Month label"
          value={month.monthLabel}
          onChange={(monthLabel) => onChange({ bookOfTheMonth: { ...month, monthLabel } })}
        />
        <TextAreaField
          label="Recommendation"
          rows={4}
          value={month.recommendation}
          onChange={(recommendation) => onChange({ bookOfTheMonth: { ...month, recommendation } })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-display text-lg text-ink-800">If you loved this, read this</h3>
        {content.pairings.map((pairing, index) => (
          <ItemCard
            key={`${pairing.first}-${pairing.second}-${index}`}
            title={`Pairing ${index + 1}`}
            onRemove={() => onChange({ pairings: content.pairings.filter((_, i) => i !== index) })}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField label="First book" value={pairing.first} options={books} onChange={(first) => setPairing(index, { first })} />
              <SelectField label="Second book" value={pairing.second} options={books} onChange={(second) => setPairing(index, { second })} />
            </div>
            <TextAreaField label="Why they go together" value={pairing.reason} onChange={(reason) => setPairing(index, { reason })} />
          </ItemCard>
        ))}
        <AddButton
          label="Add a pairing"
          onClick={() =>
            onChange({
              pairings: [...content.pairings, { first: books[0]?.value ?? '', second: books[0]?.value ?? '', reason: '' }],
            })
          }
        />
      </div>
    </FormSection>
  );
}

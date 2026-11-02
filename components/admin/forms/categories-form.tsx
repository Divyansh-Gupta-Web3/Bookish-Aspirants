import { AddButton, FormSection, ItemCard, TextAreaField, TextField, newId, type FormProps } from '@/components/admin/admin-ui';

export function CategoriesForm({ content, onChange }: FormProps) {
  const setCategory = (slug: string, changes: Partial<(typeof content.categories)[number]>) =>
    onChange({
      categories: content.categories.map((category) => (category.slug === slug ? { ...category, ...changes } : category)),
    });

  const removeCategory = (slug: string) =>
    onChange({ categories: content.categories.filter((category) => category.slug !== slug) });

  const addCategory = () =>
    onChange({
      categories: [
        ...content.categories,
        { slug: newId('shelf'), name: 'New shelf', description: '', image: '' },
      ],
    });

  return (
    <FormSection title="Categories" description="The shelves that group books. Each shelf has its own page and a photo.">
      {content.categories.map((category) => (
        <ItemCard key={category.slug} title={category.name || 'Untitled shelf'} onRemove={() => removeCategory(category.slug)}>
          <p className="font-body text-xs text-ink-500">Page address: /category/{category.slug}</p>
          <TextField label="Name" value={category.name} onChange={(name) => setCategory(category.slug, { name })} />
          <TextAreaField
            label="Description"
            value={category.description}
            onChange={(description) => setCategory(category.slug, { description })}
          />
          <TextField label="Photo web address" value={category.image} onChange={(image) => setCategory(category.slug, { image })} />
        </ItemCard>
      ))}
      <AddButton label="Add a shelf" onClick={addCategory} />
    </FormSection>
  );
}

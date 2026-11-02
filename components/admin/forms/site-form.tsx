import { FormSection, TextAreaField, TextField, type FormProps } from '@/components/admin/admin-ui';

export function SiteForm({ content, onChange }: FormProps) {
  const site = content.site;
  const setSite = (changes: Partial<typeof site>) => onChange({ site: { ...site, ...changes } });

  return (
    <FormSection title="Site details" description="The name, contact details and the hero headline shown at the top of the home page.">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Site name" value={site.name} onChange={(name) => setSite({ name })} />
        <TextField label="Creator name" value={site.creator} onChange={(creator) => setSite({ creator })} />
        <TextField label="Contact email" type="email" value={site.email} onChange={(email) => setSite({ email })} />
        <TextField label="Instagram link" value={site.instagramUrl} onChange={(instagramUrl) => setSite({ instagramUrl })} />
      </div>
      <TextField label="Tagline" value={site.tagline} onChange={(tagline) => setSite({ tagline })} />
      <TextField
        label="Hero headline"
        value={content.hero.headline}
        onChange={(headline) => onChange({ hero: { headline } })}
      />
      <TextAreaField
        label="Affiliate disclosure"
        rows={4}
        value={site.affiliateDisclosure}
        onChange={(affiliateDisclosure) => setSite({ affiliateDisclosure })}
      />
    </FormSection>
  );
}

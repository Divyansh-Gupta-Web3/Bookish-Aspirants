import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { SiteContent } from '@/lib/content/schema';

export type FormProps = {
  content: SiteContent;
  onChange: (changes: Partial<SiteContent>) => void;
};

export const inputClass =
  'w-full rounded-sm border border-parchment-400 bg-parchment-50 px-3 py-2 font-body text-sm text-ink-800 focus:border-burgundy-700 focus:outline-none';

export function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

type TextFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email';
  step?: string;
  min?: number;
  max?: number;
};

export function TextField({ label, value, onChange, type = 'text', step, min, max }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs uppercase tracking-[0.2em] text-ink-600">{label}</span>
      <input
        type={type}
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function TextAreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs uppercase tracking-[0.2em] text-ink-600">{label}</span>
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs uppercase tracking-[0.2em] text-ink-600">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type CheckboxGroupProps = {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export function CheckboxGroup({ label, options, selected, onChange }: CheckboxGroupProps) {
  const toggle = (value: string) =>
    onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-body text-xs uppercase tracking-[0.2em] text-ink-600">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                'cursor-pointer rounded-sm border px-3 py-1.5 font-body text-sm transition-colors duration-200',
                checked ? 'border-burgundy-700 bg-burgundy-700 text-parchment-50' : 'border-ink-300 bg-parchment-50 text-ink-700 hover:border-burgundy-700'
              )}
            >
              <input type="checkbox" checked={checked} onChange={() => toggle(option.value)} className="sr-only" />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ItemCard({ title, onRemove, children }: { title: string; onRemove: () => void; children: ReactNode }) {
  return (
    <article className="flex flex-col gap-4 rounded-sm border border-parchment-300 bg-parchment-50/80 p-5 shadow-page">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg text-ink-800">{title}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="font-body text-sm text-ink-500 transition-colors duration-300 hover:text-brick-700"
        >
          Remove
        </button>
      </div>
      {children}
    </article>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start rounded-sm border border-burgundy-700 px-5 py-2 font-body text-sm text-burgundy-700 transition-colors duration-300 hover:bg-burgundy-700 hover:text-parchment-50"
    >
      {label}
    </button>
  );
}

export function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h2 className="font-display text-3xl text-ink-800">{title}</h2>
        <p className="font-body text-sm text-ink-600">{description}</p>
      </header>
      {children}
    </div>
  );
}

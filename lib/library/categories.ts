import { CONTENT } from '@/lib/content';

export type CategorySlug = string;

export const CATEGORIES = CONTENT.categories;

export function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

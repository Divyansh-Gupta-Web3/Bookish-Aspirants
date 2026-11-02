import { CONTENT } from '@/lib/content';

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ...CONTENT.site,
};

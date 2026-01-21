// This file was originally for Next.js markdown handling
// For this Vite app, blogs are fetched from the API
// Keeping the type definitions for reference

export type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
};

export type PostIndexItem = {
  slug: string;
  meta: PostMeta;
};
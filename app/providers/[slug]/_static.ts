import providers from '../../../lib/data/providers.json';

// Generate static params for provider slugs (Bangladesh context)
export async function generateStaticParams() {
  return (providers as any[]).map((p) => ({
    slug: (p.name as string).toLowerCase().replace(/\s+/g, '-'),
  }));
}

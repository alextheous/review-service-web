import providers from '../../../lib/data/providers.json';

// Generate static params for provider slugs
export async function generateStaticParams() {
  return (providers as any[]).map((p) => ({
    slug: p.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

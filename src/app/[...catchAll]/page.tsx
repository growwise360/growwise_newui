import { notFound } from 'next/navigation';

/** Root unknown paths are real 404s; known root routes have explicit pages or middleware handling. */
export const dynamic = 'force-dynamic';

export default function CatchAllPage() {
  notFound();
}

import fs from 'node:fs';
import path from 'node:path';

describe('workshop calendar Event JSON-LD', () => {
  it('provides an absolute image URL for every generated Event', () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'src/app/[locale]/workshop-calendar/layout.tsx'),
      'utf8',
    );

    expect(source).toContain('image: `${baseUrl}/og-image.jpg`');
  });
});

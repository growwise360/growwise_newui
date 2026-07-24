import canonical from '@/i18n/messages/summer-camp-canonical-en.json';

describe('summer camp academic teaser copy', () => {
  const teaser = canonical.conversion;

  it('includes required teaser fields for the in-grid band', () => {
    expect(teaser.academicTeaserBadge).toBe('New · June 15');
    expect(teaser.academicTeaserHeading).toMatch(/reading, writing, or math support/i);
    expect(teaser.academicTeaserSubhead).toMatch(/90 min\/day/i);
    expect(teaser.academicTeaserPills).toHaveLength(4);
    expect(teaser.academicTeaserFooter).toMatch(/\$249/);
    expect(teaser.academicTeaserHref).toBe('/camps/academic-summer-programs-dublin-ca');
    expect(teaser.academicTeaserCta).toMatch(/View academic programs/i);
  });
});

import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync(
  path.join(
    process.cwd(),
    'src',
    'app',
    '[locale]',
    'book-assessment',
    'BookAssessmentPageClient.tsx',
  ),
  'utf8',
);

describe('book assessment Hormozi redesign', () => {
  it('keeps the free offer primary with verified proof, guarantee, and value CTA', () => {
    expect(source).toContain('Free Assessments Available Until July 31');
    expect(source).toContain('Free 30-Minute Assessment');
    expect(source).toContain('Find the exact gap. Leave with a written plan. No cost, no pressure.');
    expect(source).toContain("we&apos;ll run a second session free");
    expect(source).toContain("Get My Child's Free 30-Min Assessment →");
    expect(source).toContain('24-hour response · SSL secure · No credit card');
    expect(source).not.toContain('12 spots left');
    expect(source).not.toContain('98% of families stay');
    expect(source).not.toContain('ASSESSMENT_PATHS');
  });

  it('shows the $49 Full Diagnostic as a secondary expandable option', () => {
    expect(source).toContain('60-Minute Full Diagnostic · $49');
    expect(source).toContain('Choose Full Diagnostic');
    expect(source).toContain('selectFullDiagnosticAndScroll');
    expect(source).toContain('Switch to free assessment');
    expect(source).toContain("Request My Child's 60-Min Full Diagnostic →");
  });

  it('keeps the required fields in the approved order', () => {
    const fields = [
      'htmlFor="parentName"',
      'htmlFor="email"',
      'htmlFor="phone"',
      'htmlFor="grade"',
      'htmlFor="subjectInterest"',
    ];
    const positions = fields.map((field) => source.indexOf(field));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it('renders the four approved assessment process steps only', () => {
    expect(source).toContain("title: 'Start With Your Concern'");
    expect(source).toContain("title: 'Check Core Skills'");
    expect(source).toContain("title: 'Watch the Thinking Process'");
    expect(source).toContain("title: 'Find the Real Gap'");
    expect(source).not.toContain("title: 'Recommend the Next Step'");
  });
});

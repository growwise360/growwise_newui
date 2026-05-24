const CURRICULUM_ITEMS = [
  'California State Standards',
  'Common Core Math',
  'Integrated Math 1 / 2 / 3',
  'SAT / ACT Aligned',
  'College Board AP',
  'SBAC Assessment Prep',
  'Next Generation Science Standards',
] as const;

export function HomeCurriculumTicker() {
  const track = [...CURRICULUM_ITEMS, ...CURRICULUM_ITEMS];

  return (
    <div className="home-ticker-section" aria-hidden>
      <div className="home-curriculum-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="home-curriculum-item">
            <span className="home-curriculum-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

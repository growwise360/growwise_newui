/**
 * Parent testimonials for /from-nextdoor and /about.
 * Replace quotes with exact Nextdoor copy when provided by the team.
 */
export type FromNextdoorTestimonial = {
  quote: string
  parentName: string
  childContext?: string
  source: 'nextdoor' | 'google'
}

export const FROM_NEXTDOOR_TESTIMONIALS: readonly FromNextdoorTestimonial[] = [
  {
    quote:
      'GrowWise is emerging as a hidden gem for elementary and middle school students. Classes start from the basics and progress thoughtfully, with instructors who are fantastic educators and experts in Python. My child is excited to attend every week.',
    parentName: 'Dublin parent',
    childContext: 'Middle school · Python',
    source: 'nextdoor',
  },
  {
    quote:
      'The small class sizes create a supportive environment where kids feel comfortable asking questions. Hands-on projects really solidify understanding and build problem-solving skills.',
    parentName: 'Tri-Valley parent',
    childContext: 'Elementary · enrichment',
    source: 'nextdoor',
  },
  {
    quote:
      'My son attended the half-day Python coding camp and grasped fundamentals quickly thanks to the small class size and personalized teaching. He loved building projects like the Hangman game.',
    parentName: 'Roger Jiang',
    childContext: 'Python camp · Level 1 & 2',
    source: 'google',
  },
  {
    quote:
      'We have seen noticeable progress in writing and math with 1:1 classes. The team is dedicated, encouraging, and clearly focused on each child’s growth.',
    parentName: 'Vivek Chaturvedi',
    childContext: 'Grades 3–12 · Math & English',
    source: 'google',
  },
]

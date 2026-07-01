import type { Program } from '@/hooks/usePricingConfig';

import type { FutureSkillsSlug } from './futureSkillsPathways';

export type PricingProgramId = 'python' | 'aiml' | 'appdev';

export type CatalogCourseId =
  | 'python-programming'
  | 'machine-learning-generative-ai'
  | 'appspark-app-development';

export type DiscoveryPath = '/coding/python' | '/coding/ml-ai' | '/coding/app-development';

export interface CodingProgramSurface {
  pricingProgramId: PricingProgramId;
  catalogCourseId: CatalogCourseId;
  discoveryPath: DiscoveryPath;
  futureSkillsSlug?: FutureSkillsSlug;
  shortTitle: string;
  catalogName: string;
  catalogDescription: string;
  discoveryLinkLabel: string;
  bestForGrades: string;
  sortOrder: number;
  duration: string;
  level: string;
  gradeLevel: string[];
  courseType: string[];
  alignment: string[];
  features: string[];
  image: string;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  tags: string[];
  learningPathSteps: string[];
}

export const CODING_SURFACES: readonly CodingProgramSurface[] = [
  {
    pricingProgramId: 'python',
    catalogCourseId: 'python-programming',
    discoveryPath: '/coding/python',
    futureSkillsSlug: 'python-certification',
    shortTitle: 'Python Programming',
    catalogName: 'Python Programming',
    catalogDescription: 'Master Python Programming — from beginner to advanced',
    discoveryLinkLabel: 'Explore Python classes & book trial',
    bestForGrades: 'Grades 5–12',
    sortOrder: 1,
    duration: '12 weeks',
    level: 'All Levels',
    gradeLevel: ['Elementary', 'Middle School', 'High School'],
    courseType: ['Programming', 'STEAM'],
    alignment: ['CSTA Standards', 'Computer Science'],
    features: [
      'Complete Python programming curriculum',
      'Hands-on coding projects and exercises',
      'Interactive learning environment',
      'Real-world application development',
      'Portfolio building opportunities',
      'Industry-standard tools and practices',
    ],
    image: '/assets/photos/photo-1526379095098-d400fd0bf935.jpg',
    instructor: 'Dr. Alex Martinez',
    rating: 4.9,
    studentsEnrolled: 156,
    tags: ['Python', 'Programming', 'STEAM'],
    learningPathSteps: [
      'Master Python fundamentals',
      'Build real applications',
      'Create project portfolio',
    ],
  },
  {
    pricingProgramId: 'aiml',
    catalogCourseId: 'machine-learning-generative-ai',
    discoveryPath: '/coding/ml-ai',
    futureSkillsSlug: 'ai-machine-learning',
    shortTitle: 'ML & AI',
    catalogName: 'Machine Learning and Generative AI',
    catalogDescription: 'Learn real-world AI and machine learning for middle and high school',
    discoveryLinkLabel: 'Explore ML & AI classes & book trial',
    bestForGrades: 'Grades 7–12',
    sortOrder: 2,
    duration: '14 weeks',
    level: 'Intermediate to Advanced',
    gradeLevel: ['Middle School', 'High School'],
    courseType: ['Machine Learning', 'AI', 'Programming', 'STEAM'],
    alignment: ['CSTA Standards', 'Computer Science', 'AI/ML Standards'],
    features: [
      'Introduction to machine learning concepts',
      'Hands-on experience with AI tools',
      'Generative AI and large language models',
      'Computer vision and neural networks',
      'Real-world AI project development',
      'Ethical AI and responsible development',
      'Industry-standard ML frameworks',
      'Portfolio of AI/ML projects',
    ],
    image: '/assets/photos/photo-1555949963-aa79dcee981c.jpg',
    instructor: 'Dr. Priya Patel',
    rating: 4.9,
    studentsEnrolled: 124,
    tags: ['Machine Learning', 'AI', 'Generative AI', 'STEAM'],
    learningPathSteps: [
      'Learn AI/ML concepts',
      'Use real AI tools',
      'Build smart apps',
    ],
  },
  {
    pricingProgramId: 'appdev',
    catalogCourseId: 'appspark-app-development',
    discoveryPath: '/coding/app-development',
    shortTitle: 'App Development',
    catalogName: 'AppSpark - App Development',
    catalogDescription: 'App development — learn to code and build apps',
    discoveryLinkLabel: 'Explore app development classes & book trial',
    bestForGrades: 'Grades 6–12',
    sortOrder: 3,
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    gradeLevel: ['Middle School', 'High School'],
    courseType: ['App Development', 'Programming', 'STEAM'],
    alignment: ['CSTA Standards', 'Computer Science', 'Mobile Development'],
    features: [
      'Cross-platform mobile app development',
      'iOS and Android app creation',
      'User interface and experience design',
      'Database integration and API usage',
      'App store deployment strategies',
      'Real-world project portfolio',
      'Industry-standard development tools',
      'Collaborative coding practices',
    ],
    image: '/assets/photos/photo-1551650975-87deedd944c3.jpg',
    instructor: 'Sarah Chen',
    rating: 4.8,
    studentsEnrolled: 89,
    tags: ['App Development', 'Mobile', 'Programming', 'STEAM'],
    learningPathSteps: [
      'Design app interfaces',
      'Code mobile apps',
      'Deploy to app stores',
    ],
  },
] as const;

export interface CatalogCourseDisplay {
  id: CatalogCourseId;
  name: string;
  description: string;
  price: number;
  priceRange: string;
  discoveryPath: DiscoveryPath;
  discoveryLinkLabel: string;
  duration: string;
  level: string;
  gradeLevel: string[];
  courseType: string[];
  alignment: string[];
  features: string[];
  image: string;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  tags: string[];
  learningPathSteps: string[];
}

export function getCodingSurfaceByDiscoveryPath(path: string): CodingProgramSurface | undefined {
  return CODING_SURFACES.find((surface) => surface.discoveryPath === path);
}

export function getCodingSurfaceByCatalogId(id: CatalogCourseId): CodingProgramSurface | undefined {
  return CODING_SURFACES.find((surface) => surface.catalogCourseId === id);
}

export function getCodingSurfaceByPricingProgramId(id: PricingProgramId): CodingProgramSurface | undefined {
  return CODING_SURFACES.find((surface) => surface.pricingProgramId === id);
}

export function getCodingSurfaceByFutureSkillsSlug(slug: FutureSkillsSlug): CodingProgramSurface | undefined {
  return CODING_SURFACES.find((surface) => surface.futureSkillsSlug === slug);
}

export function getCodingDiscoveryLinks(): { href: DiscoveryPath; label: string }[] {
  return CODING_SURFACES.map((surface) => ({
    href: surface.discoveryPath,
    label: `${surface.shortTitle} coding classes`,
  }));
}

export function getCodingCertificationLinks(): { href: string; label: string }[] {
  return CODING_SURFACES.filter((surface) => surface.futureSkillsSlug).map((surface) => ({
    href: `/future-skills/${surface.futureSkillsSlug}`,
    label: `${surface.shortTitle} certification pathway`,
  }));
}

export function formatProgramPriceRange(program: Program): string {
  const prices = program.tiers
    .map((tier) => tier.price_live ?? tier.price_studio)
    .filter((price): price is number => price != null);

  if (prices.length === 0) {
    return 'Contact us for pricing';
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$${min}` : `$${min}–$${max}`;
}

export function getProgramSortPrice(program: Program): number {
  const prices = program.tiers
    .map((tier) => tier.price_live ?? tier.price_studio)
    .filter((price): price is number => price != null);

  return prices.length > 0 ? Math.min(...prices) : 0;
}

export function buildCatalogCoursesFromPricing(programs: Program[]): CatalogCourseDisplay[] {
  return CODING_SURFACES.map((surface) => {
    const program = programs.find((entry) => entry.id === surface.pricingProgramId && entry.active);

    const priceRange = program ? formatProgramPriceRange(program) : 'Contact us for pricing';
    const price = program ? getProgramSortPrice(program) : 0;

    return {
      id: surface.catalogCourseId,
      name: surface.catalogName,
      description: surface.catalogDescription,
      price,
      priceRange,
      discoveryPath: surface.discoveryPath,
      discoveryLinkLabel: surface.discoveryLinkLabel,
      duration: surface.duration,
      level: surface.level,
      gradeLevel: surface.gradeLevel,
      courseType: surface.courseType,
      alignment: surface.alignment,
      features: surface.features,
      image: surface.image,
      instructor: surface.instructor,
      rating: surface.rating,
      studentsEnrolled: surface.studentsEnrolled,
      tags: surface.tags,
      learningPathSteps: surface.learningPathSteps,
    };
  }).sort((a, b) => {
    const orderA = CODING_SURFACES.find((s) => s.catalogCourseId === a.id)?.sortOrder ?? 0;
    const orderB = CODING_SURFACES.find((s) => s.catalogCourseId === b.id)?.sortOrder ?? 0;
    return orderA - orderB;
  });
}

export function getFutureSkillsDiscoveryPage(slug: FutureSkillsSlug): {
  href: string;
  title: string;
  description: string;
} | null {
  const surface = getCodingSurfaceByFutureSkillsSlug(slug);
  if (!surface) {
    return null;
  }

  if (slug === 'python-certification') {
    return {
      href: surface.discoveryPath,
      title: 'Python coding classes',
      description:
        'Start with foundations, projects, and trial classes before committing to a certification pathway.',
    };
  }

  if (slug === 'ai-machine-learning') {
    return {
      href: surface.discoveryPath,
      title: 'ML and AI coding classes',
      description:
        'Start with trial-first ML and AI classes before committing to a structured certification pathway.',
    };
  }

  return null;
}

export const STEAM_CATALOG_PATH = '/steam/ml-ai-coding';

export function getCatalogAnchorForDiscoveryPath(path: DiscoveryPath): string {
  const surface = getCodingSurfaceByDiscoveryPath(path);
  return surface ? `${STEAM_CATALOG_PATH}#${surface.catalogCourseId}` : STEAM_CATALOG_PATH;
}

import type { FounderTeamMember } from '@/components/sections/about/FounderSection'

/** Shared blank avatar for instructors without a photo yet. */
export const INSTRUCTOR_PLACEHOLDER_IMAGE = '/assets/instructors/avatar-placeholder.svg'

/** Instructor grid cards for /about (founder shown separately in FounderSection). */
export const TEAM_INSTRUCTORS: FounderTeamMember[] = [
  {
    name: 'Navneet Kaur',
    role: 'Math Instructor',
    image: '',
    bio: 'Math specialist with a focus on building real concept clarity in Algebra, Calculus, and Calculus AB — the foundation most kids are missing.',
    expertise: ['Algebra', 'Calculus', 'Calculus AB'],
  },
  {
    name: 'Arushi Srivastava',
    role: 'Coding Instructor',
    image: '/assets/photos/arushi-srivastava.jpg',
    bio: 'Coding instructor who makes programming approachable for every learning style — from first-time coders to advanced builders.',
    expertise: ['Coding', 'Python', 'STEAM'],
  },
  {
    name: 'Sandeep Verma',
    role: 'High School Math Instructor',
    image: '',
    bio: 'High school math teacher bringing classroom-tested strategies to every session. Specializes in Algebra, Geometry, and Calculus.',
    expertise: ['Algebra', 'Geometry', 'Calculus'],
  },
  {
    name: 'Leon Blank',
    role: 'English Instructor',
    image: '',
    bio: 'English instructor focused on reading comprehension, writing clarity, and helping students find their voice on paper.',
    expertise: ['English', 'Writing', 'Reading'],
  },
]

/** Merge API/mock instructor rows onto canonical defaults (order, photos, fallbacks). */
export function mergeInstructorCards(apiMembers: FounderTeamMember[] | undefined): FounderTeamMember[] {
  return TEAM_INSTRUCTORS.map((defaults) => {
    const fromApi = apiMembers?.find((member) => member.name === defaults.name)
    if (!fromApi) return defaults

    const apiImage = typeof fromApi.image === 'string' ? fromApi.image.trim() : ''
    const defaultImage = typeof defaults.image === 'string' ? defaults.image.trim() : ''

    return {
      ...defaults,
      role: fromApi.role || defaults.role,
      bio: fromApi.bio || defaults.bio,
      expertise: fromApi.expertise?.length ? fromApi.expertise : defaults.expertise,
      image: apiImage || defaultImage,
    }
  })
}

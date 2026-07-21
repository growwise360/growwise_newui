import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Gamepad2, Play, UserRound } from 'lucide-react'

type StudentProject = {
  name: string
  grade?: number
  projectTitle: string
  description: string
  profileImage?: string
  projectImage?: string
  robloxUrl?: string
  tutorialUrl?: string
}

export const STUDENT_PROJECTS: readonly StudentProject[] = [
  {
    name: 'Dhriti Verma',
    grade: 7,
    projectTitle: 'Chill Mode: Obby',
    description:
      'I developed my first Roblox game, Chill Mode: Obby, an obstacle-course challenge with multiple stages. Players can progress through exciting levels or buy a pass with Robux to help them clear the obby. My game is available for everyone to play on Roblox.',
  },
  {
    name: 'Jayanth Panneer Selvam',
    grade: 7,
    projectTitle: 'Infected Forest',
    description:
      'I developed my first Roblox game, Infected Forest, with multiple stages. Players can progress through exciting levels or buy a pass with Robux to help them clear the obby. My game is available for everyone to play on Roblox.',
    tutorialUrl: 'https://youtu.be/U0kcjFK3eRQ',
  },
  {
    name: 'Aadya Agarwal',
    grade: 7,
    projectTitle: 'Obby Seasons Reloaded',
    description:
      'I developed my first Roblox game, Obby Seasons Reloaded, where players race through challenging obstacle courses set in different seasons. Each level offers new surprises and fun challenges. Players can purchase special passes with Robux to unlock features and make the journey easier.',
    tutorialUrl: 'https://youtu.be/v4YvFM1Xbs0',
  },
  {
    name: 'Anvita Punati',
    grade: 6,
    projectTitle: 'Aesthetic Obby',
    description:
      'I developed my first Roblox game, Aesthetic Obstacle Course, featuring multiple exciting stages. Players can progress through fun and challenging levels. My creation is available for everyone to play on Roblox.',
  },
  {
    name: 'Bhargava Ram Chekuri',
    projectTitle: 'Cosmic Tower Defence',
    description:
      'In Cosmic Tower Defence, players defend their galaxy from waves of space invaders by building and upgrading powerful cosmic towers. Each stage brings new challenges and mysterious alien bosses, making every round a unique adventure among the stars.',
  },
  {
    name: 'Aaran Karthik',
    grade: 6,
    projectTitle: 'Obby Challenge',
    description:
      'I developed my first Roblox game, Obby Challenge, featuring multiple exciting stages. Players can progress through fun and challenging levels. My creation is available for everyone to play on Roblox.',
    tutorialUrl: 'https://youtu.be/bKVlV5jPn0E',
  },
] as const

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

function StudentProjectCard({ project }: { project: StudentProject }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-gradient-to-br from-[#dbe7ff] to-[#eef3ff] p-6">
        {project.profileImage ? (
          <Image
            src={project.profileImage}
            alt={`${project.name}, Roblox game developer`}
            width={160}
            height={160}
            className="mx-auto aspect-square h-36 w-36 rounded-full object-cover ring-4 ring-white sm:h-40 sm:w-40"
          />
        ) : (
          <span
            role="img"
            aria-label={`${project.name} profile photo placeholder`}
            className="mx-auto flex aspect-square h-36 w-36 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#1F396D] ring-4 ring-white sm:h-40 sm:w-40"
          >
            {initials(project.name)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F16112]">
          <UserRound className="h-4 w-4" aria-hidden />
          {project.grade ? `Grade ${project.grade}` : 'Student developer'}
        </div>
        <h2 className="font-heading mt-3 text-2xl font-bold leading-tight text-[#1F396D]">{project.name}</h2>
        <p className="mt-1 text-sm font-bold text-slate-700">Roblox Game Developer</p>
        <h3 className="font-heading mt-5 text-xl font-bold text-slate-950">{project.projectTitle}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {project.projectImage ? (
            <Image
              src={project.projectImage}
              alt={`${project.projectTitle} game artwork`}
              width={640}
              height={360}
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={`${project.projectTitle} game artwork placeholder`}
              className="flex aspect-video items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-[#1F396D]"
            >
              <Gamepad2 className="h-10 w-10" aria-hidden />
            </div>
          )}
        </div>

        {(project.robloxUrl || project.tutorialUrl) && (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {project.robloxUrl && (
              <a
                href={project.robloxUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Play ${project.projectTitle} by ${project.name} on Roblox (opens in a new tab)`}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-[#1F396D] px-4 text-sm font-bold text-[#1F396D] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
              >
                Play Game
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
              </a>
            )}
            {project.tutorialUrl && (
              <a
                href={project.tutorialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${project.projectTitle} tutorial by ${project.name} on YouTube (opens in a new tab)`}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#1F396D] px-4 text-sm font-bold text-white transition-colors hover:bg-[#172b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2"
              >
                <Play className="mr-2 h-4 w-4 fill-current" aria-hidden />
                Watch Tutorial
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/resources/student-corner"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-[#1F396D] transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Student Corner
          </Link>
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wide text-[#F16112] sm:text-sm">Projects</p>
            <h1 className="font-heading mt-3 text-3xl font-bold leading-tight text-[#1F396D] sm:text-5xl">
              Projects & Portfolio Highlights
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              Meet GrowWise students who turned coding skills and creative ideas into Roblox games people can play.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" aria-label="Student Roblox projects">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STUDENT_PROJECTS.map((project) => (
              <StudentProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

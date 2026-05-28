'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { INSTRUCTOR_PLACEHOLDER_IMAGE } from '@/data/team-instructors'
import type { FounderTeamMember } from './FounderSection'

interface TeamSectionProps {
  members: FounderTeamMember[]
}

function normalizePhotoSrc(image: string | undefined | null): string {
  if (typeof image !== 'string') return ''
  const trimmed = image.trim()
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return ''
  return trimmed
}

function InstructorPlaceholder({ name }: { name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={INSTRUCTOR_PLACEHOLDER_IMAGE}
      alt={`${name} — photo coming soon`}
      width={96}
      height={96}
      className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
      loading="lazy"
      decoding="async"
    />
  )
}

function InstructorAvatar({ name, image }: { name: string; image: string }) {
  const [failed, setFailed] = useState(false)
  const src = normalizePhotoSrc(image)

  if (!src || failed) {
    return <InstructorPlaceholder name={name} />
  }

  return (
    // Native img avoids Next.js optimizer 404s for optional local instructor photos.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={96}
      height={96}
      className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export function TeamSection({ members }: TeamSectionProps) {
  if (members.length === 0) return null

  return (
    <section className="section-base section-white" aria-labelledby="team-section-title">
      <div className="max-w-7xl mx-auto">
        <div className="center-text mb-12">
          <h2 id="team-section-title" className="title-section mb-4">
            Our Instructors
          </h2>
          <p className="subtitle-sm max-w-3xl mx-auto">
            Approachable educators — Python, robotics, creative writing, and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <Card
              key={member.name}
              className="bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <InstructorAvatar name={member.name} image={member.image} />
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">{member.name}</h3>
                <p className="text-[#F16112] font-semibold text-sm text-center mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

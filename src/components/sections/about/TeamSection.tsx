'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { FounderTeamMember } from './FounderSection'

interface TeamSectionProps {
  members: FounderTeamMember[]
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
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
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

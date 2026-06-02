'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { publicPath } from '@/lib/publicPath'
import { FOUNDER_COPY } from '@/data/founder-copy'

export interface FounderTeamMember {
  name: string
  role: string
  image: string
  bio: string
  expertise: string[]
  education?: string
}

/** Founder spotlight — always reads from FOUNDER_COPY (never API teamMembers). */
export function FounderSection() {
  const locale = useLocale()
  const t = useTranslations('about.founder')

  return (
    <section className="section-base section-gray" aria-labelledby="founder-section-title">
      <div className="max-w-7xl mx-auto">
        <div className="center-text mb-12">
          <h2 id="founder-section-title" className="title-section mb-4">
            {t('title')}
          </h2>
          <p className="subtitle-sm max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 group max-w-4xl w-full mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative flex-shrink-0">
                <Image
                  src={FOUNDER_COPY.image}
                  alt={FOUNDER_COPY.name}
                  width={160}
                  height={160}
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F16112] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" aria-hidden />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{FOUNDER_COPY.name}</h3>
                <p className="text-[#F16112] font-semibold text-lg mb-4">{FOUNDER_COPY.role}</p>
                {FOUNDER_COPY.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-gray-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                <p className="border-l-4 border-[#F16112] pl-4 text-gray-700 italic mb-6">
                  &ldquo;{FOUNDER_COPY.quote}&rdquo;
                </p>

                {FOUNDER_COPY.education ? (
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Education:</p>
                    <p className="text-sm text-gray-600">{FOUNDER_COPY.education}</p>
                  </div>
                ) : null}

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-gray-700">Expertise:</div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {FOUNDER_COPY.expertise.map((skill) => (
                      <Badge key={skill} className="bg-[#1F396D]/10 text-[#1F396D] text-sm px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link
                  href={publicPath('/from-nextdoor', locale)}
                  className="mt-6 inline-flex text-sm font-semibold text-[#1F396D] underline-offset-2 hover:underline"
                >
                  See what neighbors say on Nextdoor →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

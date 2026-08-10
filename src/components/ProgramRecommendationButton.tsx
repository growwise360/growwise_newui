'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ProgramRecommendationModal, {
  type RecommendationGradeBand,
  type RecommendationSubject,
} from '@/components/ProgramRecommendationModal'
import { cn } from '@/lib/utils'

type ProgramRecommendationButtonProps = {
  sourcePage: string
  defaultSubject?: RecommendationSubject
  defaultGradeBand?: RecommendationGradeBand
  label?: string
  className?: string
}

export default function ProgramRecommendationButton({
  sourcePage,
  defaultSubject,
  defaultGradeBand,
  label = 'Get My Program Recommendation',
  className,
}: ProgramRecommendationButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} className={cn('min-h-11 rounded-full bg-[#F16112] px-7 font-semibold text-white hover:bg-[#d9540d]', className)}>
        {label}
      </Button>
      <ProgramRecommendationModal isOpen={open} onClose={() => setOpen(false)} sourcePage={sourcePage} defaultSubject={defaultSubject} defaultGradeBand={defaultGradeBand} />
    </>
  )
}

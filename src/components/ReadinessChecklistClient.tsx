'use client'

import { useState, useMemo } from 'react'

const CHECKLIST_ITEMS = [
  // Math Readiness — Grades 1–4
  { section: 'Math Readiness — Grades 1–4', text: 'Counts on fingers for basic addition or subtraction past 1st grade' },
  { section: 'Math Readiness — Grades 1–4', text: 'Cannot recall basic multiplication facts by end of 3rd grade' },
  { section: 'Math Readiness — Grades 1–4', text: 'Struggles to explain how they got an answer — guesses without process' },
  { section: 'Math Readiness — Grades 1–4', text: 'Makes the same arithmetic mistakes repeatedly — not random errors' },
  { section: 'Math Readiness — Grades 1–4', text: 'Avoids word problems or skips them entirely' },
  { section: 'Math Readiness — Grades 1–4', text: 'Confuses place value — treats 34 and 43 as similar or interchangeable' },
  { section: 'Math Readiness — Grades 1–4', text: 'Cannot identify simple fractions visually (½, ¼) by 3rd grade' },
  // Math Readiness — Grades 5–8
  { section: 'Math Readiness — Grades 5–8', text: 'Cannot convert between fractions, decimals, and percentages fluently' },
  { section: 'Math Readiness — Grades 5–8', text: 'Struggles with negative numbers or gets confused by signs in subtraction' },
  { section: 'Math Readiness — Grades 5–8', text: 'Cannot set up a ratio or proportion from a word problem' },
  { section: 'Math Readiness — Grades 5–8', text: 'Pre-algebra feels impossible — variables cause shutdown or refusal' },
  { section: 'Math Readiness — Grades 5–8', text: 'Makes consistent errors in multi-step problems — loses track of the process' },
  { section: 'Math Readiness — Grades 5–8', text: 'Cannot identify what operation a word problem is asking for' },
  { section: 'Math Readiness — Grades 5–8', text: 'Integrated Math 1 is assigned next year and current foundations are weak' },
  // Reading Comprehension
  { section: 'Reading Comprehension', text: 'Reads words correctly but cannot explain what a passage means' },
  { section: 'Reading Comprehension', text: 'Cannot identify the main idea vs. a supporting detail' },
  { section: 'Reading Comprehension', text: 'Struggles to make inferences — only understands what is stated explicitly' },
  { section: 'Reading Comprehension', text: 'Cannot answer "why" or "how" questions about a text' },
  { section: 'Reading Comprehension', text: 'Avoids reading independently — prefers to be read to past 2nd grade' },
  { section: 'Reading Comprehension', text: 'Comprehension drops significantly when text length increases' },
  { section: 'Reading Comprehension', text: 'Cannot compare two texts or identify an author\'s purpose' },
  // Writing Gaps
  { section: 'Writing Gaps', text: 'Writes short, vague sentences without supporting detail' },
  { section: 'Writing Gaps', text: 'Cannot construct a clear argument with evidence from a text' },
  { section: 'Writing Gaps', text: 'Uses the same sentence structure repeatedly throughout a piece' },
  { section: 'Writing Gaps', text: 'Avoids writing — freezes or shuts down when given a blank page' },
  { section: 'Writing Gaps', text: 'Cannot revise their own work — does not see what is unclear' },
  { section: 'Writing Gaps', text: 'Written explanations are much weaker than verbal explanations of the same idea' },
  { section: 'Writing Gaps', text: 'Essays lack a clear beginning, middle, and conclusion — ideas run together' },
  // Middle School Readiness — Grades 5–6 Transition
  { section: 'Middle School Readiness — Grades 5–6 Transition', text: 'Study habits are not in place — relies on parent reminders for everything' },
  { section: 'Middle School Readiness — Grades 5–6 Transition', text: 'Cannot manage a multi-day assignment independently from start to finish' },
  { section: 'Middle School Readiness — Grades 5–6 Transition', text: 'Does not review mistakes after a graded test — moves on without correction' },
  { section: 'Middle School Readiness — Grades 5–6 Transition', text: 'Struggles when a teacher does not re-explain every concept individually' },
  { section: 'Middle School Readiness — Grades 5–6 Transition', text: 'Cannot identify their own knowledge gaps — says "I get it" but scores poorly' },
  { section: 'Middle School Readiness — Grades 5–6 Transition', text: 'Homework takes 2–3× longer than peers without a clear reason' },
]

const TOTAL = CHECKLIST_ITEMS.length

interface ChecklistSection {
  name: string
  items: Array<{ idx: number; text: string }>
}

export function ReadinessChecklistClient() {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const handleToggle = (idx: number) => {
    const newSet = new Set(checked)
    if (newSet.has(idx)) {
      newSet.delete(idx)
    } else {
      newSet.add(idx)
    }
    setChecked(newSet)
  }

  const checkedCount = checked.size
  const pct = Math.round((checkedCount / TOTAL) * 100)

  // Group items by section
  const sections = useMemo(() => {
    const grouped: Record<string, ChecklistSection> = {}
    CHECKLIST_ITEMS.forEach((item, idx) => {
      if (!grouped[item.section]) {
        grouped[item.section] = { name: item.section, items: [] }
      }
      grouped[item.section].items.push({ idx, text: item.text })
    })
    return Object.values(grouped)
  }, [])

  // Compute score message and result visibility
  const scoreMessage = useMemo(() => {
    if (checkedCount === 0) {
      return { text: 'Check the signs that apply to your child.', alert: false }
    } else if (checkedCount <= 2) {
      const plural = checkedCount > 1 ? 's' : ''
      return { text: `${checkedCount} sign${plural} identified — strong foundation. Monitor at grade transitions.`, alert: false }
    } else if (checkedCount <= 5) {
      return { text: `${checkedCount} signs identified — gaps present. Early correction is faster.`, alert: true }
    } else {
      return { text: `${checkedCount} signs identified — a clear pattern has emerged.`, alert: true }
    }
  }, [checkedCount])

  const resultBlock = useMemo(() => {
    if (checkedCount < 3) {
      return null
    }
    if (checkedCount <= 5) {
      return {
        title: 'Gaps identified — early action helps.',
        text: `Your child shows ${checkedCount} signs of academic gaps. These respond well to structured, targeted practice before they compound.`,
        visible: true,
      }
    }
    return {
      title: 'Clear pattern identified.',
      text: `Your child shows ${checkedCount} signs across multiple areas. Gaps at this level typically compound — targeted gap-closing now is the most efficient path forward.`,
      visible: true,
    }
  }, [checkedCount])

  return (
    <div className="space-y-10">
      {/* Score Bar */}
      <div className="sticky top-4 z-10 bg-white border border-[#D8E8E0] rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-[#5A6472] uppercase tracking-wide">Signs Identified</span>
          <span className="font-serif text-xl text-[#0F3D22]">{checkedCount} / {TOTAL}</span>
        </div>
        <div className="h-2 bg-[#E8F5EE] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-[#1A6B3C] rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className={`text-sm min-h-5 ${scoreMessage.alert ? 'text-[#0F3D22] font-medium' : 'text-[#5A6472]'}`}>
          {scoreMessage.text}
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.name} className="rounded-lg overflow-hidden border border-[#D8E8E0]">
            <div className="bg-[#1A6B3C] text-white px-5 py-3 font-bold text-sm uppercase tracking-wider">
              {section.name}
            </div>
            <div className="bg-white divide-y divide-[#D8E8E0]">
              {section.items.map(({ idx, text }) => (
                <div
                  key={idx}
                  onClick={() => handleToggle(idx)}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors user-select-none ${
                    checked.has(idx) ? 'bg-[#E8F5EE]' : 'hover:bg-[#E8F5EE]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 flex-shrink-0 border-2 rounded flex items-center justify-center transition-all mt-0.5 ${
                      checked.has(idx)
                        ? 'bg-[#1A6B3C] border-[#1A6B3C]'
                        : 'border-[#C8E6D6] bg-white'
                    }`}
                  >
                    {checked.has(idx) && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <span
                    className={`text-sm leading-normal flex-1 ${
                      checked.has(idx) ? 'text-[#0F3D22] font-medium' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Result Block */}
      {resultBlock && resultBlock.visible && (
        <div className="bg-[#E8F5EE] border-2 border-[#C8E6D6] rounded-xl p-7 text-center">
          <h3 className="font-serif text-2xl text-[#0F3D22] mb-2">{resultBlock.title}</h3>
          <p className="text-[#5A6472] text-sm mb-5">{resultBlock.text}</p>
          <a
            href="https://growwiseschool.org/contact"
            className="inline-block bg-[#1A6B3C] text-white font-bold text-sm px-7 py-3 rounded-lg hover:bg-[#0F3D22] transition-colors"
          >
            Book a Free Academic Gap Assessment
          </a>
        </div>
      )}
    </div>
  )
}

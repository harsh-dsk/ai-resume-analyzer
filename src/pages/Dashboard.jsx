import { motion } from 'framer-motion'
import { Briefcase, ShieldCheck, Sparkles } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { ATSScoreCard } from '../components/ATSScoreCard'
import { DashboardCards } from '../components/DashboardCards'
import { SkillsChart } from '../components/SkillsChart'
import { SuggestionsPanel } from '../components/SuggestionsPanel'

export function Dashboard({ analysisData, analysisReady }) {
  if (!analysisReady) {
    return <Navigate to="/upload" replace />
  }

  const safeData = {
    atsScore: analysisData?.atsScore ?? 0,
    formattingScore: analysisData?.formattingScore ?? 0,
    keywordMatch: analysisData?.keywordMatch ?? 0,
    roleFit: analysisData?.roleFit ?? 0,
    fileName: analysisData?.fileName || 'resume.pdf',
    role: analysisData?.role || 'General Role',
    overview: analysisData?.overview || 'Analysis complete.',
    keywordsMissing: analysisData?.keywordsMissing || [],
    strengths: analysisData?.strengths || [],
    suggestions: analysisData?.suggestions || [],
    skillsMatch: analysisData?.skillsMatch || [],
  }

  const cards = [
    { title: 'Formatting', value: `${safeData.formattingScore}%`, icon: ShieldCheck },
    { title: 'Keyword Match', value: `${safeData.keywordMatch}%`, icon: Sparkles },
    { title: 'Role Fit', value: `${safeData.roleFit}%`, icon: Briefcase },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="px-4 pt-30 pb-14 sm:px-6 sm:pt-36 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Resume Analysis Dashboard
          </h1>
          <p className="mt-2 text-zinc-400">
            {safeData.fileName} · Target role: {safeData.role}
          </p>
        </div>

        <DashboardCards analyticsCards={cards} />

        <div className="mt-4 grid gap-4 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <ATSScoreCard score={safeData.atsScore} overview={safeData.overview} />
          </div>
          <div className="space-y-4 xl:col-span-8">
            <SuggestionsPanel
              keywordsMissing={safeData.keywordsMissing}
              strengths={safeData.strengths}
              suggestions={safeData.suggestions}
            />
            <SkillsChart skillsMatch={safeData.skillsMatch} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

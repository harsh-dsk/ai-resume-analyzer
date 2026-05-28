import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react'
import { dashboard, dashboardState } from '../data/siteData'
import { GlassCard } from '../components/ui/GlassCard'
import { SectionHeader } from '../components/ui/SectionHeader'

function ScoreCircle({ score }) {
  const radius = 62
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <div className="absolute h-44 w-44 rounded-full bg-cyan-400/12 blur-2xl" />
      <svg className="-rotate-90" width="176" height="176">
        <circle
          cx="88"
          cy="88"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />
        <motion.circle
          cx="88"
          cy="88"
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-black text-white">{score}</p>
        <p className="text-xs tracking-wide text-zinc-400 uppercase">ATS Score</p>
      </div>
    </div>
  )
}

export function DashboardSection() {
  return (
    <section id="dashboard" className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Dashboard Preview"
          title="Analytics-grade resume intelligence"
          description="A polished command center for ATS score tracking, keyword opportunities, and rewrite actions."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass-card overflow-hidden rounded-3xl border border-white/12 p-4 sm:p-6"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-sm text-zinc-400">
                Resume Studio · {dashboardState.filename}
              </span>
            </div>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-200">
              Target Role: {dashboardState.role}
            </span>
          </div>

          <div className="grid gap-4 xl:grid-cols-12">
            <GlassCard
              hover={false}
              className="rounded-2xl border border-white/10 p-5 xl:col-span-4"
            >
              <div className="flex flex-col items-center">
                <ScoreCircle score={dashboardState.score} />
                <p className="mt-2 text-sm text-zinc-400">Great baseline, high upside</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {dashboard.miniMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-3 text-center"
                  >
                    <metric.icon className="mx-auto h-4 w-4 text-cyan-200" />
                    <p className="mt-1 text-xs text-zinc-400">{metric.label}</p>
                    <p className="text-sm font-semibold text-zinc-100">{metric.value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid gap-4 xl:col-span-8 xl:grid-cols-2">
              <GlassCard hover={false} className="rounded-2xl border border-white/10 p-5">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
                  <AlertCircle className="h-4 w-4 text-amber-300" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dashboard.missingKeywords.map((keyword) => (
                    <motion.span
                      key={keyword}
                      whileHover={{ y: -2 }}
                      className="rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs text-amber-200"
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard hover={false} className="rounded-2xl border border-white/10 p-5">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
                  <Lightbulb className="h-4 w-4 text-cyan-200" />
                  Suggestions
                </h4>
                <ul className="space-y-2.5">
                  {dashboard.suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-300"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard
                hover={false}
                className="rounded-2xl border border-white/10 p-5 xl:col-span-2"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-zinc-200">Skills Match</h4>
                  <span className="flex items-center gap-1 text-xs text-emerald-300">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Trending up
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    {dashboard.skills.map((skill, idx) => (
                      <div key={skill.name}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-zinc-400">{skill.name}</span>
                          <span className="font-medium text-cyan-200">{skill.match}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.match}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, delay: idx * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 shadow-[0_0_14px_rgba(34,211,238,0.5)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <h5 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      Resume strengths
                    </h5>
                    <ul className="space-y-2">
                      {dashboard.strengths.map((strength) => (
                        <li key={strength} className="text-xs leading-relaxed text-zinc-400">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

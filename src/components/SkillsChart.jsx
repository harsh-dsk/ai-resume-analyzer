import { motion } from 'framer-motion'
import { GlassCard } from './ui/GlassCard'

export function SkillsChart({ skillsMatch = [] }) {
  return (
    <GlassCard hover={false} className="rounded-2xl border border-white/12 p-5">
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-zinc-200 uppercase">
        Skills Match
      </h3>
      <div className="space-y-3">
        {skillsMatch.map((skill, index) => {
          const rawValue = Number.isFinite(skill.score) ? skill.score : skill.match
          const value = Math.max(0, Math.min(100, Number(rawValue) || 0))

          return (
            <div key={skill.name}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-zinc-400">{skill.name}</span>
                <span className="font-medium text-cyan-200">{value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.9, delay: index * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                />
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}

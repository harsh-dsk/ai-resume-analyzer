import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { GlassCard } from './ui/GlassCard'

export function DashboardCards({ analyticsCards = [] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {analyticsCards.map((card, index) => {
        const Icon = card.icon || BarChart3
        return (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <GlassCard hover={false} className="rounded-xl border border-white/12 p-4">
            <Icon className="h-4 w-4 text-cyan-200" />
            <p className="mt-2 text-xs tracking-wide text-zinc-400 uppercase">{card.title}</p>
            <p className="text-lg font-semibold text-white">{card.value}</p>
          </GlassCard>
        </motion.div>
        )
      })}
    </div>
  )
}

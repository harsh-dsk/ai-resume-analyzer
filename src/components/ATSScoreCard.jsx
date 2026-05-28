import { motion } from 'framer-motion'
import { GlassCard } from './ui/GlassCard'

function ScoreCircle({ score }) {
  const radius = 56
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg className="-rotate-90" width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="11"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-black text-white">{score}</p>
        <p className="text-xs tracking-wide text-zinc-400 uppercase">ATS Score</p>
      </div>
    </div>
  )
}

export function ATSScoreCard({ score, overview }) {
  return (
    <GlassCard hover={false} className="rounded-2xl border border-white/12 p-5">
      <div className="flex flex-col items-center">
        <ScoreCircle score={score} />
        <p className="mt-3 text-center text-sm text-zinc-300">{overview}</p>
      </div>
    </GlassCard>
  )
}

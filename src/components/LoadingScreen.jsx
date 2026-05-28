import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function LoadingScreen({ progress, message }) {
  const clamped = useMemo(() => Math.min(100, Math.max(0, progress)), [progress])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#04050b]/95 px-4 backdrop-blur-xl"
    >
      <div className="w-full max-w-xl rounded-3xl border border-white/12 bg-white/5 p-7 text-center shadow-[0_0_100px_rgba(6,182,212,0.15)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="mx-auto mb-6 h-14 w-14 rounded-full border-2 border-cyan-300/20 border-t-cyan-200"
        />
        <h3 className="text-2xl font-semibold text-white">AI Analysis in Progress</h3>
        <p className="mt-2 text-zinc-400">{message}</p>
        <p className="mt-1 text-xs tracking-wide text-cyan-200/80 uppercase">
          Gemini AI is evaluating your resume
        </p>
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs text-zinc-400">
            <span>Processing</span>
            <span>{clamped}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-emerald-300"
              animate={{ width: `${clamped}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

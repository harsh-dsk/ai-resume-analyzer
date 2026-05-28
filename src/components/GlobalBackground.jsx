import { motion } from 'framer-motion'

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.16),transparent_38%),radial-gradient(circle_at_80%_16%,rgba(16,185,129,0.13),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(8,145,178,0.10),transparent_45%)]" />
      <div className="absolute inset-0 grid-overlay opacity-70" />
      <div className="absolute inset-0 noise-overlay" />

      <motion.div
        animate={{ y: [0, -20, 8, 0], x: [0, 14, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 -left-16 h-80 w-80 rounded-full bg-cyan-400/14 blur-[110px]"
      />
      <motion.div
        animate={{ y: [0, 18, -12, 0], x: [0, -8, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-emerald-400/12 blur-[130px]"
      />
      <motion.div
        animate={{ y: [0, 12, -8, 0], x: [0, 6, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-[22%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]"
      />
    </div>
  )
}

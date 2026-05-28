import { motion } from 'framer-motion'

export function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  )
}

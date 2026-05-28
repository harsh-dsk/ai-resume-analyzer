import { motion } from 'framer-motion'

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_10px_30px_-10px_rgba(6,182,212,0.65)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_18px_45px_-12px_rgba(16,185,129,0.7)]',
  secondary:
    'glass-card border border-white/15 text-zinc-100 hover:border-cyan-300/40 hover:bg-white/8',
  ghost: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100',
}

export function GlowButton({
  children,
  icon: Icon,
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {Icon && (
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
      {children}
    </motion.button>
  )
}

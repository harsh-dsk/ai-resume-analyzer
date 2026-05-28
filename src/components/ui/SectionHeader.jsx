import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../utils/motion'

export function SectionHeader({ label, title, description }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
      variants={stagger}
      className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
    >
      {label && (
        <motion.span
          variants={fadeUp}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/5 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

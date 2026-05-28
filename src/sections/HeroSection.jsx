import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { heroButtons, heroStats } from '../data/siteData'
import { GlowButton } from '../components/ui/GlowButton'
import { fadeUp, stagger } from '../components/utils/motion'

export function HeroSection({ onUploadClick, onDemoClick }) {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-14 sm:px-6 sm:pt-36 sm:pb-18 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-200 backdrop-blur-xl sm:text-sm"
          >
            <Zap className="h-4 w-4" />
            Powered by advanced AI
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.08]"
          >
            Build a resume that passes ATS and wins interviews
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl"
          >
            Instant AI analysis, keyword intelligence, and practical rewrite
            suggestions in a premium dashboard built for serious job seekers.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            {heroButtons.map((button) => (
              <GlowButton
                key={button.label}
                icon={button.icon}
                variant={button.variant}
                className="w-full px-7 py-3 sm:w-auto"
                onClick={
                  button.label.toLowerCase().includes('demo')
                    ? onDemoClick || onUploadClick
                    : onUploadClick
                }
              >
                {button.label}
              </GlowButton>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl px-4 py-4 text-left sm:text-center"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs tracking-wide text-zinc-400 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

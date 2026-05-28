import { motion } from 'framer-motion'
import { workflowSteps } from '../data/siteData'
import { GlassCard } from '../components/ui/GlassCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { fadeUp, stagger } from '../components/utils/motion'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Workflow"
          title="From upload to optimized results"
          description="A connected three-step flow designed to move from raw resume to ATS-ready quickly."
        />

        <div className="relative">
          <div className="absolute top-24 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent lg:block" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid gap-5 lg:grid-cols-3"
          >
            {workflowSteps.map((step, index) => (
              <motion.div key={step.id} variants={fadeUp} custom={index} className="relative">
                <GlassCard className="relative rounded-2xl border border-white/10 p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300/30 to-emerald-300/20 shadow-[0_0_22px_rgba(6,182,212,0.45)]">
                      <step.icon className="h-5 w-5 text-cyan-200" />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.24em] text-cyan-300/90">
                      STEP {step.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </GlassCard>
                {index < workflowSteps.length - 1 && (
                  <div className="absolute top-1/2 -right-2 z-10 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)] lg:block" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

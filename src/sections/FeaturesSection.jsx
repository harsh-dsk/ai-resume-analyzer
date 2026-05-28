import { motion } from 'framer-motion'
import { features } from '../data/siteData'
import { GlassCard } from '../components/ui/GlassCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { fadeUp, stagger } from '../components/utils/motion'

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Features"
          title="Premium AI tooling for resume growth"
          description="Built like a modern SaaS product: fast insights, clear actions, and polished analytics."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {features.map((feature, i) => (
            <motion.div key={feature.title} variants={fadeUp} custom={i} className="group">
              <div
                className={`absolute hidden rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 blur-xl transition duration-500 group-hover:opacity-100 xl:block`}
              />
              <GlassCard className="relative h-full rounded-2xl border border-white/10 p-6 transition-transform duration-300 group-hover:-rotate-[0.7deg]">
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`rounded-xl border border-white/10 bg-gradient-to-br ${feature.gradient} p-3`}
                  >
                    <feature.icon className="h-5 w-5 text-cyan-200" />
                  </div>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

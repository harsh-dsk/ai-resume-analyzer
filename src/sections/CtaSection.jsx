import { motion } from 'framer-motion'
import { ctaButtons } from '../data/siteData'
import { GlowButton } from '../components/ui/GlowButton'

export function CtaSection({ onUploadClick, onDemoClick }) {
  return (
    <section id="pricing" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-[1px]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/40 via-emerald-300/30 to-cyan-300/40 blur-xl" />
        <div className="glass-card relative rounded-3xl border border-white/12 px-6 py-12 text-center sm:px-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Start Improving Your Resume Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
              Join thousands of job seekers using AI to optimize resumes and land
              more interviews.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {ctaButtons.map((button) => (
              <GlowButton
                key={button.label}
                icon={button.icon}
                variant={button.variant}
                className="w-full px-7 py-3 sm:w-auto"
                onClick={button.label === 'Try Demo' ? onDemoClick : onUploadClick}
              >
                {button.label}
              </GlowButton>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

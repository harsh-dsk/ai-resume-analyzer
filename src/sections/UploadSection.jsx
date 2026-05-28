import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Upload } from 'lucide-react'
import { uploadMockProgress } from '../data/siteData'
import { GlassCard } from '../components/ui/GlassCard'
import { GlowButton } from '../components/ui/GlowButton'

export function UploadSection() {
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile] = useState('frontend-engineer-resume.pdf')

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="group relative rounded-3xl p-[1px]"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-emerald-400/20 to-cyan-400/30 opacity-75 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          <GlassCard
            className={`relative rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 ${dragOver ? 'ring-2 ring-cyan-300/50' : 'ring-1 ring-white/10'}`}
            hover={false}
          >
            <div
              className={`rounded-2xl border border-dashed p-8 text-center transition-all duration-300 sm:p-10 ${dragOver ? 'border-cyan-300/65 bg-cyan-500/10' : 'border-white/20 bg-white/3'}`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-emerald-400/25 shadow-[0_0_30px_rgba(6,182,212,0.35)]"
              >
                <Upload className="h-8 w-8 text-cyan-200" />
              </motion.div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                Upload your resume
              </h3>
              <p className="mt-2 text-zinc-400">
                Drop your file here or browse to start ATS optimization.
              </p>
              <GlowButton icon={FileText} variant="primary" className="mt-6 px-7 py-3">
                Choose PDF or DOCX
              </GlowButton>
              <p className="mt-4 text-xs text-zinc-500">
                Max file size 5MB · Parsing takes less than 20 seconds
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/8 p-4">
                <p className="text-xs tracking-wide text-emerald-300 uppercase">
                  Selected file
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-zinc-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {selectedFile}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="mb-2 text-xs tracking-wide text-zinc-400 uppercase">
                  Upload progress
                </p>
                <div className="space-y-2.5">
                  {uploadMockProgress.map((item, idx) => (
                    <div key={item.step}>
                      <div className="mb-1 flex justify-between text-xs text-zinc-400">
                        <span>{item.step}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.12 }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}

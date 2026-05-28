import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Upload,
  Play,
  FileText,
  Target,
  Search,
  Lightbulb,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  GitBranch,
  AtSign,
  Users,
  Menu,
  X,
  Zap,
  ArrowRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`glass rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

function GlowButton({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  ...props
}) {
  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-emerald-500 text-zinc-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110',
    secondary:
      'glass text-zinc-100 hover:border-cyan-500/40 hover:bg-white/[0.06]',
    ghost: 'text-zinc-400 hover:text-white hover:bg-white/5',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </motion.button>
  )
}

function SectionHeader({ label, title, description }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      {label && (
        <motion.span
          variants={fadeUp}
          className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-cyan-400"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-base text-zinc-400 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
  ]

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050508]/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500">
            <Sparkles className="h-5 w-5 text-zinc-950" />
          </span>
          <span className="text-sm font-semibold text-white sm:text-base">
            AI Resume Analyzer
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <GlowButton variant="ghost">Login</GlowButton>
          <GlowButton variant="primary" icon={ArrowRight}>
            Get Started
          </GlowButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-white/[0.06] px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-zinc-300"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <GlowButton variant="ghost" className="w-full">
              Login
            </GlowButton>
            <GlowButton variant="primary" className="w-full">
              Get Started
            </GlowButton>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/15 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-600/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400"
          >
            <Zap className="h-4 w-4" />
            Powered by advanced AI
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            Analyze Your Resume with{' '}
            <span className="text-gradient">AI</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
          >
            Get ATS insights, keyword optimization, and AI-powered resume
            feedback instantly.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GlowButton variant="primary" icon={Upload} className="px-8 py-3">
              Upload Resume
            </GlowButton>
            <GlowButton
              variant="secondary"
              icon={Play}
              className="px-8 py-3"
            >
              View Demo
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ResumeUploadCard() {
  const [dragOver, setDragOver] = useState(false)

  return (
    <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl p-[2px] animate-border-glow"
        >
          <div
            className={`glass rounded-2xl p-8 sm:p-12 transition-all duration-300 ${
              dragOver ? 'bg-cyan-500/5 border-cyan-500/30' : ''
            }`}
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
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{ y: dragOver ? -4 : 0 }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 ring-1 ring-cyan-500/30"
              >
                <Upload className="h-8 w-8 text-cyan-400" />
              </motion.div>

              <h3 className="text-xl font-semibold text-white">
                Drop your resume here
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                or click to browse from your device
              </p>

              <GlowButton
                variant="primary"
                icon={FileText}
                className="mt-8"
              >
                Upload PDF
              </GlowButton>

              <p className="mt-6 text-xs text-zinc-600">
                Supported formats: PDF, DOCX · Max file size 5MB
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Target,
    title: 'ATS Score Analysis',
    description:
      'See how applicant tracking systems rate your resume and what to fix for better pass rates.',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  {
    icon: Search,
    title: 'Keyword Optimization',
    description:
      'Match job descriptions with smart keyword suggestions tailored to your target role.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    glow: 'group-hover:shadow-emerald-500/20',
  },
  {
    icon: Lightbulb,
    title: 'AI Suggestions',
    description:
      'Get actionable rewrites for bullet points, summaries, and skills sections.',
    gradient: 'from-cyan-500/20 to-emerald-500/5',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  {
    icon: BarChart3,
    title: 'Resume Strength Report',
    description:
      'Full breakdown of strengths, gaps, and formatting issues in one dashboard.',
    gradient: 'from-emerald-500/20 to-cyan-500/5',
    glow: 'group-hover:shadow-emerald-500/20',
  },
]

function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Features"
          title="Everything you need to land interviews"
          description="Professional-grade resume analysis tools built for modern job seekers."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={i}
              className="group relative"
            >
              <div
                className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100`}
              />
              <GlassCard className="relative h-full p-6 shadow-lg transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-cyan-500/10">
                <div
                  className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3 ring-1 ring-white/10`}
                >
                  <feature.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
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

function ScoreCircle({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="-rotate-90" width="140" height="140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="block text-xs text-zinc-500">ATS Score</span>
      </div>
    </div>
  )
}

function AnalysisPreview() {
  const missingKeywords = ['Kubernetes', 'CI/CD', 'GraphQL', 'Terraform']
  const strengths = [
    'Strong technical skills section',
    'Quantified achievements in experience',
    'Clean, ATS-friendly formatting',
  ]
  const suggestions = [
    'Add 2–3 more role-specific keywords',
    'Expand leadership experience bullets',
    'Include a professional summary',
  ]
  const skills = [
    { name: 'JavaScript', match: 92 },
    { name: 'React', match: 88 },
    { name: 'Node.js', match: 75 },
    { name: 'AWS', match: 62 },
  ]

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Preview"
          title="See your analysis at a glance"
          description="A sample dashboard showing the insights you'll receive after uploading."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass glow-blue overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-2 border-b border-white/[0.06] pb-4">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-4 text-sm text-zinc-500">
              Resume Analysis · software-engineer.pdf
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="flex flex-col items-center justify-center lg:col-span-3">
              <ScoreCircle score={78} />
              <p className="mt-4 text-center text-sm text-zinc-500">
                Good match — room to improve
              </p>
            </div>

            <div className="space-y-6 lg:col-span-4">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Resume Strengths
                </h4>
                <ul className="space-y-2">
                  {strengths.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-zinc-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Lightbulb className="h-4 w-4 text-cyan-400" />
                  Improvement Suggestions
                </h4>
                <ul className="space-y-2">
                  {suggestions.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold text-zinc-300">
                  Skills Match
                </h4>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="text-zinc-400">{skill.name}</span>
                        <span className="font-medium text-cyan-400">
                          {skill.match}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.match}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const steps = [
  {
    step: '01',
    title: 'Upload Resume',
    description:
      'Drag and drop your PDF or DOCX. We parse it securely in seconds.',
    icon: Upload,
  },
  {
    step: '02',
    title: 'AI Analyzes',
    description:
      'Our models scan for ATS compatibility, keywords, and content quality.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Get Smart Suggestions',
    description:
      'Receive a prioritized action plan to strengthen your resume.',
    icon: Lightbulb,
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Process"
          title="How it works"
          description="Three simple steps from upload to actionable insights."
        />

        <div className="relative">
          <div className="absolute top-24 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent lg:block" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-3"
          >
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                custom={i}
                className="relative"
              >
                <GlassCard className="relative z-10 h-full p-8 text-center lg:text-left">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 lg:mx-0">
                    <item.icon className="h-7 w-7 text-zinc-950" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-cyan-500">
                    STEP {item.step}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                    {item.description}
                  </p>
                </GlassCard>
                {i < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-500/30 bg-[#050508] lg:flex">
                    <ArrowRight className="h-4 w-4 text-cyan-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PricingCTA() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 via-emerald-600/20 to-cyan-600/30" />
        <div className="glass relative px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start Improving Your Resume Today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Join thousands of job seekers who optimized their resumes with AI
            and landed more interviews.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GlowButton variant="primary" icon={Upload} className="px-8 py-3">
              Upload Resume
            </GlowButton>
            <GlowButton variant="secondary" icon={Play} className="px-8 py-3">
              Try Demo
            </GlowButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  const social = [
    { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
    { icon: AtSign, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Users, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="border-t border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500">
            <Sparkles className="h-4 w-4 text-zinc-950" />
          </span>
          <span className="text-sm font-semibold text-white">
            AI Resume Analyzer
          </span>
        </div>

        <div className="flex items-center gap-4">
          {social.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-lg glass text-zinc-400 transition-all hover:border-cyan-500/30 hover:text-cyan-400"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg glass px-4 py-2 text-sm text-zinc-400 transition-all hover:border-cyan-500/30 hover:text-white"
          >
            <GitBranch className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
      </p>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ResumeUploadCard />
        <Features />
        <AnalysisPreview />
        <HowItWorks />
        <PricingCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App

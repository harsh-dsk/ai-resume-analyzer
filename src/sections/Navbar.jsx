import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Menu, Sparkles, X } from 'lucide-react'
import { navLinks } from '../data/siteData'
import { GlowButton } from '../components/ui/GlowButton'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06070d]/70 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300 to-emerald-300 text-zinc-950 shadow-[0_0_32px_rgba(34,211,238,0.35)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-100 sm:text-base">
            AI Resume Analyzer
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
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
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mx-4 mb-4 rounded-2xl border border-white/10 bg-black/45 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm text-zinc-300"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2">
            <GlowButton variant="ghost" className="w-full justify-center">
              Login
            </GlowButton>
            <GlowButton variant="primary" className="w-full justify-center">
              Get Started
            </GlowButton>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

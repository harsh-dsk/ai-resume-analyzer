import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Sparkles, X, GitBranch } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/siteData'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const githubRepo = 'https://github.com/yourusername/ai-resume-analyzer'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06070d]/70 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300 to-emerald-300 text-zinc-950 shadow-[0_0_32px_rgba(34,211,238,0.35)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-100 sm:text-base">
            AI Resume Analyzer
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-cyan-300 ${isActive ? 'text-zinc-100' : 'text-zinc-400'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 transition-all duration-200 hover:border-cyan-300/50 hover:bg-cyan-300/10 text-zinc-400 hover:text-cyan-300"
            aria-label="GitHub repository"
          >
            <GitBranch className="h-5 w-5" />
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/10 md:hidden"
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
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block text-sm font-medium transition-colors ${isActive ? 'text-cyan-300' : 'text-zinc-400 hover:text-zinc-100'}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-white/5 pt-4">
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-cyan-300"
              onClick={() => setOpen(false)}
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

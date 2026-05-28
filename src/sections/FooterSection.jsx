import { Sparkles } from 'lucide-react'
import { footerColumns, socialLinks } from '../data/siteData'

export function FooterSection() {
  return (
    <footer className="px-4 pt-6 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl border-t border-transparent bg-[linear-gradient(to_right,rgba(34,211,238,0.26),rgba(255,255,255,0.06),rgba(16,185,129,0.22))] bg-[length:100%_1px] bg-no-repeat pt-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300 to-emerald-300 text-zinc-950">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-semibold tracking-wide text-zinc-100">
                AI Resume Analyzer
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              A premium AI resume companion designed to help ambitious candidates
              pass ATS filters and win more interviews.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-cyan-300/40 hover:text-cyan-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-zinc-200">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-400 hover:text-zinc-100">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-5 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

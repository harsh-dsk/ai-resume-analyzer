import { Sparkles } from 'lucide-react'

export function FooterSection() {
  return (
    <footer className="px-4 pt-6 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl border-t border-transparent bg-[linear-gradient(to_right,rgba(34,211,238,0.26),rgba(255,255,255,0.06),rgba(16,185,129,0.22))] bg-[length:100%_1px] bg-no-repeat pt-8">
        <div className="max-w-2xl">
          <a href="#" className="inline-flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300 to-emerald-300 text-zinc-950">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-wide text-zinc-100">
              AI Resume Analyzer
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            A premium AI resume companion designed to help ambitious candidates
            pass ATS filters and win more interviews.
          </p>
        </div>

        <div className="mt-9 border-t border-white/10 pt-5 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

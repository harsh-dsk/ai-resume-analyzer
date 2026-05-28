import { AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { GlassCard } from './ui/GlassCard'

export function SuggestionsPanel({ keywordsMissing = [], strengths = [], suggestions = [] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <GlassCard hover={false} className="rounded-2xl border border-white/12 p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
          <AlertCircle className="h-4 w-4 text-amber-300" />
          Missing Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {keywordsMissing.map((keyword) => (
            <span
              key={keyword}
              className="rounded-lg border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-xs text-amber-200"
            >
              {keyword}
            </span>
          ))}
        </div>
      </GlassCard>

      <GlassCard hover={false} className="rounded-2xl border border-white/12 p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
          <Lightbulb className="h-4 w-4 text-cyan-200" />
          AI Suggestions
        </h3>
        <ul className="space-y-2">
          {suggestions.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-300">
              {item}
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard hover={false} className="rounded-2xl border border-white/12 p-5 md:col-span-2">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          Resume Strengths
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {strengths.map((item) => (
            <li key={item} className="text-sm text-zinc-400">
              {item}
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  )
}

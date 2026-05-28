import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, FileText, Upload } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'
import { GlassCard } from './ui/GlassCard'

const allowedExtensions = ['pdf', 'docx']

function isValidFile(file) {
  if (!file) return false
  const extension = file.name.split('.').pop()?.toLowerCase()
  return Boolean(extension && allowedExtensions.includes(extension))
}

export function UploadBox({ selectedFile, onFileSelect, onAnalyze, isAnalyzing }) {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    if (!isValidFile(file)) {
      setError('Unsupported file type. Upload a PDF or DOCX file.')
      return
    }
    setError('')
    onFileSelect(file)
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative mx-auto max-w-4xl rounded-3xl p-[1px]"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/35 via-emerald-400/20 to-cyan-400/35 blur-md" />
      <GlassCard
        hover={false}
        className={`relative rounded-3xl p-6 sm:p-8 ${dragOver ? 'ring-2 ring-cyan-300/60' : 'ring-1 ring-white/10'}`}
      >
        <div
          className={`rounded-2xl border border-dashed p-8 text-center transition-all duration-300 sm:p-12 ${dragOver ? 'border-cyan-300/60 bg-cyan-400/10' : 'border-white/20 bg-white/3'}`}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            const droppedFile = e.dataTransfer.files?.[0]
            if (droppedFile) {
              handleFile(droppedFile)
            }
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/35 to-emerald-300/25 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
          >
            <Upload className="h-8 w-8 text-cyan-100" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Upload your resume</h2>
          <p className="mt-2 text-zinc-400">Drag and drop PDF or DOCX to begin analysis.</p>
          
          {/* Hidden file input with proper accept types */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleInputChange}
            aria-label="Upload resume file"
            disabled={isAnalyzing}
          />
          
          {/* Button to trigger file picker */}
          <GlowButton
            variant="secondary"
            icon={FileText}
            className="mt-6 px-7 py-3"
            onClick={handleButtonClick}
            disabled={isAnalyzing}
            type="button"
          >
            Choose PDF or DOCX
          </GlowButton>
        </div>

        {selectedFile && (
          <div className="mt-5 rounded-xl border border-emerald-300/25 bg-emerald-400/8 p-4">
            <p className="text-xs tracking-wider text-emerald-200 uppercase">Selected file</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-zinc-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              {selectedFile.name}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-300/30 bg-rose-300/10 p-3 text-sm text-rose-200">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <GlowButton
            variant="primary"
            className="w-full max-w-xs px-7 py-3"
            onClick={onAnalyze}
            disabled={!selectedFile || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </GlowButton>
        </div>
      </GlassCard>
    </motion.div>
  )
}

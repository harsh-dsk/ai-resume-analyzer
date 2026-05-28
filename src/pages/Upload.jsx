import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LoadingScreen } from '../components/LoadingScreen'
import { UploadBox } from '../components/UploadBox'
import { analysisMessages } from '../data/mockAnalysis'
import { analyzeResume } from '../services/api'

export function Upload({
  selectedFile,
  setSelectedFile,
  isAnalyzing,
  setIsAnalyzing,
  setAnalysisReady,
  setAnalysisData,
}) {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [apiError, setApiError] = useState('')

  const currentMessage = useMemo(
    () => analysisMessages[messageIndex % analysisMessages.length],
    [messageIndex],
  )

  useEffect(() => {
    if (!isAnalyzing) return

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return prev
        return prev + Math.floor(Math.random() * 4 + 2)
      })
    }, 420)

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => prev + 1)
    }, 900)

    return () => {
      clearInterval(progressTimer)
      clearInterval(messageTimer)
    }
  }, [isAnalyzing, navigate, setAnalysisReady, setIsAnalyzing])

  const handleAnalyze = async () => {
    if (!selectedFile) return
    setApiError('')
    setAnalysisReady(false)
    setProgress(5)
    setMessageIndex(0)
    setIsAnalyzing(true)

    const timeoutId = setTimeout(() => {
      setIsAnalyzing(false)
      setApiError(
        'Analysis is taking too long. Please try again in a moment.',
      )
    }, 65000)

    try {
      const data = await analyzeResume(selectedFile)
      if (!data?.analysis) {
        throw new Error('Empty analysis response received from server.')
      }

      setProgress(100)
      setAnalysisData({
        ...data.analysis,
        fileName: data.fileName || selectedFile.name,
      })
      setAnalysisReady(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        navigate('/dashboard')
      }, 350)
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        'Failed to analyze resume. Please try again.'
      setApiError(message)
      setAnalysisReady(false)
      setIsAnalyzing(false)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="px-4 pt-30 pb-14 sm:px-6 sm:pt-36 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Upload Resume for AI Analysis
          </h1>
          <p className="mt-3 text-zinc-400">
            Drop your file, validate format, and run a full ATS-ready intelligence pass.
          </p>
        </div>
        <UploadBox
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
        {apiError && (
          <div className="mx-auto mt-4 max-w-4xl rounded-xl border border-rose-300/30 bg-rose-300/10 p-4 text-sm text-rose-200">
            {apiError}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAnalyzing && <LoadingScreen progress={progress} message={currentMessage} />}
      </AnimatePresence>
    </motion.section>
  )
}

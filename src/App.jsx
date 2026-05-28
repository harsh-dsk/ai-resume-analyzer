import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { GlobalBackground } from './components/GlobalBackground'
import { mockAnalysis } from './data/mockAnalysis'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Upload } from './pages/Upload'
import { FooterSection } from './sections/FooterSection'
import { Navbar } from './sections/Navbar'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisReady, setAnalysisReady] = useState(false)
  const [analysisData, setAnalysisData] = useState(mockAnalysis)
  const location = useLocation()

  return (
    <div className="min-h-screen overflow-x-hidden text-zinc-100">
      <GlobalBackground />
      <Navbar />
      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route
              path="/upload"
              element={
                <Upload
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  isAnalyzing={isAnalyzing}
                  setIsAnalyzing={setIsAnalyzing}
                  setAnalysisReady={setAnalysisReady}
                  setAnalysisData={setAnalysisData}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  analysisData={analysisData}
                  analysisReady={analysisReady}
                />
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      <FooterSection />
    </div>
  )
}

export default App

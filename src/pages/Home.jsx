import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CtaSection } from '../sections/CtaSection'
import { FeaturesSection } from '../sections/FeaturesSection'
import { HeroSection } from '../sections/HeroSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { UploadSection } from '../sections/UploadSection'

export function Home() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <HeroSection
        onUploadClick={() => navigate('/upload')}
        onDemoClick={() => navigate('/dashboard')}
      />
      <UploadSection onUploadClick={() => navigate('/upload')} />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection onUploadClick={() => navigate('/upload')} onDemoClick={() => navigate('/dashboard')} />
    </motion.div>
  )
}

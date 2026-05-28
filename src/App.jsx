import { GlobalBackground } from './components/GlobalBackground'
import { CtaSection } from './sections/CtaSection'
import { DashboardSection } from './sections/DashboardSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'
import { HowItWorksSection } from './sections/HowItWorksSection'
import { Navbar } from './sections/Navbar'
import { UploadSection } from './sections/UploadSection'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden text-zinc-100">
      <GlobalBackground />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <UploadSection />
        <FeaturesSection />
        <DashboardSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default App

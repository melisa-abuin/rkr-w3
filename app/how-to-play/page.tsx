import PageHeader from '@/components/pageHeader'
import VideoCarousel from '@/components/videoCarousel'

import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function HowToPlay() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <PageHeader
          description="Race to the finish, dodge the relentless wolves, and rescue your fellow
        kitties from their clutches along the way!"
          title="How to play"
        />
        <VideoCarousel />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

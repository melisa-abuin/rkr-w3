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
        <PageHeader />
        <VideoCarousel />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

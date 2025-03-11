import Banner from '@/components/banner'
import InfoColumns from '@/components/infoColumns'
import { discordData } from '@/constants'
import { DiscordData as DiscordType } from '@/interfaces/discord'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/molecules/navbar'
import Footer from '@/components/molecules/footer'
import { PageContainer } from '@/components/atoms/pageContainer'

async function getDiscordData(): Promise<DiscordType> {
  try {
    const response = await fetch(discordData)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return {
      data: {
        approximateMemberCount: data?.approximate_member_count,
        approximatePresenceCount: data?.approximate_presence_count,
      },
      error: null,
      loading: false,
    }
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message,
      loading: false,
    }
  }
}

export default async function Home() {
  const data = await getDiscordData()

  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Banner discordData={data} />
        <PageContainer
          align="center"
          ariaLabelledby="info-columns"
          marginTop={24}
          title="Discover the map"
        >
          <InfoColumns />
        </PageContainer>
      </main>
      <Footer />
    </ThemeProvider>
  )
}

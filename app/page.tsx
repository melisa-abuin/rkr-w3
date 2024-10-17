import Banner from '@/components/banner'
import Columns from '@/components/columns'
import { discordData } from '@/constants'
import { DiscordData as DiscordType } from '@/interfaces/discord'

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
    <main>
      <Banner discordData={data} />
      <Columns />
    </main>
  )
}

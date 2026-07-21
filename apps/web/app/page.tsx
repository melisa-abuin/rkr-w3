import Home from '@rkr/dls/components/templates/home'
import { discordData } from '@rkr/dls/constants'
import { DiscordData as DiscordType } from '@rkr/dls/interfaces/discord'

async function getDiscordData(): Promise<DiscordType> {
  try {
    const response = await fetch(discordData, {
      next: { revalidate: 480 },
    })
    if (response.status !== 200) {
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

export default async function HomePage() {
  const data = await getDiscordData()

  return (
    <main>
      <Home discordData={data} />
    </main>
  )
}

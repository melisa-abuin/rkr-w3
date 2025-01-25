import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/hooks/useTheme'
import { PlayerStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/error'
import PageHeader from '@/components/pageHeader'
import { PageContainer } from '@/components/pageContainer'
import Awards from '@/components/awards'
import { formatKeyToWord } from '@/utils/formatCamelOrPascalCase'

interface PlayerStatsData {
  error: string | null
  data: PlayerStats | null
}

async function fetchData(battleTag: string): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(`${url}/api/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ battleTag }),
  })
  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    data: null,
    error: 'Something went wrong',
  }
}

export default async function PlayerPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { data, error } = await fetchData(slug)
  const { awards, battleTag, skins } = data ?? {}

  return (
    <ThemeProvider>
      <Navbar />
      <main>
        {error ? (
          <Error />
        ) : (
          <>
            <PageContainer>
              <PageHeader
                align="flex-start"
                description={formatKeyToWord(skins?.selectedSkin)}
                title={battleTag!.name}
              />
              <Awards awards={awards!} />
            </PageContainer>
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}

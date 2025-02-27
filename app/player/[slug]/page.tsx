import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/hooks/useTheme'
import { DetailedPlayerStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/error'
import PageHeader from '@/components/pageHeader'
import { PageContainer } from '@/components/pageContainer'
import Awards from '@/components/awards'
import { formatKeyToWord } from '@/utils/formatKeyToWord'
import Columns from '@/components/columns'

interface PlayerStatsData {
  error: string | null
  data: DetailedPlayerStats | null
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

  const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const
  const difficultyNames = ['normal', 'hard', 'impossible'] as const

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
            </PageContainer>
            <PageContainer title="Overall Stats">
              <Columns
                columns={[
                  {
                    title: 'Saves',
                    value: data?.saves,
                  },
                  {
                    title: 'Deaths',
                    value: data?.deaths,
                  },
                  {
                    title: 'S/D Ratio',
                    value: data?.saveDeathRatio,
                  },
                  {
                    title: 'Highest Save Streak',
                    value: data?.saveStreak?.highestSaveStreak,
                  },
                  {
                    title: 'Highest Win Streak',
                    value: data?.highestWinStreak,
                  },
                ]}
              />
            </PageContainer>
            <PageContainer title="Game Awards" marginTop={24} marginBottom={24}>
              <Awards awards={awards!} />
            </PageContainer>

            {difficultyNames.map((difficulty) => (
              <PageContainer
                key={difficulty}
                title={`Best ${difficulty} Times`}
                marginBottom={24}
              >
                <Columns
                  columns={roundNames.map((round) => ({
                    title: `Round ${round}`,
                    value: data?.[`round${round}`][difficulty],
                  }))}
                />
              </PageContainer>
            ))}
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}

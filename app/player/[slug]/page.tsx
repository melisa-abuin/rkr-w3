import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/hooks/useTheme'
import { PlayerStats } from '@/interfaces/player'
import { headers } from 'next/headers'
import Error from '@/components/error'
import PageHeader from '@/components/pageHeader'
import { PageContainer } from '@/components/pageContainer'

interface PlayerStatsData {
  error: string | null
  data: PlayerStats
}

async function fetchData(battleTag: string): Promise<PlayerStatsData> {
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  const response = await fetch(`${url}/api/player`, {
    method: 'POST',
    body: {
      battleTag: battleTag,
    },
  })
  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    data: {},
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
  console.log(data)
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
                description="TBD"
                title={data.battleTag.name}
              />
              <Awards />
              <img
                alt="ewe"
                height={48}
                src="/image2.png"
                width={48}
                style={{ border: '2px solid red', borderRadius: '50%' }}
              />
              <img
                alt="ewe"
                height={48}
                src="/image3.png"
                width={48}
                style={{ border: '2px solid red', borderRadius: '50%' }}
              />
            </PageContainer>
          </>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  )
}

import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import { ThemeProvider } from '@/hooks/useTheme'
import { ToastProvider } from '@/hooks/useToast'
import { headers } from 'next/headers'
import Error from '@/components/molecules/error'
import Tournaments from '@/components/templates/tournaments'

async function fetchData() {
  const headersList = headers()
  const protocol = (await headersList).get('x-forwarded-proto') || 'http'
  const host = (await headersList).get('host')

  // workaround for feature instances
  const isStage = process.env.ENVIRONMENT === 'stage'
  const url = isStage ? 'https://rkr-w3.vercel.app' : `${protocol}://${host}`

  const response = await fetch(`${url}/api/tournaments`)
  if (response.status === 200) {
    return {
      data: await response.json(),
      error: null,
    }
  }
  return {
    data: { stats: [], times: [] },
    error: 'Something went wrong',
  }
}

export default async function TournamentsPage() {
  const { data, error } = await fetchData()

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar />
        <main>{error ? <Error /> : data && <Tournaments data={data} />}</main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  )
}

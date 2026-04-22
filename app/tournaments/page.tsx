import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import { ThemeProvider } from '@/hooks/useTheme'
import { ToastProvider } from '@/hooks/useToast'
import Error from '@/components/molecules/error'
import Tournaments from '@/components/templates/tournaments'
import { getBaseUrlFromHeaders } from '@/utils'
import '../../theme/light.css' // TODO: create hook for no styled components theming

async function fetchData() {
  const url = await getBaseUrlFromHeaders()

  const response = await fetch(`${url}/api/tournaments`)
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

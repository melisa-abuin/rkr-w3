'use client'

import Banner from '@/components/banner'
import { TestText } from './styled'

export default function Home() {
  return (
    <>
      <main>
        <Banner />
        <TestText>Hi!</TestText>
      </main>
      <footer>footer</footer>
    </>
  )
}

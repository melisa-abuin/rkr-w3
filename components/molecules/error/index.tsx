'use client'

import Link from '@/components/atoms/link'
import { Container } from './styled'

export default function Error() {
  return (
    <Container>
      <p>There was an error handling the request</p>
      <Link colorName="brandPrimary" href="/" withButtonStyle>
        Return to home
      </Link>
    </Container>
  )
}

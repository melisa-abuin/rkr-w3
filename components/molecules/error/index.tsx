'use client'

import Link from '../../atoms/link'
import { Container } from './styled'

export default function Error() {
  return (
    <Container>
      <p>There was an error handling the request</p>
      <Link href="/" withButtonStyle>
        Return to home
      </Link>
    </Container>
  )
}

'use client'

import Button from '@/components/atoms/button'
import { Container } from './styled'

export default function Error() {
  return (
    <Container>
      <p>There was an error handling the request</p>
      <Button as="a" color="primary" href="/" variant="outline">
        Return to home
      </Button>
    </Container>
  )
}

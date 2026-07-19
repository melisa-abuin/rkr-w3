'use client'

import Button from '@/components/atoms/button'
import styles from './index.module.css'

export default function Error() {
  return (
    <section className={styles.container}>
      <p>There was an error handling the request</p>
      <Button as="a" colorName="primary" href="/" variant="outline">
        Return to home
      </Button>
    </section>
  )
}

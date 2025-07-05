'use client'

import { Cross } from '@/components/icons/cross'
import { Container, Content, CrossContainer, Spacer } from './styled'
import { useEffect, useState } from 'react'

// Change this key to update the announcement
const announcementKey = 'announcement-2025-08-09'
const isActiveAnnouncement = true

export default function Announcement() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(announcementKey)
    setVisible(!dismissed)
  }, [])

  const handleClose = () => {
    localStorage.setItem(announcementKey, 'dismissed')
    setVisible(false)
  }

  if (!visible || !isActiveAnnouncement) return null

  return (
    <>
      <Spacer />
      <Container>
        <Content>
          Save the date! <strong>Summer Team Tournament </strong>on Saturday,
          August 9th, 2025
          <br />
          <small>
            <i>
              {' '}
              20:00 CEST on European servers and 8:00pm Eastern on US East
              servers
            </i>
          </small>
        </Content>
        <CrossContainer onClick={handleClose} aria-label="Close announcement">
          <Cross height={16} fill="#fff" width={16} />
        </CrossContainer>
      </Container>
    </>
  )
}

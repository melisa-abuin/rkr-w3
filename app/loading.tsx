'use client'

import Image from 'next/image'

export default function Loading() {
  if (typeof window == 'undefined') return null

  const darkThemeSelector = '(prefers-color-scheme: dark)'

  const isDarkTheme = window.matchMedia(darkThemeSelector).matches

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: isDarkTheme ? '#130F0F' : '#FFFFFF',
        color: isDarkTheme ? '#ebe4e4' : '#050505',
        display: 'flex',
        gap: '10px',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Image
        alt="brand logo"
        height={96}
        priority
        src={isDarkTheme ? '/rkr-icon-dark.png' : '/rkr-icon-white.png'}
        width={96}
      />
      Loading...
    </div>
  )
}

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
        backgroundColor: isDarkTheme ? '#130f0f' : '#FFFFFF',
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
        height={80}
        priority
        src={isDarkTheme ? '/rkr-icon-dark.png' : `/rkr-icon-white.png`}
        width={80}
      />
      Loading...
    </div>
  )
}

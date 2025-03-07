'use client'

import Image from 'next/image'

export const metadata = {
  title: '404 - Page Not Found',
}

export default function NotFound() {
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
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for does not exist.</p>
      <a href="/">Go Back Home</a>
    </div>
  )
}

import React from 'react'

interface CrossProps {
  fill?: string
  width?: number
  height?: number
}

export const Cross = ({
  fill = '#000',
  width = 100,
  height = 100,
}: CrossProps) => {
  return (
    <svg
      fill="none"
      height={height}
      role="img"
      viewBox="0 0 512 512"
      width={width}
    >
      <path
        fill={fill}
        d="M342.635,169.365c-12.493-12.501-32.754-12.507-45.255-0.014c-0.005,0.005-0.01,0.01-0.015,0.014L256,210.752   l-41.365-41.387c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.752,256l-41.387,41.365   c-12.501,12.501-12.501,32.769,0,45.269c12.501,12.501,32.769,12.501,45.269,0l0,0L256,301.248l41.365,41.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.248,256l41.387-41.365   c12.501-12.493,12.507-32.754,0.014-45.255C342.644,169.375,342.64,169.37,342.635,169.365z"
      />
      <path
        fill={fill}
        d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256C511.847,114.678,397.322,0.153,256,0z M256,448   c-106.039,0-192-85.961-192-192S149.961,64,256,64s192,85.961,192,192C447.882,361.99,361.99,447.882,256,448z"
      />
    </svg>
  )
}

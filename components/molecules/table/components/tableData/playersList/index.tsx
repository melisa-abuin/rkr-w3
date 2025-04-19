import React from 'react'

interface Props {
  data: string
}

export default function PlayersList({ data }: Props) {
  const members = data.replace(/#\d+/g, '')
  return <div>{members}</div>
}

interface PlayersListProps {
  data: string
}

export default function PlayersList({ data }: PlayersListProps) {
  const members = data.replace(/#\d+/g, '')
  return <div>{members}</div>
}

import Image from 'next/image'
import {
  BannerContainer,
  BannerContent,
  Colored,
  Container,
  DiscordDetail,
  Info,
  Title,
} from './styled'
import { useFetch } from '@/hooks/useFetch'
import { discordData, discordJoinLink } from '@/constants'

export default function Banner() {
  const { data, error, loading } = useFetch<{
    approximate_member_count: string
    approximate_presence_count: string
  }>(discordData)

  return (
    <BannerContainer>
      <Container>
        <BannerContent>
          <Title>Run Kitty Run</Title>
          <Info>
            A Warcraft 3 custom map where teamwork and agility guide your
            kitties through deadly obstacles. Can you reach the end?
            <br />
            <br />
            Join us!
          </Info>
          <a href={discordJoinLink}>
            <Image
              alt="discord invitation"
              height={53}
              src="/discord.png"
              width={198}
            />
          </a>
          {loading && <div>loading...</div>}
          {data && !error && (
            <DiscordDetail>
              <Colored>{data?.approximate_member_count}</Colored>
              {` kitties - `}
              <Colored>{data?.approximate_presence_count}</Colored> running
            </DiscordDetail>
          )}
        </BannerContent>
        <Image src="/map.png" alt="Map Image" width={400} height={400} />
      </Container>
    </BannerContainer>
  )
}

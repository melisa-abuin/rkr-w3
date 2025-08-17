'use client'

import Image from 'next/image'
import {
  BannerContainer,
  Colored,
  Container,
  DiscordDetail,
  Info,
  Subtitle,
  Title,
} from './styled'
import { discordJoinLink } from '@/constants'
import { DiscordData } from '@/interfaces/discord'
import PlayerFinderWithResult from '@/components/organisms/playerFinderWithResult'

interface Props {
  discordData: DiscordData
}

export default function Banner({ discordData }: Props) {
  const { data, error } = discordData
  return (
    <BannerContainer>
      <Container>
        <Title>Run Kitty Run</Title>
        <Info>
          <Subtitle>The famous Warcraft 3 custom map</Subtitle>
          Stats, leaderboards and more
        </Info>
        <PlayerFinderWithResult />
        <a href={discordJoinLink}>
          <Image
            alt="discord invitation"
            height={53}
            loading="eager"
            priority={true}
            src="/discord.png"
            width={198}
          />
        </a>

        {data && !error && (
          <DiscordDetail>
            {data && (
              <>
                <Colored>{data?.approximateMemberCount}</Colored>
                {` kitties - `}
                <Colored>{data?.approximatePresenceCount}</Colored> running
              </>
            )}
            {error && <>There was an issue while fetching discord data</>}
          </DiscordDetail>
        )}
      </Container>
    </BannerContainer>
  )
}

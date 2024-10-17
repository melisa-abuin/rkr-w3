'use client'

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
import { discordJoinLink } from '@/constants'
import { DiscordData } from '@/interfaces/discord'

interface Props {
  discordData: DiscordData
}

export default function Banner({ discordData }: Props) {
  const { data, error } = discordData
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
        </BannerContent>
        <Image
          alt="Map Image"
          height={250}
          loading="eager"
          priority={true}
          src="/map.png"
          width={250}
        />
      </Container>
    </BannerContainer>
  )
}

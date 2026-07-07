import { mockFeaturedApiResponse } from '@/mocks/data/featured'
import { formatFeaturedContent } from '..'

describe('formatFeaturedContent', () => {
  it('maps players to FeaturedItem list', () => {
    const result = formatFeaturedContent(mockFeaturedApiResponse)

    expect(result.players).toStrictEqual([
      {
        imageSrc: '/awards/undeadKitty.png',
        imageFallbackSrc: '/awards/fallback.png',
        label: 'Computer',
        subLabel: '02:10',
      },
      {
        imageSrc: '/awards/highelfKitty.png',
        imageFallbackSrc: '/awards/fallback.png',
        label: 'Gam3rX',
        subLabel: '01:52',
      },
      {
        imageSrc: '/awards/huntressKitty.png',
        imageFallbackSrc: '/awards/fallback.png',
        label: 'MrGheed',
        subLabel: '01:58',
      },
    ])
  })

  it('maps challenges to FeaturedItem list', () => {
    const result = formatFeaturedContent(mockFeaturedApiResponse)

    expect(result.challenges).toStrictEqual([
      {
        imageSrc: '/awards/wWDivine.png',
        imageFallbackSrc: '/awards/fallback.png',
        label: 'Divine Windwalk',
        subLabel: '8.97%',
      },
      {
        imageSrc: '/awards/ancientKitty.png',
        imageFallbackSrc: '/awards/fallback.png',
        label: 'Ancient Kitty',
        subLabel: '7.69%',
      },
      {
        imageSrc: '/awards/normalDeathless1.png',
        imageFallbackSrc: '/awards/fallback.png',
        label: 'Deathless Fire I',
        subLabel: '23.08%',
      },
    ])
  })

  it('derives player imageSrc from selectedSkin with lowercase first character', () => {
    const result = formatFeaturedContent({
      players: [{ battleTag: 'Test', selectedSkin: 'SpecialSkin', fastestTime: 60 }],
      challenges: [],
    })

    expect(result.players[0].imageSrc).toBe('/awards/specialSkin.png')
  })

  it('derives challenge imageSrc from awardKey with lowercase first character', () => {
    const result = formatFeaturedContent({
      players: [],
      challenges: [{ awardName: 'Some Award', awardKey: 'MyAwardKey', completionPercentage: 50 }],
    })

    expect(result.challenges[0].imageSrc).toBe('/awards/myAwardKey.png')
  })
})

import { mockFeaturedApiResponse } from '@/mocks/data/featured'
import { formatFeaturedChallenges } from '..'

describe('formatFeaturedChallenges', () => {
  it('maps challenges to display items', () => {
    expect(formatFeaturedChallenges(mockFeaturedApiResponse)).toStrictEqual([
      {
        imageFallbackSrc: '/awards/fallback.png',
        imageSrc: '/awards/wWDivine.png',
        subtitle: '8.97% of players',
        title: 'Divine Windwalk',
      },
      {
        imageFallbackSrc: '/awards/fallback.png',
        imageSrc: '/awards/ancientKitty.png',
        subtitle: '7.69% of players',
        title: 'Ancient Kitty',
      },
      {
        imageFallbackSrc: '/awards/fallback.png',
        imageSrc: '/awards/normalDeathless1.png',
        subtitle: '23.08% of players',
        title: 'Deathless Fire I',
      },
    ])
  })

  it('returns an empty list when there are no challenges', () => {
    expect(formatFeaturedChallenges({ challenges: [] })).toStrictEqual([])
  })
})

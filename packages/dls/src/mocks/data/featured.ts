import { FeaturedApiResponse } from '@/interfaces/featured'

export const mockFeaturedApiResponse: FeaturedApiResponse = {
  players: [
    { battleTag: 'Computer', selectedSkin: 'UndeadKitty', fastestTime: 130.8 },
    {
      battleTag: 'Gam3rX',
      selectedSkin: 'HighelfKitty',
      fastestTime: 112.56,
    },
    {
      battleTag: 'MrGheed',
      selectedSkin: 'HuntressKitty',
      fastestTime: 118.8,
    },
  ],
  challenges: [
    {
      awardName: 'Divine Windwalk',
      awardKey: 'wWDivine',
      completionPercentage: 8.97,
    },
    {
      awardName: 'Ancient Kitty',
      awardKey: 'ancientKitty',
      completionPercentage: 7.69,
    },
    {
      awardName: 'Deathless Fire I',
      awardKey: 'NormalDeathless1',
      completionPercentage: 23.08,
    },
  ],
}

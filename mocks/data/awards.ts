import { ApiAward } from '@/interfaces/award'

export const mockAwardsStats: ApiAward[] = [
  {
    key: 'ButterflyAura',
    status: 1,
    category: 'Auras',
    displayName: 'Butterfly Aura',
    description: 'Equip the Butterfly Aura.',
    percentage: 42.5,
  },
  {
    key: 'NormalDeathless1',
    status: 1,
    category: 'Deathless',
    displayName: 'Normal Deathless I',
    description: 'Complete a Normal game without dying.',
    percentage: 18.3,
  },
]

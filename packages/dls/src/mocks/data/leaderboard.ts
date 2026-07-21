import { LeaderboardCategories } from '@/interfaces/leaderboard'

export const mockLeaderboard: {
  stats: LeaderboardCategories[]
  times: LeaderboardCategories[]
} = {
  stats: [
    {
      category: 'Saves',
      key: 'saves',
      data: [{ player: { name: 'Laura', tag: '1234' }, data: 39102 }],
    },
  ],
  times: [
    {
      category: 'Normal',
      key: 'normal',
      data: [
        {
          player: { name: 'Laura', tag: '1234' },
          data: { time: 729.625, difficulty: 'normal' },
        },
      ],
    },
  ],
}

import { Difficulty } from '@/interfaces/difficulty'
import { BestGameTimeFormatted } from '@/interfaces/game'
import { FastestBestiesData, Kibbles, Player, Tops } from '@/interfaces/player'

export const apiUrl = 'https://rkrapi-801419031002.us-east1.run.app'

export const awardsStatsApi = `${apiUrl}/api/awards/stats`
export const bestGameTimesTopApi = `${apiUrl}/api/bestGameTimes/top?count=20`
export const featuredApi = `${apiUrl}/api/Players/featured`
export const playersApi = `${apiUrl}/api/players`
export const playersLeaderboardApi = `${apiUrl}/api/players/leaderboard`
export const playersSummaryApi = `${apiUrl}/api/players/summary`
export const playerStatsApi = `${apiUrl}/api/playerStats`
export const playerStatsDefaultApi = `${apiUrl}/api/playerStats/stats?filter=stats&page=1&sortKey=completedChallenges&sortOrder=desc&pageSize=5`
export const playerStatsFastestBestiesApi = `${apiUrl}/api/playerStats/fastestBesties`
export const playerStatsKibbleLeaderboardApi = `${apiUrl}/api/playerStats/kibbleLeaderboard`
export const playersTimeLeaderboardApi = `${apiUrl}/api/players/timeLeaderboard`
export const seasonsApi = `${apiUrl}/api/league/seasons`
export const seasonScoreboardApi = (seasonId: number) =>
  `${apiUrl}/api/League/seasons/${seasonId}/scoreboard`
export const tournamentsBaseApi = `${apiUrl}/api/tournaments`
export const tournamentsFullApi = `${apiUrl}/api/tournaments/full`

export const blizzardLink = 'https://www.blizzard.com/'

export const defaultScoreboardFilter = 'stats'

export const roundDifficultyNames: Difficulty[] = [
  'normal',
  'hard',
  'impossible',
  'solo',
  'nightmare',
  'progressive',
]

export const difficultyNames: Difficulty[] = [
  'normal',
  'hard',
  'impossible',
  'nightmare',
  'progressive',
]

export const discordData =
  'https://discord.com/api/v9/invites/GSu6zkNvx5?with_counts=true&with_expiration=false'

export const discordGuideSteps = [
  {
    stepTitle: '',
    text: "This tutorial is applicable to players who have played on the map version 'RKR_Remastered_1.0.3' or higher, if you have played on previous versions the location of the files may vary",
    imageSrc: '',
  },
  {
    stepTitle: 'Step 1:',
    text: "Join the discord server if you haven't already, once there go to the #uploadstats channel. You will be able to find it on the left side of the main messaging window",
    imageSrcSet: {
      dark: '/discord-example1-dark.png',
      light: '/discord-example1-light.png',
    },
  },
  {
    stepTitle: 'Step 2:',
    text: 'Click on the + symbol that appears right next to the input message to attach a file. (Additionally, at the top of the window you will see that there is a button to view pinned messages, where you can find detailed instructions on how to upload your stats)',
    imageSrcSet: {
      dark: '/discord-example2-dark.png',
      light: '/discord-example2-light.png',
    },
  },
  {
    stepTitle: 'Step 3:',

    text: "When you click on the option to upload a file, a window like this should appear on your screen (if you are using Windows as the operating system) Open your 'documents' folder and there you will see a folder called 'Warcraft III', double click on it. Inside you will see more folders, repeat the same step until you reach Documents > Warcraft III > CustomMapData > Run-Kitty-Run",
    imageSrcSet: {
      dark: '/discord-example3.png',
      light: '/discord-example3.png',
    },
  },
  {
    stepTitle: 'Step 4:',
    text: "Ensure the folder is named 'Run-Kitty-Run', not 'RunKittyRun' or any other variation. Once inside, you'll find a text file either named after your BattleTag or the AllSaveData file. Select the appropriate file and click 'Open'.",
    imageSrcSet: {
      dark: '/discord-example4.png',
      light: '/discord-example4.png',
    },
  },
  {
    stepTitle: 'Step 5:',

    text: "In the Discord chat window, you'll see your file attached to the message. Simply hit send, and the Discord bot will automatically respond, letting you know whether the action was successful.",
    imageSrcSet: {
      dark: '/discord-example5-dark.png',
      light: '/discord-example5-light.png',
    },
  },
  {
    stepTitle: '',
    text: 'That would be all, if you still have problems loading your stats, consult with a member of the community',
    imageSrc: '',
  },
]
export const discordJoinLink = 'https://discord.com/invite/GSu6zkNvx5'

export const githubReadMeLink =
  'https://github.com/melisa-abuin/rkr-w3/blob/main/README.md'

export const kibbleLeaderboardColumns = [
  {
    title: 'Single game',
    key: 'singleGame',
  },
  {
    title: 'All time',
    key: 'allTime',
  },
  {
    title: 'Jackpots',
    key: 'jackpots',
  },
  {
    title: 'Super Jackpots',
    key: 'superJackpots',
  },
] as const

export const outdatedPlayerDaysThreshold = 30
export const pageSize = 15
export const routes = {
  home: {
    label: 'Home',
    pathname: '/',
    url: '/',
    target: '_self',
    isNew: false,
  },
  leaderboard: {
    label: 'Leaderboard',
    pathname: '/leaderboard',
    url: '/leaderboard',
    target: '_self',
    isNew: false,
  },
  seasons: {
    label: 'Seasons',
    pathname: '/seasons',
    url: '/seasons',
    target: '_self',
    isNew: true,
  },
  tournaments: {
    label: 'Tournaments',
    pathname: '/tournaments',
    url: '/tournaments',
    target: '_self',
    isNew: false,
  },
  challenges: {
    label: 'Challenges',
    pathname: '/challenges',
    url: '/challenges',
    target: '_self',
    isNew: false,
  },
  guide: {
    label: 'Guide',
    pathname: '/guide',
    url: '/guide',
    target: '_self',
    isNew: false,
  },
  download: {
    label: 'Download',
    pathname:
      'https://discord.com/channels/873715731873804298/1122346045968498738',
    url: 'https://discord.com/channels/873715731873804298/1122346045968498738',
    target: '_blank',
    isNew: false,
  },
} as const

export const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

export const statsColumns = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Completed Challenges', key: 'completedChallenges' },
  { title: 'Saves', key: 'saves' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Games Played', key: 'gamesPlayed' },
  { title: 'Wins', key: 'wins' },
  { title: 'Highest Save Streak', key: 'saveStreak' },
  { title: 'Highest Win Streak', key: 'highestWinStreak' },
] satisfies { title: string; key: keyof Player }[]

export const playerColumns = [
  { title: 'Saves', key: 'saves' },
  { title: 'Deaths', key: 'deaths' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Win Rate', key: 'winRate' },
  { title: 'Highest Save Streak', key: 'highestSaveStreak' },
] as const

export const personalBestsColumns = [
  { title: 'Kibbles Collected', key: 'personalBestKibbleCollected' },
  { title: 'Saves', key: 'personalBestSaves' },
] as const

export const kibblesColumns = [
  { title: 'Kibbles Collected', key: 'kibbleCollected' },
  { title: 'Jackpots', key: 'kibbleJackpots' },
  { title: 'Super Jackpots', key: 'kibbleSuperJackpots' },
] as const

export const playerDifficultyColumns = [
  { title: 'Fastest Game', key: 'bestGameTimes' },
  { title: 'Games Played', key: 'gamesPlayed' },
  { title: 'Wins', key: 'wins' },
] as const

export const playerTimeColumns = [
  { title: 'Round One', key: 'roundOne' },
  { title: 'Round Two', key: 'roundTwo' },
  { title: 'Round Three', key: 'roundThree' },
  { title: 'Round Four', key: 'roundFour' },
  { title: 'Round Five', key: 'roundFive' },
] as const

export const timeAllDiffColumns = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Best R1 Times', key: 'roundOne' },
  { title: 'Best R2 Times', key: 'roundTwo' },
  { title: 'Best R3 Times', key: 'roundThree' },
  { title: 'Best R4 Times', key: 'roundFour' },
  { title: 'Best R5 Times', key: 'roundFive' },
] satisfies { title: string; key: keyof Player }[]

export const bestGameTimesColumns = [
  { title: 'Time', key: 'totalTime' },
  { title: 'Players', key: 'teamMembers' },
  { title: 'Difficulty', key: 'difficulty' },
  { title: 'Date', key: 'date' },
] satisfies { title: string; key: keyof BestGameTimeFormatted }[]

export const kibbleColumns = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Single Game', key: 'singleGame' },
  { title: 'All time', key: 'allTime' },
  { title: 'Jackpots', key: 'jackpots' },
  { title: 'Super Jackpots', key: 'superJackpots' },
] satisfies { title: string; key: 'battleTag' | keyof Kibbles }[]

export const tournamentAwards = [
  'TurquoiseNitro',
  'TurquoiseWings',
  'VioletAura',
  'VioletWings',
]

export const topStatsConfiguration = [
  {
    key: 'saves',
    label: 'Savior Kitty',
    description: 'This player has the 1st place for saves.',
  },
  {
    key: 'wins',
    label: 'Victorious Kitty',
    description: 'This player has the 1st place for wins.',
  },
  {
    key: 'highestWinStreak',
    label: 'Unstoppable Kitty',
    description: 'This player has the highest win streak.',
  },
  {
    key: 'gamesPlayed',
    label: 'Addicted Kitty',
    description: 'This player has the most games played.',
  },
  {
    key: 'saveDeathRatio',
    label: 'Immortal Kitty',
    description: 'This player has the 1st place for save to death ratio.',
  },
  {
    key: 'kibbles',
    label: 'Hungriest Kitty',
    description: 'This player has the most kibbles collected.',
  },
] satisfies Array<{
  key: keyof Tops
  description: string
  label: string
}>

export const statsPageVariants = {
  stats: {
    title: 'Overall stats',
    description: 'Check all the general stats for all players',
    columns: statsColumns,
    defaultSortKey: 'completedChallenges',
    apiBaseUrl: 'stats',
    defaultSortOrder: 'desc',
  },
  times: {
    title: 'Time stats',
    description: 'Check all the time-based stats',
    columns: timeAllDiffColumns,
    defaultSortKey: 'roundOne',
    apiBaseUrl: 'times',
    defaultSortOrder: 'asc',
  },
  kibble: {
    title: 'Kibble stats',
    description: 'Check all the kibble stats for all players',
    columns: kibbleColumns,
    defaultSortKey: 'singleGame',
    apiBaseUrl: 'kibble',
    defaultSortOrder: 'desc',
  },
} as const

// TODO: separate this into a different file
export const bestiesGroups: {
  key: keyof FastestBestiesData
  colorName: 'primary' | 'secondary' | 'tertiary'
}[] = [
  { key: 'threeOrMore', colorName: 'primary' },
  { key: 'twice', colorName: 'secondary' },
  { key: 'once', colorName: 'tertiary' },
]

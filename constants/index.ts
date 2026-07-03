import { Difficulty } from '@/interfaces/difficulty'
import { BestGameTime } from '@/interfaces/game'
import { FastestBestiesData, Kibbles, Player, Tops } from '@/interfaces/player'

export const apiUrl = 'https://rkrapi-801419031002.us-east1.run.app'

export const awardsStatsApi = `${apiUrl}/api/awards/stats`
export const playersLeaderboardApi = `${apiUrl}/api/players/leaderboard`
export const playersApi = `${apiUrl}/api/players`
export const playersSummaryApi = `${apiUrl}/api/players/summary`
export const playersTimeLeaderboardApi = `${apiUrl}/api/players/timeLeaderboard`
export const tournamentsFullApi = `${apiUrl}/api/tournaments/full`
export const tournamentsBaseApi = `${apiUrl}/api/tournaments`
export const playerStatsApi = `${apiUrl}/api/playerStats`
export const playerStatsKibbleLeaderboardApi = `${apiUrl}/api/playerStats/kibbleLeaderboard`
export const playerStatsFastestBestiesApi = `${apiUrl}/api/playerStats/fastestBesties`
export const bestGameTimesTopApi = `${apiUrl}/api/bestGameTimes/top?count=20`
export const playerStatsDefaultApi = `${apiUrl}/api/playerStats/stats?filter=stats&page=1&sortKey=completedChallenges&sortOrder=desc&pageSize=5`

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
  },
  leaderboard: {
    label: 'Leaderboard',
    pathname: '/leaderboard',
    url: '/leaderboard',
    target: '_self',
  },
  scoreboard: {
    label: 'Scoreboard',
    pathname: '/stats',
    url: '/stats?filter=stats&page=1&sortKey=completedChallenges&sortOrder=desc',
    target: '_self',
  },
  tournaments: {
    label: 'Tournaments',
    pathname: '/tournaments',
    url: '/tournaments',
    target: '_self',
  },
  challenges: {
    label: 'Challenges',
    pathname: '/challenges',
    url: '/challenges',
    target: '_self',
  },
  guide: {
    label: 'Guide',
    pathname: '/guide',
    url: '/guide',
    target: '_self',
  },
  download: {
    label: 'Download',
    pathname:
      'https://discord.com/channels/873715731873804298/1122346045968498738',
    url: 'https://discord.com/channels/873715731873804298/1122346045968498738',
    target: '_blank',
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
] satisfies { title: string; key: keyof BestGameTime }[]

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

export const formattedMockData: Player[] = [
  {
    awards: [
      {
        key: 'award1',
        status: 1,
        description: 'Completed 100 games',
        displayName: 'Veteran Player',
        category: 'event-2025',
        percentage: 100,
      },
      {
        key: 'award2',
        status: 1,
        description: 'Win without dying',
        displayName: 'Flawless Victory',
        category: 'event-2025',
        percentage: 100,
      },
    ],
    battleTag: {
      name: 'Pablo',
      tag: 'Pablo#1234',
    },
    bestGameTimes: [
      {
        difficulty: 'normal',
        time: 500,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'hard',
        time: 400,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'impossible',
        time: 320,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'solo',
        time: 380,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'nightmare',
        time: 360,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'progressive',
        time: 340,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
    ],
    completedChallenges: {
      general: [7, 10],
      tournament: [3, 5],
    },
    deaths: 87,
    fastestBesties: {
      1: ['TeammateA', 'TeammateB'],
      2: ['TeammateC'],
      3: [],
    },
    gamesPlayed: {
      hard: 45,
      impossible: 30,
      normal: 60,
      total: 135,
      nightmare: 0,
      progressive: 10,
    },
    highestWinStreak: 14,
    kibbleCollected: 10500,
    kibbleJackpots: 12,
    kibbleSuperJackpots: 2,
    personalBestKibbleCollected: 420,
    lastUploaded: '2025-06-03T14:52:00Z',
    roundFive: {
      best: { time: 500, difficulty: 'hard' },
      hard: 520,
      impossible: 530,
      normal: 550,
      solo: 510,
      nightmare: 540,
      progressive: 525,
    },
    roundFour: {
      best: { time: 450, difficulty: 'normal' },
      hard: 460,
      impossible: 470,
      normal: 450,
      solo: 455,
      nightmare: 480,
      progressive: 465,
    },
    roundOne: {
      best: { time: 200, difficulty: 'normal' },
      hard: 210,
      impossible: 250,
      normal: 200,
      solo: 205,
      nightmare: 220,
      progressive: 230,
    },
    roundThree: {
      best: { time: 350, difficulty: 'hard' },
      hard: 350,
      impossible: 390,
      normal: 400,
      solo: 360,
      nightmare: 370,
      progressive: 375,
    },
    roundTwo: {
      best: { time: 300, difficulty: 'hard' },
      hard: 300,
      impossible: 330,
      normal: 340,
      solo: 310,
      nightmare: 320,
      progressive: 325,
    },
    saveDeathRatio: 3.5,
    saves: 305,
    savesSingleGame: 28,
    saveStreak: {
      highestScore: 140,
      redLightning: true,
      patrioticTendrils: false,
    },
    skins: {
      selectedAura: 'aura_fire',
      selectedHat: 'top_hat',
      selectedSkin: 'shadow_cat',
      selectedTrail: 'rainbow_trail',
      selectedWindwalk: 'windwalk_ghost',
      selectedWings: 'dragon_wings',
    },
    winRate: '72.5%',
    wins: {
      hard: 30,
      impossible: 22,
      normal: 50,
      total: 102,
      nightmare: 0,
      progressive: 10,
    },
    winStreak: 6,
    mostPlayedColor: 'purple',
  },
  {
    awards: [
      {
        key: 'award1',
        status: 1,
        description: 'Completed 100 games',
        displayName: 'Veteran Player',
        category: 'event-2025',
        percentage: 100,
      },
      {
        key: 'award2',
        status: 1,
        description: 'Win without dying',
        displayName: 'Flawless Victory',
        category: 'event-2025',
        percentage: 100,
      },
    ],
    battleTag: {
      name: 'Gonza',
      tag: 'Gonza#1234',
    },
    bestGameTimes: [
      {
        difficulty: 'normal',
        time: 420,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'hard',
        time: 295,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'impossible',
        time: 360,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'solo',
        time: 305,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'nightmare',
        time: 310,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
      {
        difficulty: 'progressive',
        time: 330,
        roundOneTime: 0,
        roundTwoTime: 0,
        roundThreeTime: 0,
        roundFourTime: 0,
        roundFiveTime: 0,
        teamMembers: '',
        date: '',
      },
    ],
    completedChallenges: {
      general: [8, 11],
      tournament: [1, 4],
    },
    deaths: 134,
    fastestBesties: {
      1: ['SpeedKitty'],
      2: ['QuickPaw', 'NimbleFur'],
      3: ['GhostWhisker'],
    },
    gamesPlayed: {
      hard: 50,
      impossible: 20,
      normal: 80,
      total: 150,
      nightmare: 5,
      progressive: 15,
    },
    highestWinStreak: 10,
    kibbleCollected: 8700,
    kibbleJackpots: 9,
    kibbleSuperJackpots: 3,
    personalBestKibbleCollected: 380,
    lastUploaded: '2025-06-02T18:30:00Z',
    roundFive: {
      best: { time: 490, difficulty: 'impossible' },
      hard: 510,
      impossible: 490,
      normal: 530,
      solo: 500,
      nightmare: 520,
      progressive: 505,
    },
    roundFour: {
      best: { time: 430, difficulty: 'hard' },
      hard: 430,
      impossible: 460,
      normal: 480,
      solo: 440,
      nightmare: 450,
      progressive: 445,
    },
    roundOne: {
      best: { time: 190, difficulty: 'hard' },
      hard: 190,
      impossible: 220,
      normal: 210,
      solo: 195,
      nightmare: 205,
      progressive: 200,
    },
    roundThree: {
      best: { time: 330, difficulty: 'normal' },
      hard: 340,
      impossible: 370,
      normal: 330,
      solo: 345,
      nightmare: 360,
      progressive: 350,
    },
    roundTwo: {
      best: { time: 290, difficulty: 'impossible' },
      hard: 310,
      impossible: 290,
      normal: 320,
      solo: 300,
      nightmare: 315,
      progressive: 305,
    },
    saveDeathRatio: 2.9,
    saves: 280,
    savesSingleGame: 25,
    saveStreak: {
      highestScore: 130,
      redLightning: false,
      patrioticTendrils: true,
    },
    skins: {
      selectedAura: 'aura_ice',
      selectedHat: 'wizard_hat',
      selectedSkin: 'stealth_kitty',
      selectedTrail: 'ghost_trail',
      selectedWindwalk: 'windwalk_shadow',
      selectedWings: 'angel_wings',
    },
    winRate: '68.0%',
    wins: {
      hard: 35,
      impossible: 15,
      normal: 52,
      total: 102,
      nightmare: 0,
      progressive: 10,
    },
    winStreak: 5,
    mostPlayedColor: 'blue',
  },
]

export const mockParsedGameStats: BestGameTime[] = [
  {
    difficulty: 'hard',
    date: '2025-03-08 21:49:56',
    teamMembers:
      'Matt#2345, Laura#1234, Alexander#12345, Emmanuel#99999, Mike#6789, Jessie#3333',
    roundOneTime: 12.02,
    roundTwoTime: 80.0,
    roundThreeTime: 222.11,
    roundFourTime: 133.11,
    roundFiveTime: 123.02,
    totalTime: 500.23,
  },
  {
    difficulty: 'normal',
    date: '2025-03-07 23:26:58',
    teamMembers: 'Matt#2345, Mike#6789, Jessie#3333',
    roundOneTime: 12.02,
    roundTwoTime: 80.0,
    roundThreeTime: 222.11,
    roundFourTime: 133.11,
    roundFiveTime: 123.02,
    totalTime: 500.23,
  },
  {
    difficulty: 'impossible',
    date: '2025-03-07 22:43:38',
    teamMembers: 'Matt#2345, Mike#6789, Alexander#12345, Jessie#3333',
    roundOneTime: 12.02,
    roundTwoTime: 80.0,
    roundThreeTime: 222.11,
    roundFourTime: 133.11,
    roundFiveTime: 123.02,
    totalTime: 500.23,
  },
  {
    difficulty: 'hard',
    date: '2025-03-06 22:43:12',
    teamMembers: 'Alexander#12345, Emmanuel#99999, Charlie#4567',
    roundOneTime: 12.02,
    roundTwoTime: 80.0,
    roundThreeTime: 222.11,
    roundFourTime: 133.11,
    roundFiveTime: 123.02,
    totalTime: 500.23,
  },
  {
    difficulty: 'normal',
    date: '2025-03-06 22:41:42',
    teamMembers: 'Emmanuel#99999, Matt#2345, Alexander#12345, Noah#11111',
    roundOneTime: 12.02,
    roundTwoTime: 80.0,
    roundThreeTime: 222.11,
    roundFourTime: 133.11,
    roundFiveTime: 123.02,
    totalTime: 500.23,
  },
  {
    difficulty: 'hard',
    date: '2025-03-06 17:55:01',
    teamMembers:
      'Matt#2345, Laura#1234, Alexander#12345, Mike#6789, Noah#11111, Charlie#4567',
    roundOneTime: 12.02,
    roundTwoTime: 80.0,
    roundThreeTime: 222.11,
    roundFourTime: 133.11,
    roundFiveTime: 123.02,
    totalTime: 500.23,
  },
]

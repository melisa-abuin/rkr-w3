import { Difficulty } from '@/interfaces/difficulty'
import { GameStats } from '@/interfaces/game'
import { Kibbles, Player } from '@/interfaces/player'

export const awardsDescriptions = {
  AncientKitty: 'Obtained by getting 40 Normal+ wins',
  ArchangelWings: 'Obtained by reaching 425 saves',
  AstralKitty: 'Obtained by playing at least 55 Normal+ games',
  AzureLight: 'Obtained by beating the nitro timer on Round 2 Impossible+.',
  Bandana: 'Obtained by reaching 200 saves',
  BlueFire:
    'Obtained by winning the game on Normal+ with less than 25 total deaths.',
  BlueLightning: 'Obtained by reaching 2000 saves',
  ButterflyAura:
    'Obtained by beating the Round 4 nitro on Impossible with 5 or less deaths',
  ChaosWings: 'Obtained by reaching 450 saves',
  ChefHat: 'Obtained by reaching 300 saves',
  CosmicWings: 'Obtained by reaching 550 saves',
  CrimsonLight: 'Obtained by beating the nitro timer on Round 3 Impossible+.',
  DivineLight:
    'Obtained by beating the nitro timer for ALL rounds in a single game OR Round 1 Impossible+.',
  DivinityTendrils:
    'Obtained by getting 4 revives using your ultimate`s AoE effect.',
  EmeraldLight: 'Obtained by beating the nitro timer on Round 4 Impossible+.',
  FairyWings: 'Obtained by reaching 275 saves',
  FreezeAura:
    'Using the Frostbite Ring, collectively freeze a total of 50 wolves in a single game and win the game on Normal+ difficulty.',
  GreenLightning:
    'Obtained by finishing a round with a save streak of 10 and 0 deaths.',
  GreenTendrils: 'Obtained by purchasing from the shop.',
  HuntressKitty: 'Obtained by winning the kibble collection event.',
  HighelfKitty: 'Obtained by playing at least 40 Normal+ games',
  ManaAura: 'Obtained by getting 20 Normal+ wins',
  NatureWings: 'Obtained by reaching 750 saves',
  NightmareWings: 'Obtained by reaching 325 saves',
  Nitro: 'Obtained by beating the Round 1 nitro timer',
  NitroBlue: 'Obtained by beating the Round 2 nitro timer',
  NitroGreen: 'Obtained by beating the Round 4 nitro timer',
  NitroPurple: 'Obtained by beating the Round 5 nitro timer',
  NitroRed: 'Obtained by beating the Round 3 nitro timer',
  NormalDeathless1:
    'Obtained by reaching all 14 safezones on Normal+ for round 1 without dying',
  NormalDeathless2:
    'Obtained by reaching all 14 safezones on Normal+ for round 2 without dying',
  NormalDeathless3:
    'Obtained by reaching all 14 safezones on Normal+ for round 3 without dying',
  NormalDeathless4:
    'Obtained by reaching 10 safezones on Normal+ for round 4 without dying',
  NormalDeathless5:
    'Obtained by reaching 6 safezones on Normal+ for round 5 without dying',
  PatrioticLight:
    'Obtained by reaching the end for Round 5 on Impossible difficulty in under 16 minutes and 35 seconds of total game time.',
  PatrioticTendrils: 'Obtained by reaching a save streak of 50 without dying',
  PenguinSkin: 'Solo tournament',
  PhoenixWings: 'Obtained by reaching 375 saves',
  PinkFire: 'Obtained by winning a Normal+ game with a 3:1 ratio or better',
  PinkWings: 'Obtained by reaching 600 saves',
  PirateHat: 'Obtained by reaching 250 saves',
  PurpleFire: 'Obtained by beating round 2 on impossible with 0 deaths',
  PurpleLightning: 'Obtained by getting 175 saves within one game.',
  RedLightning: 'Obtained by reaching a save streak of 15 without dying.',
  RedTendrils: 'Obtained by returning Fieryfox his missing shoe.',
  SamuraiHelm: 'Obtained by reaching 400 saves',
  SantaHat: 'Obtained by reaching 800 saves',
  SatyrKitty: 'Obtained by getting 25 Normal+ wins',
  SnowTrail2023:
    'Obtained by playing this map during the Christmas holidays :)',
  SnowWings2023:
    'Obtained by playing this map during the Christmas holidays :)',
  SpecialAura: 'Obtained by getting 5 Hard+ wins',
  SpectacularAura: 'Obtained by getting 30 Normal+ wins',
  StarlightAura: 'Obtained by playing at least 65 Normal+ games',
  TikiMask: 'Obtained by reaching 350 saves',
  TurquoiseFire:
    'Obtained by beating round 5 on Normal+ with 0 or less round deaths',
  TurquoiseNitro: 'Solo tournament',
  NormalTeamDeathless:
    'Obtained by completeing the team deathless challenge on Normal+ difficulty',
  HardTeamDeathless:
    'Obtained by completeing the team deathless challenge on Hard+ difficulty',
  ImpossibleTeamDeathless:
    'Obtained by completeing the team deathless challenge on Impossible+ difficulty',
  TurquoiseWings: 'Solo tournament',
  UndeadKitty: 'Obtained by getting 30 Normal+ wins',
  VioletAura: 'Team tournament',
  VioletLight: 'Obtained by beating the nitro timer on Round 5 Impossible+.',
  VioletWings: 'Team Tournament',
  VoidWings: 'Obtained by reaching 500 saves',
  WWBlood: 'Obtained by completing the Blood Vial easter egg',
  WWBlue: 'Obtained by completing the Urn of a Broken Soul easter egg',
  WWDivine: 'Obtained by reaching the limit... only to retrace your journey.',
  WWFire: 'Obtained by completing the Crystal of Fire easter egg',
  WWNecro: 'Obtained by winning the game in under 25 mins',
  WWSwift: 'Obtained by completing the Cat Figurine easter egg',
  WWViolet: 'Obtainer by... ???',
  WhiteFire:
    'Obtained by beating round 3 nitro on Normal+ with 3 or less deaths.',
  WhiteTendrils: 'Obtained by simply winning a game on Impossible difficulty.',
  YellowLightning: 'Obtained by getting 6 saves within 3 seconds.',
  ZandalariKitty:
    'Obtained by getting R4 Nitro then winning the game on Hard+ difficulty',
} as Record<string, string>

export const blacklistedPlayers = ['Local Player']

export const blizzardLink = 'https://www.blizzard.com/'

export const colors: Record<string, string> = {
  red: '#ff0303',
  blue: '#0042ff',
  teal: '#1be7ba',
  purple: '#550081',
  yellow: '#fefc00',
  orange: '#fe890d',
  green: '#21bf00',
  pink: '#e45caf',
  gray: '#939596',
  lightblue: '#7ebff1',
  darkgreen: '#106247',
  brown: '#4f2b05',
  maroon: '#9c0000',
  navy: '#0000c3',
  turquoise: '#00ebff',
  violet: '#bd00ff',
  wheat: '#ecce87',
  peach: '#f7a58b',
  mint: '#bfff81',
  lavender: '#dbb8eb',
  coal: '#4f5055',
  snow: '#ecf0ff',
  emerald: '#00781e',
  peanut: '#a56f34',
}

export const roundDifficultyNames: Difficulty[] = [
  'normal',
  'hard',
  'impossible',
  'solo',
]

export const difficultyNames: Difficulty[] = ['normal', 'hard', 'impossible']

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

export const mapVersionNumber = '1.3.1'

export const downloadFileName = `RKR_Remastered_${mapVersionNumber}`

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
    url: '/stats/overview?page=1&sortKey=completedChallenges&sortOrder=desc',
    target: '_self',
  },
  guide: {
    label: 'Guide',
    pathname: '/guide',
    url: '/guide',
    target: '_self',
  },
} as const

export const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

export const statsColumns: { title: string; key: keyof Player }[] = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Completed Challenges', key: 'completedChallenges' },
  { title: 'Saves', key: 'saves' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Games Played', key: 'gamesPlayed' },
  { title: 'Wins', key: 'wins' },
  { title: 'Highest Save Streak', key: 'saveStreak' },
  { title: 'Highest Win Streak', key: 'highestWinStreak' },
]

export const playerColumns = [
  { title: 'Saves', key: 'saves' },
  { title: 'Deaths', key: 'deaths' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Win Rate', key: 'winRate' },
  { title: 'Highest Save Streak', key: 'saveStreak' },
] as const

export const personalBestsColumns = [
  { title: 'Kibbles Collected', key: 'singleGame' },
  { title: 'Saves', key: 'savesSingleGame' },
] as const

export const kibblesColumns = [
  { title: 'Kibbles Collected', key: 'allTime' },
  { title: 'Jackpots', key: 'jackpots' },
  { title: 'Super Jackpots', key: 'superJackpots' },
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

export const timeAllDiffColumns: { title: string; key: keyof Player }[] = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Best R1 Times', key: 'roundOne' },
  { title: 'Best R2 Times', key: 'roundTwo' },
  { title: 'Best R3 Times', key: 'roundThree' },
  { title: 'Best R4 Times', key: 'roundFour' },
  { title: 'Best R5 Times', key: 'roundFive' },
]

export const bestGameTimesColumns: { title: string; key: keyof GameStats }[] = [
  { title: 'Time', key: 'time' },
  { title: 'Players', key: 'teamMembers' },
  { title: 'Difficulty', key: 'difficulty' },
  { title: 'Date', key: 'date' },
]
export const kibbleColumns: {
  title: string
  key: keyof Kibbles | 'battleTag'
}[] = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Single Game', key: 'singleGame' },
  { title: 'All time', key: 'allTime' },
  { title: 'Jackpots', key: 'jackpots' },
  { title: 'Super Jackpots', key: 'superJackpots' },
]

export const tournamentAwards = [
  'TurquoiseNitro',
  'TurquoiseWings',
  'VioletAura',
  'VioletWings',
]

export const topStatsConfiguration: Array<{
  key: keyof Player
  description: string
  label: string
}> = [
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
]

export const statsPageVariants = {
  overview: {
    title: 'Overall stats',
    description: 'Check all the general stats for all players',
    columns: statsColumns,
    defaultSortKey: 'completedChallenges',
    apiBaseUrl: 'stats',
  },
  time: {
    title: 'Time stats',
    description: 'Check all the time-based stats',
    columns: timeAllDiffColumns,
    defaultSortKey: 'roundOne',
    apiBaseUrl: 'times',
  },
  kibble: {
    title: 'Kibble stats',
    description: 'Check all the kibble stats for all players',
    columns: kibbleColumns,
    defaultSortKey: 'singleGame',
    apiBaseUrl: 'kibbleStats',
  },
} as const

// TODO: separate this into a different file
export const formattedMockData: Player[] = [
  {
    awards: [
      {
        id: 'event-2025',
        awards: [
          {
            id: 'award1',
            completed: true,
            description: 'Completed 100 games',
            imagePath: '/images/awards/100_games.png',
            title: 'Veteran Player',
          },
          {
            id: 'award2',
            completed: false,
            description: 'Win without dying',
            imagePath: '/images/awards/flawless.png',
            title: 'Flawless Victory',
          },
        ],
      },
    ],
    battleTag: {
      name: 'Pablo',
      tag: 'Pablo#1234',
    },
    bestGameTimes: {
      best: { time: 320, difficulty: 'impossible' },
      hard: 400,
      impossible: 320,
      normal: 500,
      solo: 380,
    },
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
    },
    highestWinStreak: 14,
    kibbles: {
      allTime: 10500,
      singleGame: 420,
      jackpots: 12,
      superJackpots: 2,
    },
    lastUploaded: '2025-06-03T14:52:00Z',
    roundFive: {
      best: { time: 500, difficulty: 'hard' },
      hard: 520,
      impossible: 530,
      normal: 550,
      solo: 510,
    },
    roundFour: {
      best: { time: 450, difficulty: 'normal' },
      hard: 460,
      impossible: 470,
      normal: 450,
      solo: 455,
    },
    roundOne: {
      best: { time: 200, difficulty: 'normal' },
      hard: 210,
      impossible: 250,
      normal: 200,
      solo: 205,
    },
    roundThree: {
      best: { time: 350, difficulty: 'hard' },
      hard: 350,
      impossible: 390,
      normal: 400,
      solo: 360,
    },
    roundTwo: {
      best: { time: 300, difficulty: 'hard' },
      hard: 300,
      impossible: 330,
      normal: 340,
      solo: 310,
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
    },
    winStreak: 6,
    mostPlayedColor: 'purple',
  },
  {
    awards: [
      {
        id: 'event-2025',
        awards: [
          {
            id: 'award3',
            completed: true,
            description: 'Saved 300 teammates',
            imagePath: '/images/awards/lifesaver.png',
            title: 'Lifesaver',
          },
          {
            id: 'award4',
            completed: true,
            description: 'Win 10 games in a row',
            imagePath: '/images/awards/streak_master.png',
            title: 'Streak Master',
          },
        ],
      },
    ],
    battleTag: {
      name: 'Gonza',
      tag: 'Gonza#1234',
    },
    bestGameTimes: {
      best: { time: 295, difficulty: 'hard' },
      hard: 295,
      impossible: 360,
      normal: 420,
      solo: 305,
    },
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
    },
    highestWinStreak: 10,
    kibbles: {
      allTime: 8700,
      singleGame: 380,
      jackpots: 9,
      superJackpots: 3,
    },
    lastUploaded: '2025-06-02T18:30:00Z',
    roundFive: {
      best: { time: 490, difficulty: 'impossible' },
      hard: 510,
      impossible: 490,
      normal: 530,
      solo: 500,
    },
    roundFour: {
      best: { time: 430, difficulty: 'hard' },
      hard: 430,
      impossible: 460,
      normal: 480,
      solo: 440,
    },
    roundOne: {
      best: { time: 190, difficulty: 'hard' },
      hard: 190,
      impossible: 220,
      normal: 210,
      solo: 195,
    },
    roundThree: {
      best: { time: 330, difficulty: 'normal' },
      hard: 340,
      impossible: 370,
      normal: 330,
      solo: 345,
    },
    roundTwo: {
      best: { time: 290, difficulty: 'impossible' },
      hard: 310,
      impossible: 290,
      normal: 320,
      solo: 300,
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
    },
    winStreak: 5,
    mostPlayedColor: 'blue',
  },
]

export const mockParsedGameStats: GameStats[] = [
  {
    difficulty: 'hard',
    date: '2025-03-08 21:49:56',
    teamMembers:
      'Matt#2345, Laura#1234, Alexander#12345, Emmanuel#99999, Mike#6789, Jessie#3333',
    time: 3162.418,
  },
  {
    difficulty: 'normal',
    date: '2025-03-07 23:26:58',
    teamMembers: 'Matt#2345, Mike#6789, Jessie#3333',
    time: 2194.204,
  },
  {
    difficulty: 'impossible',
    date: '2025-03-07 22:43:38',
    teamMembers: 'Matt#2345, Mike#6789, Alexander#12345, Jessie#3333',
    time: 4859.82,
  },
  {
    difficulty: 'hard',
    date: '2025-03-06 22:43:12',
    teamMembers: 'Alexander#12345, Emmanuel#99999, Charlie#4567',
    time: 2528.889,
  },
  {
    difficulty: 'normal',
    date: '2025-03-06 22:41:42',
    teamMembers: 'Emmanuel#99999, Matt#2345, Alexander#12345, Noah#11111',
    time: 1779.17,
  },
  {
    difficulty: 'hard',
    date: '2025-03-06 17:55:01',
    teamMembers:
      'Matt#2345, Laura#1234, Alexander#12345, Mike#6789, Noah#11111, Charlie#4567',
    time: 3245.011,
  },
]

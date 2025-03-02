import { Difficulty } from '@/interfaces/difficulty'
import { Challenges, PlayerStats, SaveStreak } from '@/interfaces/player'

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
  PatrioticTendrils: 'Obtained by reaching a save streak of 50 without dying',
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
  TurquoiseWings: 'Solo tournament',
  UndeadKitty: 'Obtained by getting 30 Normal+ wins',
  VioletAura: 'Team tournament',
  VioletLight: 'Obtained by beating the nitro timer on Round 5 Impossible+.',
  VioletWings: 'Team Tournament',
  VoidWings: 'Obtained by reaching 500 saves',
  WWBlood: 'Obtained by completing the Blood Vial easter egg',
  WWBlue: 'Obtained by completing the Urn of a Broken Soul easter egg',
  WWFire: 'Obtained by completing the Crystal of Fire easter egg',
  WWNecro: 'Obtained by winning the game in under 25 mins',
  WWSwift: 'Obtained by completing the Cat Figurine easter egg',
  WhiteFire:
    'Obtained by beating round 3 nitro on Normal+ with 3 or less deaths.',
  WhiteTendrils: 'Obtained by simply winning a game on Impossible difficulty.',
  YellowLightning: 'Obtained by getting 6 saves within 3 seconds.',
  ZandalariKitty:
    'Obtained by getting R4 Nitro then winning the game on Hard+ difficulty',
} as Record<string, string>

export const blacklistedPlayers = ['Local Player']

export const blizzardLink = 'https://www.blizzard.com/'

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
    text: "Make sure the folder name is 'Run-Kitty-Run' and not 'RunKittyRun' or some other variable. Once you are in that directory, you will see a text file named after your battletag. Select that file and press 'open'",
    imageSrcSet: {
      dark: '/discord-example4.png',
      light: '/discord-example4.png',
    },
  },
  {
    stepTitle: 'Step 5:',

    text: "You will see that in the discord chat window your file is attached to the message. Now all you have to do is write the '!upload' command. Send the message, and you will automatically receive a response from the Discord bot informing you if the action was successful or not.",
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

export const downloadFileName = 'RKR_Remastered_1.0.8'

export const githubReadMeLink =
  'https://github.com/melisa-abuin/rkr-w3/blob/main/README.md'

export const pageSize = 10
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
}

export const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

export const statsColumns: { title: string; key: keyof PlayerStats }[] = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Completed Challenges', key: 'completedChallenges' },
  { title: 'Saves', key: 'saves' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Games Played', key: 'gamesPlayed' },
  { title: 'Wins', key: 'wins' },
  { title: 'Highest Save Streak', key: 'saveStreak' },
  { title: 'Highest Win Streak', key: 'highestWinStreak' },
]

export const timeAllDiffColumns: { title: string; key: keyof PlayerStats }[] = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Best R1 Times', key: 'roundOne' },
  { title: 'Best R2 Times', key: 'roundTwo' },
  { title: 'Best R3 Times', key: 'roundThree' },
  { title: 'Best R4 Times', key: 'roundFour' },
  { title: 'Best R5 Times', key: 'roundFive' },
]

export const tournamentAwards = [
  'TurquoiseNitro',
  'TurquoiseWings',
  'VioletAura',
  'VioletWings',
]

export const formattedMockData = [
  {
    battleTag: {
      name: 'Pablo',
      tag: 'Pablo#1234',
    },
    saves: 100,
    deaths: 871,
    normalGames: 10,
    hardGames: 10,
    impossibleGames: 10,
    saveStreak: {
      redLightning: true,
      patrioticTendrils: true,
    } as SaveStreak,
    highestWinStreak: 100,
    completedChallenges: {
      general: [56, 56],
      tournament: [4, 4],
    } as Challenges,
    winRate: '25.2%',
    saveDeathRatio: 1.63,
    gamesPlayed: {
      normal: 10,
      hard: 10,
      impossible: 10,
      total: 30,
    },
    wins: {
      normal: 25,
      hard: 11,
      impossible: 1,
      total: 37,
    },
    roundOne: {
      normal: 100.0,
      hard: 110.0,
      impossible: 120.0,
      best: {
        difficulty: 'normal',
        time: 100.0,
      },
    },
    roundTwo: {
      normal: 150.0,
      hard: 160.0,
      impossible: 170.0,
      best: {
        difficulty: 'normal',
        time: 150.0,
      },
    },
    roundThree: {
      normal: 250.0,
      hard: 270.0,
      impossible: 280.0,
      best: {
        difficulty: 'normal',
        time: 250.0,
      },
    },
    roundFour: {
      normal: 350.0,
      hard: 370.0,
      impossible: 380.0,
      best: {
        difficulty: 'normal',
        time: 350.0,
      },
    },
    roundFive: {
      normal: 450.0,
      hard: 470.0,
      impossible: 480.0,
      best: {
        difficulty: 'normal',
        time: 450.0,
      },
    },
  },
  {
    battleTag: {
      name: 'Gonza',
      tag: 'Gonza#1234',
    },
    saves: 50,
    deaths: 871,
    normalGames: 39,
    hardGames: 16,
    impossibleGames: 15,
    saveStreak: {
      redLightning: true,
      patrioticTendrils: true,
    } as SaveStreak,
    highestWinStreak: 100,
    winRate: '25.2%',
    completedChallenges: {
      general: [56, 56],
      tournament: [4, 4],
    } as Challenges,
    saveDeathRatio: 1.63,
    gamesPlayed: {
      normal: 39,
      hard: 16,
      impossible: 15,
      total: 70,
    },
    wins: {
      normal: 25,
      hard: 11,
      impossible: 1,
      total: 37,
    },
    roundOne: {
      normal: 120.0,
      hard: 130.0,
      impossible: 140.0,
      best: {
        difficulty: 'normal',
        time: 120.0,
      },
    },
    roundTwo: {
      normal: 180.0,
      hard: 200.0,
      impossible: 210.0,
      best: {
        difficulty: 'normal',
        time: 180.0,
      },
    },
    roundThree: {
      normal: 280.0,
      hard: 300.0,
      impossible: 320.0,
      best: {
        difficulty: 'normal',
        time: 280.0,
      },
    },
    roundFour: {
      normal: 380.0,
      hard: 400.0,
      impossible: 420.0,
      best: {
        difficulty: 'normal',
        time: 380.0,
      },
    },
    roundFive: {
      normal: 480.0,
      hard: 500.0,
      impossible: 520.0,
      best: {
        difficulty: 'normal',
        time: 480.0,
      },
    },
  },
  {
    battleTag: {
      name: 'Alice',
      tag: 'Alice#5678',
    },
    saves: 200,
    deaths: 20,
    normalGames: 50,
    hardGames: 40,
    impossibleGames: 10,
    saveStreak: {
      redLightning: true,
      patrioticTendrils: true,
    } as SaveStreak,
    highestWinStreak: 200,
    winRate: '25.2%',
    completedChallenges: {
      general: [101, 102],
      tournament: [4, 4],
    } as Challenges,
    saveDeathRatio: 10.0,
    gamesPlayed: {
      normal: 50,
      hard: 40,
      impossible: 10,
      total: 100,
    },
    wins: {
      normal: 40,
      hard: 30,
      impossible: 5,
      total: 75,
    },
    roundOne: {
      normal: 90.0,
      hard: 85.0,
      impossible: 100.0,
      best: {
        difficulty: 'hard',
        time: 85.0,
      },
    },
    roundTwo: {
      normal: 140.0,
      hard: 120.0,
      impossible: 150.0,
      best: {
        difficulty: 'hard',
        time: 120.0,
      },
    },
    roundThree: {
      normal: 240.0,
      hard: 230.0,
      impossible: 250.0,
      best: {
        difficulty: 'hard',
        time: 230.0,
      },
    },
    roundFour: {
      normal: 340.0,
      hard: 330.0,
      impossible: 350.0,
      best: {
        difficulty: 'hard',
        time: 330.0,
      },
    },
    roundFive: {
      normal: 440.0,
      hard: 430.0,
      impossible: 450.0,
      best: {
        difficulty: 'hard',
        time: 430.0,
      },
    },
  },
  {
    battleTag: {
      name: 'Charlie',
      tag: 'Charlie#9876',
    },
    saves: 120,
    deaths: 120,
    normalGames: 30,
    hardGames: 20,
    impossibleGames: 10,
    saveStreak: {
      redLightning: true,
      patrioticTendrils: true,
    } as SaveStreak,
    highestWinStreak: 20,
    winRate: '25.2%',
    completedChallenges: {
      general: [201, 202],
      tournament: [4, 4],
    } as Challenges,
    saveDeathRatio: 1.0,
    gamesPlayed: {
      normal: 30,
      hard: 20,
      impossible: 10,
      total: 60,
    },
    wins: {
      normal: 15,
      hard: 10,
      impossible: 5,
      total: 30,
    },
    roundOne: {
      normal: 95.0,
      hard: 105.0,
      impossible: 115.0,
      best: {
        difficulty: 'normal',
        time: 95.0,
      },
    },
    roundTwo: {
      normal: 145.0,
      hard: 155.0,
      impossible: 165.0,
      best: {
        difficulty: 'normal',
        time: 145.0,
      },
    },
    roundThree: {
      normal: 245.0,
      hard: 255.0,
      impossible: 265.0,
      best: {
        difficulty: 'normal',
        time: 245.0,
      },
    },
    roundFour: {
      normal: 345.0,
      hard: 355.0,
      impossible: 365.0,
      best: {
        difficulty: 'normal',
        time: 345.0,
      },
    },
    roundFive: {
      normal: 445.0,
      hard: 455.0,
      impossible: 465.0,
      best: {
        difficulty: 'normal',
        time: 445.0,
      },
    },
  },
  {
    battleTag: {
      name: 'Eve',
      tag: 'Eve#1239',
    },
    saves: 50,
    deaths: 300,
    normalGames: 5,
    hardGames: 3,
    impossibleGames: 2,
    saveStreak: {
      redLightning: true,
      patrioticTendrils: true,
    } as SaveStreak,
    highestWinStreak: 2,
    winRate: '25.2%',
    completedChallenges: {
      general: [0, 0],
      tournament: [0, 0],
    } as Challenges,
    saveDeathRatio: 0.16,
    gamesPlayed: {
      normal: 5,
      hard: 3,
      impossible: 2,
      total: 10,
    },
    wins: {
      normal: 2,
      hard: 1,
      impossible: 0,
      total: 3,
    },
    roundOne: {
      normal: 110.0,
      hard: 120.0,
      impossible: 130.0,
      best: {
        difficulty: 'impossible',
        time: 130.0,
      },
    },
    roundTwo: {
      normal: 160.0,
      hard: 170.0,
      impossible: 180.0,
      best: {
        difficulty: 'impossible',
        time: 180.0,
      },
    },
    roundThree: {
      normal: 260.0,
      hard: 270.0,
      impossible: 280.0,
      best: {
        difficulty: 'impossible',
        time: 280.0,
      },
    },
    roundFour: {
      normal: 360.0,
      hard: 370.0,
      impossible: 380.0,
      best: {
        difficulty: 'impossible',
        time: 380.0,
      },
    },
    roundFive: {
      normal: 460.0,
      hard: 470.0,
      impossible: 480.0,
      best: {
        difficulty: 'impossible',
        time: 480.0,
      },
    },
  },
] as const

export const mockApiData = [
  {
    battletag: 'Aches#1817',
    'Save Data':
      '{"GameAwards":{"AncientKitty":1,"ArchangelWings":1,"AstralKitty":1,"AzureLight":1,"Bandana":1,"BlueFire":1,"BlueLightning":1,"ButterflyAura":1,"ChaosWings":1,"ChefHat":1,"CosmicWings":1,"CrimsonLight":1,"DivineLight":1,"DivinityTendrils":1,"EmeraldLight":1,"FairyWings":1,"FreezeAura":0,"GreenLightning":1,"GreenTendrils":1,"HighelfKitty":1,"ManaAura":1,"NatureWings":1,"NightmareWings":1,"Nitro":1,"NitroBlue":1,"NitroGreen":1,"NitroPurple":1,"NitroRed":1,"NormalDeathless1":1,"NormalDeathless2":1,"NormalDeathless3":1,"NormalDeathless4":1,"NormalDeathless5":1,"PatrioticTendrils":1,"PhoenixWings":1,"PinkFire":1,"PinkWings":1,"PirateHat":1,"PurpleFire":1,"PurpleLightning":1,"RedLightning":1,"RedTendrils":1,"SamuraiHelm":1,"SantaHat":1,"SatyrKitty":1,"SnowTrail2023":1,"SnowWings2023":1,"SpecialAura":1,"SpectacularAura":1,"StarlightAura":1,"TikiMask":1,"TurquoiseFire":1,"TurquoiseNitro":1,"TurquoiseWings":1,"UndeadKitty":1,"VioletAura":1,"VioletLight":1,"VioletWings":1,"VoidWings":1,"WWBlood":1,"WWBlue":1,"WWFire":1,"WWNecro":1,"WWSwift":1,"WhiteFire":1,"WhiteTendrils":1,"YellowLightning":1,"ZandalariKitty":1},"GameAwardsSorted":{"Auras":{"ButterflyAura":1,"FreezeAura":0,"ManaAura":1,"SpecialAura":1,"SpectacularAura":1,"StarlightAura":1},"Deathless":{"NormalDeathless1":1,"NormalDeathless2":1,"NormalDeathless3":1,"NormalDeathless4":1,"NormalDeathless5":1},"Hats":{"Bandana":1,"ChefHat":1,"PirateHat":1,"SamuraiHelm":1,"SantaHat":1,"TikiMask":1},"Nitros":{"AzureLight":1,"CrimsonLight":1,"DivineLight":1,"EmeraldLight":1,"Nitro":1,"NitroBlue":1,"NitroGreen":1,"NitroPurple":1,"NitroRed":1,"VioletLight":1},"Skins":{"AncientKitty":1,"AstralKitty":1,"HighelfKitty":1,"SatyrKitty":1,"UndeadKitty":1,"ZandalariKitty":1},"Tournament":{"TurquoiseNitro":1,"TurquoiseWings":1,"VioletAura":1,"VioletWings":1},"Trails":{"BlueFire":1,"BlueLightning":1,"GreenLightning":1,"PinkFire":1,"PurpleFire":1,"PurpleLightning":1,"RedLightning":1,"SnowTrail2023":1,"TurquoiseFire":1,"WhiteFire":1,"YellowLightning":1},"Windwalks":{"WWBlood":1,"WWBlue":1,"WWFire":1,"WWNecro":1,"WWSwift":1},"Wings":{"ArchangelWings":1,"ChaosWings":1,"CosmicWings":1,"DivinityTendrils":1,"FairyWings":1,"GreenTendrils":1,"NatureWings":1,"NightmareWings":1,"PatrioticTendrils":1,"PhoenixWings":1,"PinkWings":1,"RedTendrils":1,"SnowWings2023":1,"VoidWings":1,"WhiteTendrils":1}},"GameStats":{"Deaths":1424,"HardGames":0,"HardWins":0,"HighestSaveStreak":13,"HighestWinStreak":1,"ImpossibleGames":5,"ImpossibleWins":3,"NormalGames":59,"NormalWins":13,"SaveStreak":2,"Saves":2266,"WinStreak":1},"PlayerName":"Aches#1817","RoundTimes":{"RoundFiveHard":0,"RoundFiveImpossible":421,"RoundFiveNormal":500,"RoundFiveSolo":130.0,"RoundFourHard":0,"RoundFourImpossible":168.09,"RoundFourNormal":500,"RoundFourSolo":506.23,"RoundOneHard":0,"RoundOneImpossible":424.55,"RoundOneNormal":500,"RoundOneSolo":174.49,"RoundThreeHard":0,"RoundThreeImpossible":153.0,"RoundThreeNormal":500,"RoundThreeSolo":182.89,"RoundTwoHard":0,"RoundTwoImpossible":411.35,"RoundTwoNormal":500,"RoundTwoSolo":0},"SelectedData":{"SelectedAura":"ButterflyAura","SelectedHat":"SantaHat","SelectedSkin":"","SelectedTrail":"VioletLight","SelectedWindwalk":"WWBlood","SelectedWings":"GreenTendrils"}}',
  },
  {
    battletag: 'Local Player',
    'Save Data':
      '{"Date":"2025-02-17 04:04:57","GameAwards":{"AncientKitty":0,"ArchangelWings":1,"AstralKitty":0,"AzureLight":0,"Bandana":1,"BlueFire":0,"BlueLightning":1,"ButterflyAura":0,"ChaosWings":1,"ChefHat":1,"CosmicWings":1,"CrimsonLight":0,"DivineLight":1,"DivinityTendrils":0,"EmeraldLight":0,"FairyWings":1,"FreezeAura":0,"GreenLightning":0,"GreenTendrils":0,"HighelfKitty":0,"ManaAura":0,"NatureWings":1,"NightmareWings":1,"Nitro":0,"NitroBlue":0,"NitroGreen":0,"NitroPurple":0,"NitroRed":0,"NormalDeathless1":0,"NormalDeathless2":0,"NormalDeathless3":0,"NormalDeathless4":0,"NormalDeathless5":0,"PatrioticTendrils":0,"PhoenixWings":1,"PinkFire":1,"PinkWings":1,"PirateHat":1,"PurpleFire":0,"PurpleLightning":0,"RedLightning":0,"RedTendrils":0,"SamuraiHelm":1,"SantaHat":1,"SatyrKitty":0,"SnowTrail2023":0,"SnowWings2023":0,"SpecialAura":0,"SpectacularAura":0,"StarlightAura":0,"TikiMask":1,"TurquoiseFire":0,"TurquoiseNitro":1,"TurquoiseWings":1,"UndeadKitty":0,"VioletAura":1,"VioletLight":1,"VioletWings":1,"VoidWings":1,"WWBlood":0,"WWBlue":0,"WWFire":1,"WWNecro":0,"WWSwift":0,"WhiteFire":1,"WhiteTendrils":0,"YellowLightning":0,"ZandalariKitty":0},"GameAwardsSorted":{"Auras":{"ButterflyAura":0,"FreezeAura":0,"ManaAura":0,"SpecialAura":0,"SpectacularAura":0,"StarlightAura":0},"Deathless":{"HardDeathless1":-1,"HardDeathless2":-1,"HardDeathless3":-1,"HardDeathless4":-1,"HardDeathless5":-1,"ImpossibleDeathless1":-1,"ImpossibleDeathless2":-1,"ImpossibleDeathless3":-1,"ImpossibleDeathless4":-1,"ImpossibleDeathless5":-1,"NormalDeathless1":0,"NormalDeathless2":0,"NormalDeathless3":0,"NormalDeathless4":0,"NormalDeathless5":0},"Hats":{"Bandana":1,"ChefHat":1,"PirateHat":1,"SamuraiHelm":1,"SantaHat":1,"TikiMask":1},"Nitros":{"AzureLight":0,"CrimsonLight":0,"DivineLight":1,"EmeraldLight":0,"Nitro":0,"NitroBlue":0,"NitroGreen":0,"NitroPurple":0,"NitroRed":0,"PatrioticLight":-1,"VioletLight":1},"Skins":{"AncientKitty":0,"AstralKitty":0,"HighelfKitty":0,"HuntressKitty":-1,"SatyrKitty":0,"UndeadKitty":0,"ZandalariKitty":0},"Tournament":{"LightningSpeed":-1,"TurquoiseNitro":1,"TurquoiseWings":1,"VioletAura":1,"VioletWings":1},"Trails":{"BlueFire":0,"BlueLightning":1,"GreenLightning":0,"PinkFire":1,"PurpleFire":0,"PurpleLightning":0,"RedLightning":0,"SnowTrail2023":0,"TurquoiseFire":0,"WhiteFire":1,"YellowLightning":0},"Windwalks":{"WWBlood":0,"WWBlue":0,"WWDivine":-1,"WWFire":1,"WWNecro":0,"WWSwift":0,"WWViolet":-1},"Wings":{"ArchangelWings":1,"ChaosWings":1,"CosmicWings":1,"DivinityTendrils":0,"FairyWings":1,"GreenTendrils":0,"NatureWings":1,"NightmareWings":1,"PatrioticTendrils":0,"PhoenixWings":1,"PinkWings":1,"RedTendrils":0,"SnowWings2023":0,"VoidWings":1,"WhiteTendrils":0}},"GameStats":{"Deaths":0,"HardGames":0,"HardWins":0,"HighestSaveStreak":0,"HighestWinStreak":0,"ImpossibleGames":0,"ImpossibleWins":0,"NormalGames":0,"NormalWins":0,"SaveStreak":0,"Saves":2000,"WinStreak":0},"PlayerName":"Local Player","RoundTimes":{"RoundFiveHard":0,"RoundFiveImpossible":0,"RoundFiveNormal":0,"RoundFiveSolo":0,"RoundFourHard":0,"RoundFourImpossible":0,"RoundFourNormal":0,"RoundFourSolo":0,"RoundOneHard":0,"RoundOneImpossible":0,"RoundOneNormal":0,"RoundOneSolo":0,"RoundThreeHard":0,"RoundThreeImpossible":0,"RoundThreeNormal":0,"RoundThreeSolo":0,"RoundTwoHard":0,"RoundTwoImpossible":0,"RoundTwoNormal":0,"RoundTwoSolo":0},"SelectedData":{"SelectedAura":"","SelectedHat":"","SelectedSkin":"","SelectedTrail":"","SelectedWindwalk":"","SelectedWings":""}}',
  },
]

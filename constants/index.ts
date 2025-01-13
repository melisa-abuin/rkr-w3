import { Challenges, PlayerStats } from '@/interfaces/player'

export const blizzardLink = 'https://www.blizzard.com/'
export const discordData =
  'https://discord.com/api/v9/invites/GSu6zkNvx5?with_counts=true&with_expiration=false'

export const discordJoinLink = 'https://discord.com/invite/GSu6zkNvx5'

export const githubReadMeLink =
  'https://github.com/melisa-abuin/rkr-w3/blob/main/README.md'

export const pageSize = 10
export const routes = {
  home: {
    label: 'Home',
    url: '/',
    target: '_self',
  },
  leaderboard: {
    label: 'Leaderboard',
    url: '/leaderboard',
    target: '_self',
  },
  scoreboard: {
    label: 'Scoreboard',
    url: '/stats/overview?page=1&sortKey=completedChallenges&sortOrder=desc',
    target: '_self',
  },
}

export const downloadFileName = 'RKR_Remastered_1.0.2'

export const statsColumns: { title: string; key: keyof PlayerStats }[] = [
  { title: 'Player', key: 'battleTag' },
  { title: 'Completed Challenges', key: 'completedChallenges' },
  { title: 'Saves', key: 'saves' },
  { title: 'S/D Ratio', key: 'saveDeathRatio' },
  { title: 'Games Played', key: 'gamesPlayed' },
  { title: 'Wins', key: 'wins' },
  { title: 'Highest Save Streak', key: 'highestSaveStreak' },
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
    highestSaveStreak: 10,
    highestWinStreak: 100,
    completedChallenges: [56, 56] as Challenges,
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
    highestSaveStreak: 10,
    highestWinStreak: 100,
    completedChallenges: [56, 56] as Challenges,
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
    highestSaveStreak: 50,
    highestWinStreak: 200,
    completedChallenges: [101, 102] as Challenges,
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
    highestSaveStreak: 15,
    highestWinStreak: 20,
    completedChallenges: [201, 202] as Challenges,
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
    highestSaveStreak: 3,
    highestWinStreak: 2,
    completedChallenges: [0, 0] as Challenges,
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
      '{"GameAwards":{"AncientKitty":0,"ArchangelWings":1,"AstralKitty":1,"AzureLight":0,"Bandana":1,"BlueFire":1,"BlueLightning":0,"ButterflyAura":1,"ChaosWings":1,"ChefHat":1,"CosmicWings":1,"CrimsonLight":0,"DivineLight":1,"DivinityTendrils":0,"EmeraldLight":0,"FairyWings":1,"GreenLightning":0,"GreenTendrils":1,"HighelfKitty":1,"ManaAura":0,"NatureWings":1,"NightmareWings":1,"Nitro":1,"NitroBlue":1,"NitroGreen":1,"NitroPurple":1,"NitroRed":1,"NormalDeathless1":0,"NormalDeathless2":0,"NormalDeathless3":0,"NormalDeathless4":0,"NormalDeathless5":0,"PatrioticTendrils":0,"PhoenixWings":1,"PinkFire":1,"PinkWings":1,"PirateHat":1,"PurpleFire":1,"PurpleLightning":0,"RedLightning":1,"RedTendrils":1,"SamuraiHelm":1,"SantaHat":1,"SatyrKitty":0,"SnowTrail2023":1,"SnowWings2023":1,"SpecialAura":0,"SpectacularAura":0,"StarlightAura":0,"TikiMask":1,"TurquoiseFire":1,"TurquoiseNitro":1,"TurquoiseWings":1,"UndeadKitty":0,"VioletAura":1,"VioletLight":0,"VioletWings":1,"VoidWings":1,"WWBlood":1,"WWBlue":1,"WWFire":1,"WWNecro":1,"WWSwift":1,"WhiteFire":1,"WhiteTendrils":1,"YellowLightning":1,"ZandalariKitty":0},"GameStats":{"Deaths":1162,"HardGames":0,"HardWins":0,"HighestSaveStreak":0,"HighestWinStreak":0,"ImpossibleGames":1,"ImpossibleWins":0,"NormalGames":58,"NormalWins":13,"SaveStreak":0,"Saves":1971,"WinStreak":0},"PlayerName":"Aches#1817","RoundTimes":{"RoundFiveHard":0,"RoundFiveImpossible":0,"RoundFiveNormal":196,"RoundFiveSolo":0,"RoundFourHard":0,"RoundFourImpossible":0,"RoundFourNormal":8,"RoundFourSolo":0,"RoundOneHard":0,"RoundOneImpossible":0,"RoundOneNormal":3,"RoundOneSolo":0,"RoundThreeHard":0,"RoundThreeImpossible":0,"RoundThreeNormal":4,"RoundThreeSolo":0,"RoundTwoHard":0,"RoundTwoImpossible":0,"RoundTwoNormal":1,"RoundTwoSolo":0},"SelectedData":{"SelectedAura":"VioletAura","SelectedHat":"SantaHat","SelectedSkin":"AstralKitty","SelectedTrail":"SnowTrail2023","SelectedWindwalk":"WWSwift","SelectedWings":"VoidWings"}}',
  },
  {
    battletag: 'Local Player',
    'Save Data':
      '{"GameAwards":{"AncientKitty":1,"ArchangelWings":1,"AstralKitty":1,"AzureLight":1,"Bandana":1,"BlueFire":1,"BlueLightning":1,"ButterflyAura":1,"ChaosWings":1,"ChefHat":1,"CosmicWings":1,"CrimsonLight":1,"DivineLight":1,"DivinityTendrils":1,"EmeraldLight":1,"FairyWings":1,"GreenLightning":1,"GreenTendrils":1,"HighelfKitty":1,"ManaAura":1,"NatureWings":1,"NightmareWings":1,"Nitro":1,"NitroBlue":1,"NitroGreen":1,"NitroPurple":1,"NitroRed":1,"NormalDeathless1":1,"NormalDeathless2":1,"NormalDeathless3":1,"NormalDeathless4":1,"NormalDeathless5":1,"PatrioticTendrils":1,"PhoenixWings":1,"PinkFire":1,"PinkWings":1,"PirateHat":1,"PurpleFire":1,"PurpleLightning":1,"RedLightning":1,"RedTendrils":1,"SamuraiHelm":1,"SantaHat":1,"SatyrKitty":1,"SnowTrail2023":1,"SnowWings2023":1,"SpecialAura":1,"SpectacularAura":1,"StarlightAura":1,"TikiMask":1,"TurquoiseFire":1,"TurquoiseNitro":1,"TurquoiseWings":1,"UndeadKitty":1,"VioletAura":1,"VioletLight":1,"VioletWings":1,"VoidWings":1,"WWBlood":1,"WWBlue":1,"WWFire":1,"WWNecro":1,"WWSwift":1,"WhiteFire":1,"WhiteTendrils":1,"YellowLightning":1,"ZandalariKitty":1},"GameStats":{"Deaths":4,"HardGames":25,"HardWins":4,"HighestSaveStreak":42,"HighestWinStreak":4,"ImpossibleGames":55,"ImpossibleWins":2,"NormalGames":24,"NormalWins":5,"SaveStreak":19,"Saves":192,"WinStreak":12},"PlayerName":"Local Player","RoundTimes":{"RoundFiveHard":625.45,"RoundFiveImpossible":315.2,"RoundFiveNormal":199.98,"RoundFiveSolo":165.42,"RoundFourHard":192.78,"RoundFourImpossible":300,"RoundFourNormal":159.55,"RoundFourSolo":156.99,"RoundOneHard":120.92,"RoundOneImpossible":98.10001,"RoundOneNormal":122.47,"RoundOneSolo":116.47,"RoundThreeHard":188.74,"RoundThreeImpossible":215,"RoundThreeNormal":135.5,"RoundThreeSolo":145.62,"RoundTwoHard":135.2,"RoundTwoImpossible":192,"RoundTwoNormal":124.91,"RoundTwoSolo":124.62},"SelectedData":{"SelectedAura":"","SelectedHat":"","SelectedSkin":"","SelectedTrail":"DivineLight","SelectedWindwalk":"","SelectedWings":""}}',
  },
]
